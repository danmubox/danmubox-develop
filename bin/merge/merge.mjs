/*jshint esversion: 6 */

$(() => {
    'use strict';

    const cookie = "merge";

    const danMuTable = new DanMuTable("form-merge");
    const updateData = danMuTable.updateData.bind(danMuTable);

    const $btnExecute = DragTableHelper.initExecute("merge", complate => {

        const items = danMuTable.getValidData();

        if (items.length < 2) {

            toastr.warning("有效待合并弹幕文件数少于2个！");
            complate();
            return;
        }

        // 得到合并策略 [0：追加；1：叠加]
        const strategy = $('input:radio[name="mergeStrategy"]:checked').val();
        const option = new MergeOption(strategy);
        Common.writeCookie(cookie, { strategy: strategy });

        DanMuMerger.merge(items, option, updateData, complate);
    });

    DragTableHelper.bindToolbarTableAndExecute(danMuTable, $btnExecute);

    DragTableHelper.initModalDrag($btnExecute, files => danMuTable.resolve(files));

    Common.cookieIfPresent(cookie, it => {

        $(`input:radio[name=mergeStrategy][value='${it.strategy}']`).attr("checked", true);
    });
});