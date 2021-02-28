/*jshint esversion: 6 */

/**
 * Xml转Ass - 选项
 */
class Xml2AssOption {

    /**
     * 构造函数
     * 
     * @param  {整型}   videoWidth    视频宽度
     * @param  {整型}   videoHeight   视频高度
     * @param  {字符串} fontFamily    字体
     * @param  {布尔}   bold          是否加粗
     * @param  {精度值} fontScale     文字缩放
     * @param  {精度值} alpha         透明度
     * @param  {精度值} rangeScale    字幕范围
     * @param  {整型}   rollStayTime  滚动停留时间
     * @param  {整型}   fixedStayTime 顶底停留时间
     */
    constructor(videoWidth, videoHeight,
        fontFamily, bold, fontScale, alpha,
        rangeScale, rollStayTime, fixedStayTime) {

        this.videoWidth = videoWidth;
        this.videoHeight = videoHeight;

        this.fontFamily = fontFamily;
        this.bold = bold;

        this.fontScale = fontScale;
        this.alpha = alpha;

        this.rangeScale = rangeScale;
        this.rollStayTime = rollStayTime;
        this.fixedStayTime = fixedStayTime;

        this.name = "ass";
    }
}


/**
 * Xml转Ass - 转换器
 */
const Xml2AssConverter = (() => {

    /**
     * 【内部类】项组
     */
    class ItemGroup {

        constructor(maxCount) {

            this.rolls = new Array(maxCount);
            this.tops = new Array(maxCount);
            this.bottoms = new Array(maxCount);
        }
    }

    /**
     * 【私有】得到数组中，出现最频繁的值
     * @param  {数组} array   数组
     * @param  {文本} name    属性名
     * @return {对象}         属性值
     */
    function getPrimaryValue(array, name) {

        const map = new Map();

        array.forEach(it => {

            const key = it[name];
            map.set(key, (map.get(key) || 0) + 1);
        });

        const res = Array.from(map).sort((a, b) => b[1] - a[1]);

        return res[0][0];
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
            DanMuHandler.read(item, readCallback, updateData);
        }

        /**
         * 执行转换
         * @param  {对象} item   表格项
         * @param  {对象} result xml对象
         */
        function execConvert(item, result) {

            const danMu = DanMuHandler.parseDanMu(item, result);

            const script = new AssScript(item.name, danMu.chatServer, danMu.chatId,
                option.videoWidth, option.videoHeight);

            const alpha = parseInt(255 * (1 - option.alpha)).toString(16);

            const fontSize = getPrimaryValue(danMu.items, "size");
            const fontColor = getPrimaryValue(danMu.items, "color");

            const style = new AssStyle(option.fontFamily,
                AssHelper.scaleFontSize(fontSize, option.fontScale),
                AssHelper.rgb10ToBgr16(fontColor),
                alpha, option.bold
            );

            // 屏幕最大显示行数
            const maxCount = parseInt(option.videoHeight / style.fontSize * option.rangeScale);

            const danMuItems = danMu.items;

            const group = new ItemGroup(maxCount);
            const events = [];

            // 排序
            danMuItems.sort((a, b) => a.playTime - b.playTime);

            for (let i = 0; i < danMuItems.length; i++) {

                const danMuItem = danMuItems[i];

                AssHelper.addIfPass(danMuItem, events, group, option, style);
            }

            const ass = new Ass(script, style, events);
            const content = AssHandler.render(ass);

            ConvertHelper.save(option, `${item.name}.ass`, content);
        }

        ConvertHelper.convert(
            items, option, updateData,
            convertCallback,
            execRead, execConvert
        );
    }

    return {
        convert: convert
    };
})();