/*jshint esversion: 6 */

$(() => {
    'use strict';

    const cookie = "convert_xml2ass";
    const $accordion = $("#accordion-xml2ass");

    const $txt_video_width = $accordion.find(".video-width");
    const $txt_video_height = $accordion.find(".video-height");

    const $slt_font = $accordion.find("select.font");
    const $ckb_font_bold = $accordion.find("input.font-bold");

    const $rge_font_scale = $accordion.find(".font-scale");
    const $rge_font_opacity = $accordion.find(".font-opacity");

    const $rge_range_scale = $accordion.find(".range-scale");
    const $rge_roll_stay = $accordion.find(".roll-stay");
    const $rge_fixed_stay = $accordion.find(".fixed-stay");

    const $font_example = $accordion.find(".font-example");

    const danMuTable = new DanMuTable("accordion-xml2ass");
    const updateData = danMuTable.updateData.bind(danMuTable);

    const module = {};

    module.table = danMuTable;
    module.execute = (outputType, complate) => {

        const option = new Xml2AssOption(
            parseInt($txt_video_width.val()),
            parseInt($txt_video_height.val()),
            $slt_font.find(':selected').val(),
            $ckb_font_bold.is(":checked"),
            $rge_font_scale.val() / 100,
            $rge_font_opacity.val() / 100,
            $rge_range_scale.val() / 100,
            parseInt($rge_roll_stay.val()),
            parseInt($rge_fixed_stay.val()));

        Common.writeCookie(cookie, option);

        const items = danMuTable.getValidData();
        option.outputType = outputType;

        Xml2AssConverter.convert(items, option, updateData, complate);
    };

    $accordion.data("module", module);

    /**
     * 重置字体样例
     */
    function resetFontExample() {

        const fontFamily = $slt_font.find(':selected').text();
        const fontScale = $rge_font_scale.val();
        const fontOpacity = $rge_font_opacity.val();
        const isBold = $ckb_font_bold.is(":checked") ? "bold" : "normal";

        const newFontSize = parseInt(DanMuItem.defaultSize * (fontScale / 100));

        $font_example.css("font-family", fontFamily);
        $font_example.css("font-size", `${newFontSize}pt`);
        $font_example.css("opacity", fontOpacity / 100);
        $font_example.css("font-weight", isBold);
    }

    /**
     * 绑定滑块
     * @param  {$对象}  $item   滑块控件
     * @param  {布尔}   isReset 滑动此滑块，是否重置字体样例
     */
    function bindSlide($item, isReset) {

        const $itemValue = $item.parent().find("d");

        $item.bind("input propertychange", function() {

            $itemValue.text($item.val());

            if (isReset) resetFontExample();
        });
    }

    $slt_font.change(() => resetFontExample());
    $ckb_font_bold.change(() => resetFontExample());

    bindSlide($rge_font_scale, true);
    bindSlide($rge_font_opacity, true);

    bindSlide($rge_range_scale, false);
    bindSlide($rge_roll_stay, false);
    bindSlide($rge_fixed_stay, false);

    // 初始化字体
    fontDatas.forEach(it =>
        $slt_font.append(`<option value="${it}">${it}</option>`)
    );

    Common.cookieIfPresent(cookie, it => {

        $txt_video_width.val(it.videoWidth);
        $txt_video_height.val(it.videoHeight);

        $slt_font.find(`option[value='${it.fontFamily}']`).attr("selected", true);
        $ckb_font_bold.attr("checked", it.bold);

        $rge_font_scale.val(it.fontScale * 100);
        $rge_font_opacity.val(it.alpha * 100);

        $rge_range_scale.val(it.rangeScale * 100);
        $rge_roll_stay.val(it.rollStayTime);
        $rge_fixed_stay.val(it.fixedStayTime);

        // 触发滑杆
        $([$rge_font_scale[0], $rge_font_opacity[0],
            $rge_range_scale[0], $rge_roll_stay[0], $rge_fixed_stay[0]
        ]).trigger("input");
    });

    resetFontExample();
});