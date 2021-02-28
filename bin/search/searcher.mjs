/*jshint esversion: 6 */

const Searcher = (() => {

    // 【内部属性】，密钥
    let key;

    // 【内部属性】，仓库数组
    let list;

    //【内部属性】，<仓库字符串,array<array<3>>>
    const repoMap = new Map();

    const fromEnums = ["bilibili", "优酷", "爱奇艺", "腾讯", "第一弹", "动画疯", "acfun", "搜狐"];

    const downloadOperate = $("#button-download").html().trim();

    /**
     * 【私有】解密
     * @param  {字符串} content 内容
     * @param  {字符串} key     密钥
     * @return {字符串}         解密后的内容
     */
    function decrypt(content, key) {

        const bytes = CryptoJS.AES
            .decrypt(content, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        return CryptoJS.enc.Utf8.stringify(bytes).toString();
    }

    // 【私有】初始化key
    function initKey(keyword, updateData, searchCallback) {

        $.get('data/key', it => {

            key = CryptoJS.enc.Utf8.parse(it);

            search(keyword, updateData, searchCallback);
        });
    }

    // 【私有】初始化list
    function initList(keyword, updateData, searchCallback) {

        $.get('data/list', it => {

            list = decrypt(it, key).split(",");

            search(keyword, updateData, searchCallback);
        });
    }

    // 【私有】去搜索
    function doSearch(keyword, updateData, searchCallback) {

        const end = list.length;
        var num = 0;

        list.forEach(repo => {

            // map中存在
            if (repoMap.has(repo)) {

                const repoData = repoMap.get(repo);

                execSearch(keyword, repo, repoData, updateData);

                searchComplate(++num, end, searchCallback);

            } else {

                $.ajax({
                    url: 'https://cdn.jsdelivr.net/gh/' + repo + '/index'
                }).done(data => {

                    const index = decrypt(data, key);

                    const repoData = index.split(";").map((it, i) => it.split(","));

                    repoMap.set(repo, repoData);

                    execSearch(keyword, repo, repoData, updateData);

                }).fail(e => {

                    toastr.error(`请求弹幕仓库：${repo} 时，发生错误！`);

                    console.error(e);

                }).always(() => {

                    searchComplate(++num, end, searchCallback);
                });
            }
        });
    }

    /**
     * 搜索
     * @param  {文本} keyword 			关键词(需转换为小写)
     * @param  {函数} updateData 		更新数据
     * @param  {函数} searchCallback 	搜索完成回调
     */
    function search(keyword, updateData, searchCallback) {

        if (!key) {
            initKey(keyword, updateData, searchCallback);
            return;
        }

        if (!list) {
            initList(keyword, updateData, searchCallback);
            return;
        }

        doSearch(keyword, updateData, searchCallback);
    }

    // 【私有】搜索完成
    function searchComplate(num, total, searchCallback) {

        // 全部子仓库检索完毕
        if (num == total) searchCallback();
    }

    /**
     * 【私有】析出来源
     * @param  {整数} origin 序数
     * @return {文本}        来源
     */
    function parseFrom(origin) {

        let from = "未知";

        if (origin < fromEnums.length)
            from = fromEnums[origin];

        return from;
    }

    /**
     * 【私有】执行搜索
     * @param  {文本} keyword  		关键词
     * @param  {文本} repo     		仓库地址
     * @param  {数组} repoData 		仓库数据数组（二维）
     * @param  {函数} updateData 	更新数据
     */
    function execSearch(keyword, repo, repoData, updateData) {

        const rows = [];

        repoData.forEach(it => {

            const name = it[0];

            // 将其转换为小写再进行比较
            if (name.toLowerCase().indexOf(keyword) > -1) {

                // 原始下载地址
                const url = `https://cdn.jsdelivr.net/gh/${repo}/${it[3]}.7z`;

                rows.push({
                    name: name,
                    from: parseFrom(it[2]),
                    length: it[1],
                    operate: downloadOperate,
                    url: url
                });
            }
        });

        // 从此仓库中找到匹配的内容
        if (rows.length > 0) updateData(rows);
    }

    return { search: search };
})();