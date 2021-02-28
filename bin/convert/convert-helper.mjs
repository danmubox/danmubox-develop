/*jshint esversion: 6 */

/**
 * 输出方式
 */
const ENUM_OUTPUT_TYPE = {
    PACKAGE: 0,
    EACH: 1
};

/**
 * 转换帮助
 */
const ConvertHelper = (() => {

    /**
     * 转换
     * 
     * @param {数组} items             表格项数组
     * @param {对象} option            参数
     * @param {函数} updateData        数据更新回调
     * @param {函数} convertCallback   转换完毕回调
     * @param {函数} execRead          执行读取
     * @param {函数} execConvert       执行转换
     */
    function convert(items, option,
        updateData, convertCallback, execRead, execConvert) {

        // 输出方式为打包，并且 队列数大于1
        if (option.outputType == ENUM_OUTPUT_TYPE.PACKAGE && items.length > 1)
            option.zip = new JSZip();

        toastr.info(`转换进行中，请稍候...`);

        doConvert(0, items, option,
            updateData, convertCallback, execRead, execConvert);
    }

    /**
     * 【私有】去转换
     * 
     * @param {整数} index             待执行下标
     * @param {数组} items             表格项数组
     * @param {对象} option            参数
     * @param {函数} updateData        数据更新回调
     * @param {函数} convertCallback   转换完毕回调
     * @param {函数} execRead          执行读取
     * @param {函数} execConvert       执行转换
     */
    function doConvert(index, items, option,
        updateData, convertCallback, execRead, execConvert) {

        /**
         * 读取完毕
         * 
         * @param  {对象}  item   表格项
         * @param  {对象}  result 结果
         */
        function readCallback(item, result) {

            // 处理中
            item.state = ENUM_TASK_STATE.HANDLEING;
            updateData(item);

            let state = ENUM_TASK_STATE.HANDLE_SUCCESS;

            try {

                execConvert(item, result);

            } catch (e) {

                state = ENUM_TASK_STATE.HANDLE_FAIL;

                console.error(e);

                toastr.error(`${item.name}，转换失败！`);
            }

            // 转换成功 || 转换失败
            item.state = state;
            updateData(item);

            index++;

            // 全部转换完成
            if (index == items.length) {

                // 打包
                if (option.zip) {

                    toastr.info("正在打包，请稍后...");

                    option.zip.generateAsync({ type: "blob" }).then(content => {

                        toastr.success("打包完成，即将开始下载！");

                        const ts = Common.ts();

                        saveAs(content, `[弹幕包][${option.name}](${ts}).zip`);

                        convertCallback();
                    });

                } else {

                    convertCallback();
                }

            } else { // 完成一项

                doConvert(index, items, option,
                    updateData, convertCallback, execRead, execConvert);
            }
        }

        execRead(items[index], readCallback);
    }

    /**
     * 保存
     * @param  {对象} option  选项
     * @param  {文本} name    文件名
     * @param  {文本} content 内容
     */
    function save(option, name, content) {

        // 打包
        if (option.zip) {

            option.zip.file(name, content);

        } else { // 直接下载

            const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

            saveAs(blob, name);
        }
    }


    return {
        convert: convert,
        save: save
    };
})();