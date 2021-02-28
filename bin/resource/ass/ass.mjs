/*jshint esversion: 6 */

/**
 * Ass字幕
 */
class Ass {

    constructor(script, style, events) {

        this.script = script;
        this.style = style;
        this.events = events;
    }
}

/**
 * Ass脚本
 */
class AssScript {

    constructor(title, chatServer, chatId,
        playResX, playResY) {

        this.title = title;
        this.chatServer = chatServer;
        this.chatId = chatId;

        this.playResX = playResX;
        this.playResY = playResY;
    }
}

/**
 * Ass样式
 */
class AssStyle {

    constructor(fontName, fontSize, fontColor, alpha, bold) {

        this.name = "DanMu";

        this.fontName = fontName;
        this.fontSize = fontSize;
        this.fontColor = fontColor;
        this.alpha = alpha;
        this.bold = bold;
    }
}

/**
 * Ass效果
 */
class AssEffect {

    // property fontSize
    // property fontColor

    /**
     * 数字转Float字符串
     * @param  {数字} num 整型或浮点数
     * @return {文本}     必含小数点的浮点数
     */
    number2FloatString(num) {

        let str = num.toString();
        if (str.indexOf('.') == -1) str = `${str}.0`;

        return str;
    }
}

/**
 * 固定位置 - Ass效果
 */
class PosAssEffect extends AssEffect {

    constructor(x, y) {

        super();

        const a = this.number2FloatString(x);
        const b = this.number2FloatString(y);

        this.value = `pos(${a},${b})`;

        // 用于ass2xml时，判断顶底
        this.y = y;
    }
}

/**
 * 移动 - Ass效果
 */
class MoveAssEffect extends AssEffect {

    constructor(startX, startY, endX, endY) {

        super();

        const a = this.number2FloatString(startX);
        const b = this.number2FloatString(startY);
        const c = this.number2FloatString(endX);
        const d = this.number2FloatString(endY);

        this.value = `move(${a},${b},${c},${d})`;
    }
}

/**
 * Ass事件（对白）
 */
class AssEvent {

    constructor(layer, start, end, effect, text) {

        this.layer = layer;
        this.start = start;
        this.end = end;
        this.effect = effect;
        this.text = text;
    }
}