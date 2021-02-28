/*jshint esversion: 6 */

/**
 * Ass处理器
 * 辅助Ass的读取与写入
 */
const AssHandler = (() => {

    const template = { name: "#template-ass" };

    /**
     * 解析文件集
     * 
     * @param {文件数组}    files           弹幕文件集
     * @param {函数}       resolveCallback 解析完成回调
     * @param {函数}       updateData      数据更新回调
     */
    function resolveFiles(files, resolveCallback, updateData) {

        /**
         * 解析文件
         * 
         * @param {文件对象}    file    弹幕文件
         */
        function resolveFile(file) {

            const fileName = file.name;
            const extension = fileName.substring(fileName.lastIndexOf('.') + 1);

            if (extension.toLowerCase() != "ass") {

                toastr.error(`文件：${fileName}，不是一个字幕文件！`);
                return;
            }

            const item = new TableItem(file);

            resolveCallback(item);

            /**
             * 读取完成回调
             * 
             * @param  {对象} item    表格项
             * @param  {数组} lines   所有行
             */
            function readCallback(item, lines) {

                const chatServer = AssHelper.getScriptField(lines, "ChatServer");
                const dialogue = lines.filter(it => it.indexOf("Dialogue: ") == 0);

                item.origin = chatServer;
                item.num = dialogue.length;

                item.state = ENUM_TASK_STATE.WAIT_HANDLE;
            }

            AssHandler.read(item, readCallback, updateData);
        }


        for (let file of files) 
            resolveFile(file, resolveCallback, updateData);
    }

    /**
     * 解析（异步）
     * @param {对象} item         表格项
     * @param {函数} readCallback 读取完成回调
     * @param {函数} updateData   数据更新回调
     */
    function read(item, readCallback, updateData) {

        const reader = new FileReader();

        // 注册加载完成监听，此处不可以=>
        reader.onload = function() {

            const lines = this.result.split(/[\r]?\n/);

            readCallback(item, lines);
            updateData(item);
        };

        // 开始读取
        reader.readAsText(item.file, "UTF-8");
    }

    /**
     * 解析为Ass
     *
     * @param  {对象} item  表格项
     * @param  {数组} lines   所有行
     */
    function parseAss(item, lines) {

        const title = AssHelper.getScriptField(lines, "Title");
        const chatServer = AssHelper.getScriptField(lines, "ChatServer");
        const chatId = AssHelper.getScriptField(lines, "ChatId");
        const playResX = AssHelper.getScriptField(lines, "PlayResX");
        const playResY = AssHelper.getScriptField(lines, "PlayResY");
        const script = new AssScript(title, chatServer, chatId, playResX, playResY);

        const styles = AssHelper.getScriptField(lines, "Style").split(",");
        const style = new AssStyle(styles[1], styles[2],
            styles[3].substring(4),
            styles[3].substring(2, 4),
            styles[7] == "1"
        );

        const startIndex = "Dialogue: ".length;
        const events = lines.filter(it => it.indexOf("Dialogue: ") == 0)
            .map(it => {

                const end = it.substring(startIndex);

                const params = end.split(",", 9);

                const index = params.map(it => it.length).reduce((l, r) => l + r) + 9;
                const content = end.substring(index); // 含效果字符

                let effect;
                try {

                    effect = AssHelper.parseEffect(content);

                } catch (e) {

                    console.error(e);
                    effect = new MoveAssEffect(0, 0, 0, 0);
                }

                let text;
                try {

                    text = AssHelper.parseText(content);

                } catch (e) {

                    console.error(`内容解析失败：${content}`);
                    console.error(e);
                    return null;
                }

                return new AssEvent(params[0], params[1], params[2], effect, text);
            })
            .filter(it => it != null);

        return new Ass(script, style, events);
    }

    /**
     * 渲染
     * @param  {对象} ass Ass字幕
     * @return {文本}     Ass字幕内容
     */
    function render(ass) {
        return Common.render(template, ass);
    }

    return {
        resolveFiles: resolveFiles,
        read: read,
        parseAss: parseAss,
        render: render
    };
})();