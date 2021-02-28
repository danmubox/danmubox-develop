/*jshint esversion: 6 */

$(() => {
    'use strict';

    const cookie = "search";

    // 文本框
    const $txt_keyword = $("#txt-keyword");

    const $table = $('#table');
    const $ckb_copy = $("#ckb-copy");
    const $main_form = $("#main-form");

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
     * @param  {数组} rows 待更新行
     */
    function updateData(rows) {

        rows.forEach(it => isTipDanMuPackage(it.name));

        $table.bootstrapTable('append', rows);
        $table.bootstrapTable('hideLoading');
    }

    /**
     * 搜索完成回调
     */
    function searchCallback() {

        $table.bootstrapTable('hideLoading');
        $main_form.attr("disabled", false);
    }

    $("#btn-search").click(function() {

        $table.bootstrapTable('removeAll');

        const keyword = $txt_keyword.val().trim();

        if (keyword.length > 0) {

            $main_form.attr("disabled", true);

            $table.bootstrapTable('showLoading');

            Searcher.search(keyword.toLowerCase(), updateData, searchCallback);
        }
    });
});

