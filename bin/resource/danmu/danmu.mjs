/*jshint esversion: 6 */

/**
 * 弹幕
 */
class DanMu {

    constructor(chatServer, chatId, items) {

        this.chatServer = chatServer;
        this.chatId = chatId;
        this.items = items;
    }
}

/**
 * 弹幕项
 */
class DanMuItem {

    /**
     * 默认字体大小
     */
    static get defaultSize() { return 25; }

    /**
     * 默认颜色
     */
    static get defaultColor() { return 16777215; }

    constructor(content,
        playTime, type, size, color, createTime, pool, uid, historyId) {

        this.content = content;

        this.playTime = parseFloat(playTime);
        this.type = parseInt(type);
        this.size = parseInt(size);
        this.color = parseInt(color);

        this.createTime = createTime;
        this.pool = pool;
        this.uid = uid;
        this.historyId = historyId;
    }
}