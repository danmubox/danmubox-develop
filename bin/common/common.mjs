/*jshint esversion: 6 */

/**
 * 通用工具
 */
const Common = (() => {

    /**
     * 文件大小单位
     */
    const FILE_SIZE_UNIT = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");

    /**
     * 计算文件大小
     * @param  {数字} value   文件长度
     * @return {字符串}       含有合适单位的魏就大小
     */
    function renderSize(value) {

        if (null == value || value == '') {
            return "0 Bytes";
        }

        let index = 0;
        const srcsize = parseFloat(value);
        index = Math.floor(Math.log(srcsize) / Math.log(1024));
        let size = srcsize / Math.pow(1024, index);
        size = size.toFixed(2); //保留的小数位数

        return size + FILE_SIZE_UNIT[index];
    }

    /**
     * 移除后缀
     * @param  {字符串} value 文件名（有后缀）
     * @return {字符串}       文件名（无后缀）
     */
    function removePostfix(value) {

        const index = value.lastIndexOf(".");

        if (index > 0) {
            value = value.substring(0, index);
        }

        return value;
    }

    /**
     * 初始化Bootstrap提示层
     */
    function initTooltip() {
        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * 【私有】读取cookie
     * 
     * @param  {字符串} path  路径
     * @return {对象}         json对象
     */
    function readCookie(path) {
        return $.cookie(path);
    }

    /**
     * 写入cookie
     * 
     * @param  {字符串} path  路径
     * @param  {对象  } obj   对象
     */
    function writeCookie(path, obj) {
        $.cookie(path, obj, { expires: 9999 });
    }

    /**
     * 处理cookie，如果存在
     * @param  {字符串} path  路径
     * @param  {方法} handle 存在时调用
     */
    function cookieIfPresent(path, handle) {

        const cookie = readCookie(path);

        if (cookie) handle(cookie);
    }

    /**
     * 渲染
     * @param  {对象} template    模板对象
     * @param  {对象} obj         待填充对象
     * @return {文本}             渲染后文本
     */
    function render(template, obj) {

        // 内容尚未加载
        if (!template.content) {

            // 加载指定模版
            template.content = $(template.name).html().trim();
            Mustache.parse(template.content);
        }

        return Mustache.render(template.content, obj);
    }

    /**
     * 得到当前时间戳
     * @return {文本} 时间戳
     */
    function ts() {
        return Math.round(new Date().getTime() / 1000).toString();
    }

    return {
        renderSize: renderSize,
        removePostfix: removePostfix,
        initTooltip: initTooltip,
        writeCookie: writeCookie,
        cookieIfPresent: cookieIfPresent,
        render: render,
        ts: ts
    };
})();

$(() => {

    // 开启json化对象储存
    $.cookie.json = true;

    // 默认显示关闭按钮
    toastr.options.closeButton = true;

    // 初始化提示层
    Common.initTooltip();
});