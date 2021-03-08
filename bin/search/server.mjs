/*jshint esversion: 6 */

/**
 * 服务器
 */
const Server = (() => {

    const list = '<#include "/bin/search/list" parse=false>'.split(",");

    const key = '<#include "/bin/search/key" parse=false>';

    let k;

    function getKey() {

        if (!k) k = CryptoJS.enc.Utf8.parse(key);

        return k;
    }

    return {
        list: list,
        getKey: getKey
    }
})();