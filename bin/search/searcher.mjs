/*jshint esversion: 6 */

const Searcher = (() => {

    // 【内部属性】，<服务器,repoMap>；repoMap：<仓库字符串,array<array<4>>>
    const serverMap = new Map();

    // 【内部属性】，下载操作按钮的html片段
    const downloadOperate = $("#button-download").html().trim();

    // 【内部属性】，弹幕库数量
    let danmukuNumber = 0;

    // 【内部属性】，弹幕库大小
    let danmukuLength = 0;

    /**
     * 【私有】解密
     * @param  {字符串} content 内容
     * @return {字符串}         解密后的内容
     */
    function decrypt(content) {

        const bytes = CryptoJS.AES
            .decrypt(content, Server.getKey(), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

        return CryptoJS.enc.Utf8.stringify(bytes).toString();
    }

    // 【私有】去搜索服务器
    function doSearchServer(keyword, updateData, searchCallback) {

        // <server,库房总数>
        const map = new Map();

        Server.list.forEach((server, i) => {

            const index = server.indexOf("/");
            const serverName = server.substring(0, index);
            const serverPath = server.substring(index + 1);

            // 存在
            if (serverMap.has(server)) {

                const repoMap = serverMap.get(server);

                map.set(server, repoMap.size);

                doSearchRepo(server, serverName, serverPath,
                    i + 1, map, repoMap,
                    keyword, updateData, searchCallback);

            } else {

                $.ajax({
                    url: `https://${serverName}.github.io/${serverPath}/index`
                }).done(data => {

                    const repos = data.split(",");
                    const repoMap = new Map();

                    repos.forEach(it => repoMap.set(it, undefined));

                    serverMap.set(server, repoMap);
                    map.set(server, repoMap.size);

                    doSearchRepo(server, serverName, serverPath,
                        i + 1, map, repoMap,
                        keyword, updateData, searchCallback);

                }).fail(e => {

                    toastr.error(`请求弹幕服务器：${server} 时，发生错误！`);

                    console.error(e);
                });
            }
        });
    }

    /**
     * 【私有】去搜索仓库
     * @param  {文本} server 			服务器
     * @param  {文本} serverName 		服务器名
     * @param  {文本} serverPath 		服务器路径
     * @param  {整型} serverNum 			已发起过请求的server数量
     * @param  {映射} map 				<server,库房总数>
     * @param  {映射} repoMap 			库房映射<仓库字符串,array<array<4>>>
     * @param  {文本} keyword 			关键词(需转换为小写)
     * @param  {函数} updateData 		更新数据
     * @param  {函数} searchCallback 	搜索完成回调
     */
    function doSearchRepo(server, serverName, serverPath,
        serverNum, map, repoMap,
        keyword, updateData, searchCallback) {

        let i = 0;

        repoMap.forEach((v, k) => {

            // map中存在
            if (v) {

                execSearch(keyword, serverName, k, v, updateData);

                trySearchComplate(server, serverNum, map, ++i,
                    keyword, searchCallback);

            } else {

                $.ajax({
                    url: `https://${serverName}.github.io/${serverPath}/${k}`
                }).done(data => {

                    const repoValue = decrypt(data);
                    const repoData = repoValue.split(";").map(it => it.split(","));

                    danmukuNumber += repoData.length;
                    updateData(undefined, danmukuNumber);

                    danmukuLength += repoData.map(it => parseFloat(it[1]))
                        .reduce((l, r) => l + r);

                    repoMap.set(k, repoData);

                    execSearch(keyword, serverName, k, repoData, updateData);

                }).fail(e => {

                    toastr.error(`请求弹幕仓库：${repo} 时，发生错误！`);

                    console.error(e);

                }).always(() => {

                    trySearchComplate(server, serverNum, map, ++i,
                        keyword, searchCallback);
                });
            }
        });
    }

    /**
     * 【私有】尝试搜索完成
     * @param  {文本} server 			服务器
     * @param  {整型} serverNum 			已发起过请求的server数量
     * @param  {映射} map            	<server,当前服务器库房总数>
     * @param  {整型} repoNum 			已完成的库房数
     * @param  {文本} keyword 			关键字
     * @param  {函数} searchCallback 	搜索完成回调
     */
    function trySearchComplate(server, serverNum, map, repoNum,
        keyword, searchCallback) {

        // 当前库房已完成
        if (map.get(server) == repoNum)
            map.delete(server);

        // 全部服务器都已发起请求，并且所有库房都完成了
        if (serverNum == Server.list.length && map.size == 0)
            searchCallback(keyword, danmukuLength);
    }

    /**
     * 搜索
     * @param  {文本} keyword 			关键词(需转换为小写)
     * @param  {函数} updateData 		更新数据
     * @param  {函数} searchCallback 	搜索完成回调
     */
    function search(keyword, updateData, searchCallback) {

        doSearchServer(keyword, updateData, searchCallback);
    }

    /**
     * 【私有】析出来源
     * @param  {整数} ordinal 序数
     * @return {文本}         来源
     */
    function parseFrom(ordinal) {

        let from = "未知";

        if (ordinal < ChatServerArray.length)
            from = ChatServerArray[ordinal].name;

        return from;
    }

    /**
     * 【私有】执行搜索
     * @param  {文本} keyword  		关键词
     * @param  {文本} serverName 	服务器名
     * @param  {文本} repo     		仓库地址
     * @param  {数组} repoData 		仓库数据数组（二维）
     * @param  {函数} updateData 	更新数据
     */
    function execSearch(keyword, serverName, repo, repoData, updateData) {

        const rows = [];

        repoData.forEach(it => {

            const name = it[0];

            // 将其转换为小写再进行比较
            if (name.toLowerCase().indexOf(keyword) > -1) {

                // 原始下载地址
                const url = `https://cdn.jsdelivr.net/gh/${serverName}/${repo}/${it[3]}.7z`;

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