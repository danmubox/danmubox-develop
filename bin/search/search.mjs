/*jshint esversion: 6 */

$(() => {
    'use strict';

    const cookie = "search";

    const $danmuku_number = $("#danmuku-number"); // 弹幕库数量
    const $txt_keyword = $("#txt-keyword"); // 文本框
    const $table = $('#table');
    const $ckb_copy = $("#ckb-copy");
    const $main_form = $("#main-form");
    const $btn_search = $("#btn-search");

    // 是否需要提示弹幕包
    let is_tip_danmupkg = true;

    function isTipDanMuPackage(name) {

        if (is_tip_danmupkg && name.indexOf("[弹幕包]") == 0)
            $("#danmu-pkg").removeClass("d-none");
    }

    Common.cookieIfPresent(cookie, it => {
        $ckb_copy.attr("checked", it.downloadCopy);
    });

    $ckb_copy.change(() => {

        const isChecked = $ckb_copy.is(':checked');

        Common.writeCookie(cookie, { downloadCopy: isChecked });
    });

    /**
     * 更新数据
     * @param {数组} rows          待更新行
     * @param {整型} danmukuNumber 弹幕库数量
     */
    function updateData(rows, danmukuNumber) {

        if (rows == undefined) { // 更新弹幕库数量

            $danmuku_number.text(`已收录弹幕：${danmukuNumber.toLocaleString()}`);

        } else { // 更新表格数据

            rows.forEach(it => isTipDanMuPackage(it.name));
            $table.bootstrapTable('append', rows);
            $table.bootstrapTable('hideLoading');
        }
    }

    /**
     * 搜索完成回调
     * @param {文本} keyword          关键字
     * @param {整型} danmukuLength    弹幕库大小
     */
    function searchCallback(keyword, danmukuLength) {

        const length = $table.bootstrapTable('getData').length;
        if (length == 0)
            $("tr.no-records-found td").text(`未找到包含 "${keyword}" 的相关结果。`);

        if (danmukuLength > 0 && $danmuku_number.attr('title') == undefined) {

            const prettifyLength = Common.renderSize(danmukuLength);
            $danmuku_number.attr('title', `合计：${prettifyLength}`);
            $danmuku_number.attr('data-toggle', 'tooltip');
            $danmuku_number.attr('data-placement', 'top');
            $danmuku_number.tooltip();
        }

        $table.bootstrapTable('hideLoading');
        $main_form.attr("disabled", false);
    }

    // 注册文本框变化监听
    $txt_keyword.bind("input propertychange", () => {

        const flag = $txt_keyword.val().trim() == 0;

        $btn_search.attr("disabled", flag);
    });

    /**
     * 搜索
     * @param  {文本} k 关键词
     */
    function search(k) {

        $table.bootstrapTable('removeAll');

        const keyword = k.trim();

        if (keyword.length > 0) {

            history.replaceState(null, null, `search?k=${keyword}`);

            $main_form.attr("disabled", true);

            $table.bootstrapTable('showLoading');

            Searcher.search(keyword.toLowerCase(), updateData, searchCallback);
        }
    }

    // 注册搜索按钮点击事件
    $btn_search.click(() => search($txt_keyword.val()));

    // 解决偶发性国际化失效的bug
    $table.bootstrapTable('refreshOptions', {
        locale: "zh-CN"
    });

    (() => {

        const match = window.location.search.match(new RegExp('k=([^&]*)'));

        if (match) {

            const value = decodeURIComponent(match[1]);

            $txt_keyword.val(value);
            $btn_search.attr("disabled", false);
            search(value);
        }

    })();
});