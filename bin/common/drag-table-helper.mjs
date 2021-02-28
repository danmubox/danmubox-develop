/*jshint esversion: 6 */

/**
 * 拖拽表格帮助者
 */
const DragTableHelper = (() => {

    /**
     * 修复表格高度
     * 
     * @param  {jq对象} $table 表格
     */
    function fixTableHeight($table) {

        const $table_container = $table.parents(".fixed-table-container");

        $table.on('post-header.bs.table page-change.bs.table reset-view.bs.table', function() {

            $table_container.height($table.height() - 35);
        });
    }

    /**
     * 初始化执行
     * @param  {文本}      from         模块名
     * @param  {函数}      execute      执行
     * @return {对象}                   执行按钮
     */
    function initExecute(from, execute) {

        const $btnExecute = $("#btn-execute");
        const $btnExecuting = $btnExecute.find("span");
        const $form = $(`#form-${from}`);

        function complate() {

            $form.attr("disabled", false);
            $btnExecuting.addClass('d-none');
        }

        $btnExecute.click(() => {

            $form.attr("disabled", true);
            $btnExecuting.removeClass('d-none');

            execute(complate);
        });

        return $btnExecute;
    }

    /**
     * 绑定工具栏表格与执行
     * @param  {对象} toolbarTable 工具栏表格
     * @param  {对象} $btnExecute  执行按钮
     */
    function bindToolbarTableAndExecute(toolbarTable, $btnExecute) {

        toolbarTable.onEmptyListener = flag => $btnExecute.attr("disabled", flag);
    }

    /**
     * 是否正在执行
     * @param  {按钮} $btnExecute 执行按钮
     * @return {布尔} 是否正在执行
     */
    function isExecuting($btnExecute) {

        const $btnExecuting = $btnExecute.find("span");

        return !$btnExecuting.hasClass('d-none');
    }

    /**
     * 初始化模态拖拽
     * @param  {按钮} $btnExecute 执行按钮
     * @param  {函数} exec        拖拽执行
     */
    function initModalDrag($btnExecute, exec) {

        new ModalDrag(files => {

            if (isExecuting($btnExecute))
                toastr.warning("执行中，无法添加文件！");
            else
                exec(files);
        });
    }

    return {
        fixTableHeight: fixTableHeight,
        initExecute: initExecute,
        bindToolbarTableAndExecute: bindToolbarTableAndExecute,
        isExecuting: isExecuting,
        initModalDrag: initModalDrag
    };
})();