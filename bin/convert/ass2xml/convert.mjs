/*jshint esversion: 6 */

/**
 * Ass转XML选项
 */
class Ass2XmlOption {

    /**
     * 构造函数
     * @param  {文本} chatServer     缺省弹幕服务器
     * @param  {枚举} chatIdStrategy 缺省弹幕编号生成策略
     * @param  {数字} fixedChatId    缺省的默认弹幕编号
     * @param  {布尔} fillCreateTime 是否填充创建时间
     * @param  {布尔} fillUid        是否填充用户编号
     * @param  {布尔} fillHistoryId  是否填充历史编号
     * @param  {枚举} outputType     输出方式
     */
    constructor(chatServer,
        chatIdStrategy, fixedChatId,
        fillCreateTime, fillUid, fillHistoryId,
        outputType) {

        this.chatServer = chatServer;

        this.chatIdStrategy = chatIdStrategy;
        this.fixedChatId = fixedChatId;

        this.fillCreateTime = fillCreateTime;
        this.fillUid = fillUid;
        this.fillHistoryId = fillHistoryId;

        this.outputType = outputType;

        this.name = "xml";
    }
}

/**
 * Ass转Xml - 转换器
 */
const Ass2XmlConverter = (() => {

    // 随机创建时间修正
    const randomCreateTimeFix = 7 * 24 * 60 * 60;

    /**
     * 弹幕ID生成策略
     */
    const ENUM_CHAT_ID_STRATEGY = {
        RANDOM: 0,
        FIXED: 1
    };

    /**
     * 【私有】产生指定范围的随机整数
     * @param  {整数} min 最小（含）
     * @param  {整数} max 最大（含）
     * @return {整数}     随机整数
     */
    function nextInt(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min, 10);
    }

    /**
     * 【私有】产生指定位数的小写数字与字母
     * @param  {整数} len 指定位数
     * @return {文本}     随机字符串
     */
    function nextLowercaseAndNumberString(len) {

        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        const maxPos = chars.length;

        let content = '';
        for (i = 0; i < len; i++)
            content += chars.charAt(Math.floor(Math.random() * maxPos));

        return content;
    }

    /**
     * 【私有】产生指定位数的数字
     * @param  {整型} len 指定位数
     * @return {数字}     随机数字
     */
    function nextNumber(len) {

        const chars = '0123456789';
        const maxPos = chars.length;

        let content = '' + nextInt(1, 9);
        for (i = 1; i < len; i++)
            content += chars.charAt(Math.floor(Math.random() * maxPos));

        return parseFloat(content);
    }

    /**
     * 转换
     * 
     * @param {数组} items            表格项数组
     * @param {对象} option           参数
     * @param {函数} updateData       数据更新回调
     * @param {函数} convertCallback  转换完毕回调
     */
    function convert(items, option, updateData, convertCallback) {

        /**
         * 执行读取
         * @param  {对象} item         表格项
         * @param  {函数} readCallback 读取完成回调
         */
        function execRead(item, readCallback) {
            AssHandler.read(item, readCallback, updateData);
        }

        /**
         * 执行转换
         * @param  {对象} item   表格项
         * @param  {对象} result 所有行
         */
        function execConvert(item, result) {

            const ass = AssHandler.parseAss(item, result);

            let chatServer = ass.script.chatServer;
            if (!chatServer)
                chatServer = option.chatServer;


            let chatId = ass.script.chatId;
            if (!chatId) {
                if (option.chatIdStrategy == ENUM_CHAT_ID_STRATEGY.FIXED) {
                    if (option.fixedChatId)
                        chatId = option.fixedChatId;
                    else chatId = 0;
                } else
                    chatId = nextInt(100000, 9999999);
            }

            const danMuItems = ass.events.map(it => {

                const playTime = AssHelper.date24H2second(it.start);
                const type = AssHelper.calculateType(ass, it);

                let size = ass.style.fontSize;
                if (it.effect.fontSize) size = it.effect.fontSize;

                let color;
                if (it.effect.fontColor)
                    color = AssHelper.bgr16ToRgb10(it.effect.fontColor);
                else
                    color = AssHelper.bgr16ToRgb10(ass.style.fontColor);

                let createTime = 0;
                if (option.fillCreateTime)
                    createTime = (Date.parse(new Date()) / 1000) - nextInt(1, randomCreateTimeFix);

                let uid = 0;
                if (option.fillUid)
                    uid = nextLowercaseAndNumberString(8);

                let historyId = 0;
                if (option.fillHistoryId)
                    historyId = nextNumber(15);

                return new DanMuItem(it.text,
                    playTime, type, size, color, createTime, 0, uid, historyId);
            });

            const danMu = new DanMu(chatServer, chatId, danMuItems);
            const content = DanMuHandler.render(danMu);

            ConvertHelper.save(option, `${item.name}.xml`, content);
        }

        ConvertHelper.convert(
            items, option, updateData,
            convertCallback,
            execRead, execConvert
        );
    }

    return { convert: convert };
})();