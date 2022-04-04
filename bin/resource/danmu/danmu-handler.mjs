/*jshint esversion: 6 */

/**
 * 弹幕处理器
 * 辅助弹幕的读取与写入
 * 
 */
const DanMuHandler = (() => {

    const template = { name: "#template-danmu" };

    /**
     * 解析文件集
     * 
     * @param {文件数组}    files           弹幕文件集
     * @param {函数}       resolveCallback 解析完成回调
     * @param {函数}       updateData      数据更新回调
     */
    function resolveFiles(files, resolveCallback, updateData) {

        /**
         * 读取完成回调
         * 
         * @param  {对象} item  表格项
         * @param  {$对象} $xml 弹幕内容对象
         */
        function readCallback(item, $xml) {

            // 弹幕服务器，可通过判断此值，得到来源
            const chatserver = $xml.find('chatserver:first').text();

            const $ds = $xml.find("d");

            item.origin = chatserver;
            item.num = $ds.length;

            item.state = ENUM_TASK_STATE.WAIT_HANDLE;
        }

        for (let file of files) {

            // 判断文件是否为弹幕xml
            if (file.type != "text/xml") {

                toastr.error(`文件：${file.name}，不是一个弹幕文件！`);
                continue;
            }

            const item = new TableItem(file);

            resolveCallback(item);

            DanMuHandler.read(item, readCallback, updateData);
        }
    }

    /**
     * 读取item中的file
     * 
     * @param {对象} item         表格项
     * @param {函数} readCallback 读取完成回调
     * @param {函数} updateData   数据更新回调
     */
    function read(item, readCallback, updateData) {

        const reader = new FileReader();

        // 注册加载完成监听，此处不可以=>
        reader.onload = function() {

            let $xml;

            try {

                $xml = $($.parseXML(this.result));

            } catch (e) {

                console.error(e);

                toastr.error(`文件：${item.name}，非标准弹幕XML！`);

                item.state = ENUM_TASK_STATE.PARSE_FAIL;
                updateData(item);

                return;
            }

            readCallback(item, $xml);
            updateData(item);
        };

        // 开始读取
        reader.readAsText(item.file, "UTF-8");
    }

    /**
     * 解析为弹幕
     *
     * @param  {对象}  item  表格项
     * @param  {$对象} $xml  弹幕内容对象
     */
    function parseDanMu(item, $xml) {

        // 弹幕ID，俗称：cid
        const chatId = $xml.find('chatid:first').text();

        const $ds = $xml.find("d");

        // 具体弹幕集
        const items = $ds.map((i, it) => {

            const $it = $(it);

            const ps = $it.attr("p").split(",");

            let text = $it.attr("user") + ": ";
            text += $it.text().trim();

            return new DanMuItem(text, ps[0], ps[1], ps[2], ps[3], ps[4], ps[5], ps[6], ps[7]);
        }).toArray();

        return new DanMu(item.origin, chatId, items);
    }

    /**
     * 渲染
     * @param  {对象} danmu   弹幕
     * @return {文本}         弹幕内容
     */
    function render(danmu) {
        return Common.render(template, danmu);
    }

    return {
        resolveFiles: resolveFiles,
        read: read,
        parseDanMu: parseDanMu,
        render: render
    };
})();