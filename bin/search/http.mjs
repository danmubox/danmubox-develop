/*jshint esversion: 6 */

const HTTP = (() => {

    function request(serverName, serverPath, path,
        doneCallback, finishCallback) {

        const urls = [
            `https://${serverName}.github.io/${serverPath}/${path}`,
            `https://${serverName}-${serverPath}.vercel.app/${path}`
        ];

        let errorNum = 0;

        const ps = urls.map(url => new Promise((res, rej) => {

            $.get(url).done(data => {

                res(data);

            }).fail(e => {

                console.error(e);

                errorNum++;

                if (errorNum == urls.length)
                    rej();

            });
        }));

        Promise.race(ps)
            .then(it => {

                doneCallback(it);
                finishCallback();
            })
            .catch(() => {

                toastr.error(`请求服务器：${serverName}/${serverPath}/${path} 时，发生错误！`);
                finishCallback();
            });
    }

    return { request: request };
})();