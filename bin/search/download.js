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

        let url;

        // 是否为 「迅雷下载」
        if ($target.hasClass('xl-download')) {

            url = `https://raw.githubusercontent.com/${row.serverName}/${row.repo}/master/${row.fileName}`;
            url = "thunder://" + btoa(`AA${url}ZZ`);

        } else if ($target.hasClass('bp1-download')) {// 是否为 「备用地址1」

            url = `https://testingcf.jsdelivr.net/gh/${row.serverName}/${row.repo}/${row.fileName}`;

        } else if ($target.hasClass('bp2-download')) {// 是否为 「备用地址2」

            url = `https://fastly.jsdelivr.net/gh/${row.serverName}/${row.repo}/${row.fileName}`;

        } else {

            url = `https://cdn.jsdelivr.net/gh/${row.serverName}/${row.repo}/${row.fileName}`;
        }


        const $downloadForm = $("<form method='get'></form>");
        $downloadForm.attr("action", url);
        $(document.body).append($downloadForm);

        $downloadForm.submit(); // 提交表单，实现下载
        $downloadForm.remove(); // 提交后，移除

        toastr.info("下载请求已发起，请稍候...");
    }
};