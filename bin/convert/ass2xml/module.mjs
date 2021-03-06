/*jshint esversion: 6 */

$(() => {
    'use strict';

    const cookie = "convert_ass2xml";
    const $accordion = $("#accordion-ass2xml");

    const $slt_danmu_server = $accordion.find("select.danmu-server");
    const $txt_danmu_id = $accordion.find("input.fixed-danmu-id");
    const $ckb_fill_create_time = $accordion.find("input.fill-create-time");
    const $ckb_fill_uid = $accordion.find("input.fill-uid");
    const $ckb_fill_history_id = $accordion.find("input.fill-history-id");

    const assTable = new AssTable("accordion-ass2xml");
    const updateData = assTable.updateData.bind(assTable);

    const module = {};

    module.table = assTable;
    module.execute = (outputType, complate) => {

        const option = new Ass2XmlOption(
            $slt_danmu_server.find(':selected').val(),
            $('input:radio[name="danMuId"]:checked').val(),
            parseInt($txt_danmu_id.val()),
            $ckb_fill_create_time.is(":checked"),
            $ckb_fill_uid.is(":checked"),
            $ckb_fill_history_id.is(":checked"));

        Common.writeCookie(cookie, option);

        const items = assTable.getValidData();
        option.outputType = outputType;

        Ass2XmlConverter.convert(items, option, updateData, complate);
    };

    $accordion.data("module", module);

    // 初始化弹幕服务器
    ChatServerArray.forEach(it =>
        $slt_danmu_server.append(`<option value="${it.value}">${it.name}</option>`)
    );

    const $fixed_danmu_id = $accordion.find("input.fixed-danmu-id");
    $("input[name='danMuId']").click(it => {

        const $danMuId = $("input[name='danMuId']:checked");

        const flag = $danMuId.attr("id") != "rdo-fixed";

        $fixed_danmu_id.attr("disabled", flag);
    });

    Common.cookieIfPresent(cookie, it => {

        $slt_danmu_server.find(`option[value='${it.chatServer}']`).attr("selected", true);

        $(`input:radio[name=danMuId][value='${it.chatIdStrategy}']`).click();
        $txt_danmu_id.val(it.fixedChatId);

        $ckb_fill_create_time.attr("checked", it.fillCreateTime);
        $ckb_fill_uid.attr("checked", it.fillUid);
        $ckb_fill_history_id.attr("checked", it.fillHistoryId);
    });
});