/*jshint esversion: 6 */

/**
 * 模态拖拽
 */
class ModalDrag {

    /**
     * 构造器
     * @param  {方法}     exec   执行方法
     */
    constructor(exec) {

        // 拖拽遮罩
        this.$modal = $("#modal-drag");

        this.initDrag(exec);
    }

    /**
     * 初始化拖拽
     * @param  {方法}     exec   执行方法
     */
    initDrag(exec) {

        const $modal_drag_content = this.$modal.find(".modal-content");

        // 是否进入h1
        this.enterH1 = false;

        // 拖拽外部文件，进入目标区域触发
        const $modal_drag_content_h1 = $modal_drag_content.find('h1');

        $modal_drag_content_h1.on("dragenter", () => {
            this.enterH1 = true;
            return false;
        });
        $modal_drag_content_h1.on("dragleave", () => {
            this.enterH1 = false;
            return false;
        });
        $modal_drag_content.on("dragenter", () => {
            $modal_drag_content.css("opacity", 1);
            return false;
        });
        $modal_drag_content.on("dragleave", () => {
            if (!this.enterH1) {
                $modal_drag_content.css("opacity", 0.5);
            }
            return false;
        });
        $modal_drag_content.on("dragover", () => {
            return false;
        });
        $modal_drag_content.on("drop", (e) => {

            // 得到拖拽文件列表
            const files = e.originalEvent.dataTransfer.files;

            exec(files);

            this.$modal.modal("hide");
            this.enterH1 = false;
            $modal_drag_content.css("opacity", 0.5);

            return false;
        });

        // 拖拽外部文件，进入body触发
        $("body").on("dragenter", () => {
            this.$modal.modal("show");
            return false;
        });
        this.$modal.on("dragenter", () => {
            return false;
        });
        this.$modal.on("dragleave", () => {
            if (parseInt($modal_drag_content.css("opacity")) != 1) {
                this.$modal.modal("hide");
            }
            return false;
        });
        this.$modal.on("dragover", () => {
            return false;
        });
        this.$modal.on("drop", () => {
            this.$modal.modal("hide");
            return false;
        });
    }
}