// 设置表格内按钮事件
window.operateEvents = {
    'click .download': (e, value, row, index) => {

        // 是否需要拷贝名称
        if ($("#ckb-copy").is(':checked')) {

            const cb = new ClipboardJS('.t', {
                text: () => row.name
            });

            cb.onClick(e);
            cb.destroy();
        }

        // 当前触发按钮
        const $target = $(e.target);

        let url = row.url;

        // 是否为迅雷下载
        if ($target.hasClass('xl-download'))
            url = "thunder://" + btoa(`AA${url}ZZ`);


        const $downloadForm = $("<form method='get'></form>");
        $downloadForm.attr("action", url);
        $(document.body).append($downloadForm);

        $downloadForm.submit(); // 提交表单，实现下载
        $downloadForm.remove(); // 提交后，移除

        toastr.info("下载请求已发起，请稍候...");
    }
};