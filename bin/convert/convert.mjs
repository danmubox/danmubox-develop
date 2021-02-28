/*jshint esversion: 6 */

$(() => {
    'use strict';

    const cookie = "convert";
    const $tabs = $('#tab-convert>li>a');

    // 得到当前模块
    // module需提供：execute方法、table属性
    function getCurrentModule() {
        return $(".tab-pane.active div").first().data("module");
    }

    const $btnExecute = DragTableHelper.initExecute("convert", complate => {

        $tabs.addClass("disabled");

        function complatePlus() {

            $tabs.removeClass("disabled");

            complate();
        }

        // 得到输出方式 [0：打包；1：逐个]
        const outputType = $('input:radio[name="outputType"]:checked').val();

        Common.writeCookie(cookie, { outputType: outputType });

        getCurrentModule().execute(outputType, complatePlus);
    });

    DragTableHelper.initModalDrag($btnExecute, 
        files => getCurrentModule().table.resolve(files));

    $tabs.each((i, it) => {

        const $it = $(it);

        // 注册show事件
        $it.on('show.bs.tab', e => {

            // 执行中，阻止切换
            if (DragTableHelper.isExecuting($btnExecute)) {
                e.preventDefault();
                return;
            }

            // 切换选项卡时，重新校正执行按钮状态
            const moduleName = $it.attr("aria-controls");
            const module = $(`#accordion-${moduleName}`).data("module");
            const flag = module.table.getValidData().length == 0;

            $btnExecute.attr("disabled", flag);
        });
    });

    // 将执行按钮与当前module的table进行绑定
    $(".tab-pane>div").each((i, it) => {

        const module = $(it).data("module");
        DragTableHelper.bindToolbarTableAndExecute(module.table, $btnExecute);
    });

    Common.cookieIfPresent(cookie, it => {

        $(`input:radio[name=outputType][value='${it.outputType}']`).attr("checked", true);
    });
});