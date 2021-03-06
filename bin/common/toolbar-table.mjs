/*jshint esversion: 6 */

/**
 * 任务状态
 * 0：待解析，1：待处理，2：处理中，3：处理完成，-1：处理失败，-2：解析失败
 */
const ENUM_TASK_STATE = {
    WAIT_PARSE: 0,
    WAIT_HANDLE: 1,
    HANDLEING: 2,
    HANDLE_SUCCESS: 3,
    HANDLE_FAIL: -1,
    PARSE_FAIL: -2
};

/**
 * 任务状态解析器
 * 任务状态枚举 -> 文本
 */
const TaskStateResolver = {
    /**
     * 解析
     * 0：待解析；1：待处理；2：处理中；3：处理完成；-1：处理失败，-2：解析失败
     * 
     * @param  {数字}      value 状态值
     * @return {字符串}    状态文本
     */
    parse: (value) => {

        let text;

        if (value == ENUM_TASK_STATE.WAIT_PARSE) {

            text = "待解析";

        } else if (value == ENUM_TASK_STATE.WAIT_HANDLE) {

            text = "待处理";

        } else if (value == ENUM_TASK_STATE.HANDLEING) {

            text = "处理中";

        } else if (value == ENUM_TASK_STATE.HANDLE_SUCCESS) {

            text = "处理完成";

        } else if (value == ENUM_TASK_STATE.HANDLE_FAIL) {

            text = "处理失败";

        } else if (value == ENUM_TASK_STATE.PARSE_FAIL) {

            text = "解析失败";

        } else {

            throw new Error(`未知的任务状态：${value}`);
        }

        return text;
    }
};

/**
 * 项来源解析器
 */
const ItemOriginResolver = {

    /**
     * 弹幕来源解析
     * @param  {字符串} value 弹幕服务器
     * @return {字符串}       弹幕来源
     */
    resolve: (value) => {

        let origin = "未知";

        if (value == undefined) {

            origin = "-";

        } else {

            for (let it of ChatServerArray) {

                if (it.value == value) {

                    origin = it.name;

                    break;
                }
            }
        }

        return origin;
    }
};

/**
 * 工具表格
 * 带有工具栏、可拖拽遮罩、可控制操作按钮
 */
class ToolbarTable {

    /**
     * 构造器
     * @param  {字符串}    module  模块
     */
    constructor(module) {

        // 表格容器
        this.$table = $(`#${module} .table`);

        // 解决偶发性国际化失效的bug
        this.$table.bootstrapTable('refreshOptions', {
            locale: "zh-CN"
        });

        // Toolbar
        this.$add = $(`#${module} .file-input`);
        this.$remove = $(`#${module} .btn-remove`);
        this.$clear = $(`#${module} .btn-clear`);

        this.initToolbar();
    }

    /**
     * 初始化工具栏
     */
    initToolbar() {

        // 注册添加按钮
        this.$add.on("change", (e) => {

            this.resolve(e.target.files);

            this.$add.val(null);
        });

        // 注册表格选中内容变动
        this.$table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table',
            (rows) => {

                const flag = this.$table.bootstrapTable('getSelections').length == 0;

                this.$remove.attr("disabled", flag);
            });

        // 注册表格内容变动
        this.$table.on('reset-view.bs.table', () => {

            // 表中数据为空时
            const flag = this.getValidData().length == 0;

            this.$clear.attr("disabled", flag);

            if (this.onEmptyListener) this.onEmptyListener(flag);
        });

        this.$clear.click(() => this.$table.bootstrapTable('removeAll'));

        this.$remove.click(() => {

            const rows = this.$table.bootstrapTable('getSelections');

            for (let i = 0; i < rows.length; i++) {
                this.$table.bootstrapTable('removeByUniqueId', rows[i].name);
            }

            this.$remove.attr("disabled", true);
        });
    }

    /**
     * 得到有效数据
     * @return {数组} 弹幕数组
     */
    getValidData() {

        const danMus = this.$table.bootstrapTable('getData');

        //过滤
        const filterDanMus = danMus.filter(function(it) {

            const state = it.state;

            return state == ENUM_TASK_STATE.WAIT_HANDLE ||
                state == ENUM_TASK_STATE.HANDLE_SUCCESS ||
                state == ENUM_TASK_STATE.HANDLE_FAIL;
        });

        return filterDanMus;
    }

    /**
     * 添加，若不存在时
     * 
     * @param {对象} item 项（弹幕、字幕）
     */
    addIfAbsent(item) {

        // 判断是否已经存在
        const data = this.$table.bootstrapTable('getRowByUniqueId', item.name);

        if (data == null) { // 不存在

            const rows = [];

            rows.push(item);

            this.$table.bootstrapTable('append', rows);

        } else {

            toastr.warning(`文件：${item.name}，已在表格中！`);
        }
    }

    /**
     * 解析文件集
     * 将File转为TableItem，并插入表格中
     * @return {数组} 文件数组
     */
    resolve(files) {
        throw new Error("this method has not been implemented.");
    }

    /**
     * 更新数据
     *
     * @param {对象} item 项
     */
    updateData(item) {

        this.$table.bootstrapTable('updateByUniqueId', {
            id: item.name,
            row: item
        });
    }
}

/**
 * 表格项
 * file：文件
 * name：名称
 * length：大小
 * num：数量
 * origin：来源(chatserver)
 * state：状态
 */
class TableItem {

    /**
     * 构造器
     * @param  {对象} file 文件
     */
    constructor(file) {

        this.file = file;

        const name = Common.removePostfix(file.name);

        this.name = name;
        this.length = file.size;

        this.state = ENUM_TASK_STATE.WAIT_PARSE;
    }
}