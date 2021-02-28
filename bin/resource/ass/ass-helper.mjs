/*jshint esversion: 6 */

/**
 * Ass 帮助者
 */
const AssHelper = (() => {

    /**
     * 【私有】效果类型
     */
    const ENUM_EFFECT_TYPE = {
        ROLL: 0,
        TOP: 1,
        BOTTOM: 2
    };

    /**
     * 合适则添加
     */
    function addIfPass(danMuItem, events, group, option, style) {

        const fontSize = AssHelper.scaleFontSize(danMuItem.size, option.fontScale);

        const effectType = getEffectType(danMuItem);

        if (effectType == ENUM_EFFECT_TYPE.TOP) {

            addPosIfPass(group.tops, events, style, option, danMuItem, fontSize, effectType);

        } else if (effectType == ENUM_EFFECT_TYPE.BOTTOM) {

            addPosIfPass(group.bottoms, events, style, option, danMuItem, fontSize, effectType);

        } else {

            addMoveIfPass(group.rolls, events, style, option, danMuItem, fontSize);
        }
    }

    /**
     * 【私有】添加一个固定位置的Event，如果需要
     */
    function addPosIfPass(items, events, style, option, danMuItem, fontSize, type) {

        for (let i = 0; i < items.length; i++) {

            const curDanMuItem = items[i];

            if (curDanMuItem == null) { // 弹幕未被填满

                addPosEvent(items, events,
                    style, i,
                    option, danMuItem, fontSize,
                    type);

                break;

            } else { // 弹幕已填满

                const curStart = curDanMuItem.playTime;

                // 传入的开始时间>当前的开始时间+停留时间
                if (danMuItem.playTime - curStart >= option.fixedStayTime) {

                    addPosEvent(items, events,
                        style, i,
                        option, danMuItem, fontSize,
                        type);

                    break;
                }
            }
        }
    }

    /**
     * 【私有】添加一个固定位置的Event
     */
    function addPosEvent(items, events, style, index, option, danMuItem, fontSize, type) {

        items[index] = danMuItem;

        const x = option.videoWidth / 2;

        let y;

        if (type == ENUM_EFFECT_TYPE.TOP) {

            y = (index + 1) * fontSize;

        } else {

            y = option.videoHeight - index * fontSize;
        }

        const effect = new PosAssEffect(x, y);

        handleEffect(effect, style, fontSize, danMuItem.color);

        events.push(new AssEvent(
            0,
            second2Date24H(danMuItem.playTime),
            second2Date24H(playTimeSum(danMuItem.playTime, option.fixedStayTime)),
            effect,
            danMuItem.content
        ));
    }

    /**
     * 【私有】以播放时间为参照进行精确相加
     * @param  {数字} a 播放时间（23.058）
     * @param  {整数} b 整数
     * @return {数字} 数字
     */
    function playTimeSum(a, b) {
        return (a * 1000 + b * 1000) / 1000;
    }

    /**
     * 【私有】添加一个移动的Event，如果需要
     */
    function addMoveIfPass(items, events, style, option, danMuItem, fontSize) {

        for (let i = 0; i < items.length; i++) {

            const curDanMuItem = items[i];

            // 滚动弹幕集未被填满时
            if (!curDanMuItem) {

                addMoveEvent(items, events,
                    style, i,
                    option, danMuItem, fontSize);
                break;

            } else { // 滚动弹幕集已被填满

                const curStart = curDanMuItem.playTime;

                // 当前弹幕字体尺寸
                const curFontSize = AssHelper.scaleFontSize(curDanMuItem.size, option.fontScale);

                // 当前弹幕长度
                const curDanMuLength = curDanMuItem.content.length * curFontSize;

                // 当前弹幕首次完全显示在屏幕的时间
                const timeFullShow = playTimeSum(
                    curStart,
                    parseInt(option.rollStayTime * curDanMuLength / (option.videoWidth + curDanMuLength))
                );

                // 当前弹幕完全消失在屏幕的时间
                const timeFullHide = playTimeSum(curStart, option.rollStayTime);

                // 传入弹幕的长度
                const danMuLength = danMuItem.content.length * fontSize;

                // 传入弹幕最后一刻完全显示在屏幕的时间
                const time3 = playTimeSum(
                    danMuItem.playTime,
                    parseInt(option.rollStayTime * option.videoWidth / (option.videoWidth + danMuLength))
                );

                if (danMuItem.playTime >= timeFullShow && time3 >= timeFullHide) {

                    addMoveEvent(items, events,
                        style, i,
                        option, danMuItem, fontSize);
                    break;
                }

            }
        }
    }

    /**
     * 【私有】添加一个移动的Event
     */
    function addMoveEvent(items, events, style, index, option, danMuItem, fontSize) {

        items[index] = danMuItem;

        const layoutY = fontSize * (index + 1);
        const startX = option.videoWidth + danMuItem.content.length * fontSize / 2;
        const endX = 0 - danMuItem.content.length * fontSize / 2;

        const effect = new MoveAssEffect(startX, layoutY, endX, layoutY);

        handleEffect(effect, style, fontSize, danMuItem.color);

        events.push(new AssEvent(
            0,
            second2Date24H(danMuItem.playTime),
            second2Date24H(playTimeSum(danMuItem.playTime, option.rollStayTime)),
            effect,
            danMuItem.content
        ));
    }

    /**
     * 【私有】得到字幕效果类型
     */
    function getEffectType(danMuItem) {

        let effectType = ENUM_EFFECT_TYPE.ROLL;

        if (danMuItem.type == 4) {
            effectType = ENUM_EFFECT_TYPE.BOTTOM;
        } else if (danMuItem.type == 5) {
            effectType = ENUM_EFFECT_TYPE.TOP;
        }

        return effectType;
    }

    /**
     * 【私有】处理效果
     *
     * @param fontColor10 字体颜色，10进制
     */
    function handleEffect(effect, style, fontSize, fontColor10) {

        // 当前弹幕的字体大小，与style不一致，则指定
        if (fontSize != style.fontSize)
            effect.fontSize = fontSize;

        const fontColor = AssHelper.rgb10ToBgr16(fontColor10);

        // 当前弹幕的字体颜色，与style不一致，则指定
        if (fontColor != style.fontColor)
            effect.fontColor = fontColor;
    }


    /**
     * 颜色转换
     * 10进制的RGB -> 16进制的BGR
     * @param  {整型} value   10进制颜色
     * @return {整数}         16进制颜色
     */
    function rgb10ToBgr16(value) {

        const fontColor16 = parseInt(value).toString(16).toUpperCase();

        // 一种意料之外的颜色，使用白色替换
        if (fontColor16.length != 6) return "FFFFFF";

        const fontColor16s = fontColor16.split('');

        const r = fontColor16s[0] + fontColor16s[1];
        const g = fontColor16s[2] + fontColor16s[3];
        const b = fontColor16s[4] + fontColor16s[5];

        return `${b}${g}${r}`;
    }

    /**
     * 颜色转换
     * 16进制的BGR -> 10进制的RGB
     * @param  {文本} value   16进制颜色
     * @return {整数}         10进制颜色
     */
    function bgr16ToRgb10(value) {

        let color;

        try {

            const values = value.split('');

            const b = values[0] + values[1];
            const g = values[2] + values[3];
            const r = values[4] + values[5];

            color = parseInt(`${r}${g}${b}`, 16);

        } catch (e) {

            console.error(e);
            color = DanMuItem.defaultColor;
        }

        return color;
    }

    /**
     * 缩放字体尺寸(解决精度问题)
     * @param  {整型} fontSize  字号
     * @param  {数字} fontScale 缩放倍数
     * @return {整型}           缩放后字号
     */
    function scaleFontSize(fontSize, fontScale) {

        return parseInt((fontSize * fontScale * 100) / 100);
    }

    /**
     * 【私有】秒数转24H制展示
     * @param  {数字} second 123.456秒
     * @return {文本}        02:11:23.12
     */
    function second2Date24H(second) {

        let hh = parseInt(second / 3600);
        if (hh < 10) hh = "0" + hh;

        let mm = parseInt((second - hh * 3600) / 60);
        if (mm < 10) mm = "0" + mm;


        let ss = parseInt((second - hh * 3600) % 60);
        if (ss < 10) ss = "0" + ss;

        // 精确计算
        let dot = parseInt((second * 1000 - parseInt(second) * 1000) / 10);
        if (dot == 0) dot = "00";
        else if (dot < 10) dot = `0${dot}`;

        return `${hh}:${mm}:${ss}.${dot}`;
    }

    /**
     * 24H制转秒数
     * @param  {文本} date24H 02:11:23.12
     * @return {数字}         123.456
     */
    function date24H2second(date24H) {

        const hms = date24H.split(":");

        const hour = parseInt(hms[0] * 3600);
        const minute = parseInt(hms[1] * 60);

        const h24_2s = hms[2].split(".");

        const second = parseInt(h24_2s[0]);
        const nano = h24_2s[1] + "0"; // 百分之一秒  =>  千分之一秒（毫秒）

        return parseFloat(`${(hour + minute + second)}.${nano}`);
    }

    /**
     * 得到脚本字段
     * @param  {数组} lines       字幕文件的所有行
     * @param  {文本} fieldName   字段名
     * @return {文本} property    属性
     */
    function getScriptField(lines, fieldName) {

        const key = `${fieldName}: `;

        for (let line of lines) {

            if (line.indexOf(key) == 0) {

                return line.substring(key.length);

            } else if (line.indexOf("[Events]") == 0) {

                return undefined;
            }
        }
    }

    const regexPos = /\\pos\(([\d.]+),[ ]?([\d.]+)\)/;
    const regexMove = /\\move\(([\d.]+),[ ]?([\d.]+),[ ]?([\d.-]+),[ ]?([\d.]+)\)/;
    const regexColor = /\\c&H(\w+)/;
    const regexSize = /\\fs(\d+)/;
    const regexText = /\{[^\}]+\}(.*)/;

    /**
     * 解析为效果
     * @param  {文本} content 含有效果字符串的字幕文本
     * @return {对象}         Effect
     */
    function parseEffect(content) {

        let effect;

        if (content.startsWith("{\\pos")) { // 绝对定位

            const res = content.match(regexPos);
            effect = new PosAssEffect(res[1], res[2]);

        } else {

            const res = content.match(regexMove);
            effect = new MoveAssEffect(res[1], res[2], res[3], res[4]);
        }

        const color = content.match(regexColor);
        if (color) effect.fontColor = color[1];

        const size = content.match(regexSize);
        if (size) effect.fontSize = parseInt(size[1]);

        return effect;
    }

    /**
     * 解析为文本
     * @param  {文本} content 含有效果字符串的字幕文本
     * @return {文本}         字幕内容
     */
    function parseText(content) {

        return content.match(regexText)[1];
    }

    /**
     * 计算弹幕类型
     * @param  {对象} ass   Ass字幕
     * @param  {对象} event Ass事件
     * @return {数字}       弹幕类型
     */
    function calculateType(ass, event) {

        const effect = event.effect;

        let type;
        if (effect instanceof PosAssEffect) {

            // 如果这行字幕的位置在屏幕下半部分，则归为底端弹幕
            if (effect.y > ass.script.playResY / 2) type = 4;
            else type = 5;

        } else type = 1;

        return type;
    }

    return {
        addIfPass: addIfPass,
        rgb10ToBgr16: rgb10ToBgr16,
        bgr16ToRgb10: bgr16ToRgb10,
        scaleFontSize: scaleFontSize,
        date24H2second: date24H2second,
        calculateType: calculateType,
        getScriptField: getScriptField,
        parseText: parseText,
        parseEffect: parseEffect
    };
})();