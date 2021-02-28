/*jshint esversion: 6 */

/**
 * 合并选项
 */
class MergeOption {

    /**
     * 构造器
     * @param  {数字} strategy 合并策略序数
     */
    constructor(strategy) {
        this.strategy = DanMuMerger.parseStrategy(strategy);
    }
}

/**
 * 弹幕合并器
 */
const DanMuMerger = (() => {

    // 【私有】合并策略[0:追加式；1:叠加式]
    const mergeStrategies = [AppendStrategy, SuperpositionStrategy];

    /**
     * 解析为策略
     * @param  {整数} ordinal 序数
     * @return {对象}         合并策略
     */
    function parseStrategy(ordinal) {

        return mergeStrategies[ordinal];
    }

    /**
     * 合并
     * 
     * @param {数组} items            表格项数组
     * @param {对象} option           参数
     * @param {函数} updateData       数据更新回调
     * @param {方法} mergeCallback    合并完毕回调
     */
    function merge(items, option, updateData, mergeCallback) {

        toastr.info(`合并进行中，请稍候...`);

        doMerge(items, option, null, 0, updateData, mergeCallback);
    }

    /**
     * 去合并
     * @param {数组} items            表格项数组
     * @param {对象} option           参数
     * @param {对象} total            弹幕对象
     * @param {整数} index            下标
     * @param {函数} updateData       数据更新回调
     * @param {方法} mergeCallback    合并完毕回调
     */
    function doMerge(items, option, total, index, updateData, mergeCallback) {

        /**
         * 读取完毕
         * 
         * @param  {对象}  item   表格项
         * @param  {对象}  $xml   结果
         */
        function readCallback(item, $xml) {

            // 处理中
            item.state = ENUM_TASK_STATE.HANDLEING;
            updateData(item);

            try {

                total = execMerge(items, option, total, index, item, $xml);

            } catch (e) {

                console.log(e);

                toastr.error(`${item.name}，文件处理失败！`);

                mergeCallback();
                return;
            }

            // 转换成功
            item.state = ENUM_TASK_STATE.HANDLE_SUCCESS;
            updateData(item);

            index++;

            // 全部转换完成
            if (index == items.length) {

                const content = DanMuHandler.render(total);

                const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

                const ts = Common.ts();

                saveAs(blob, `弹幕合并[${items.length}·${option.strategy.name}](${ts}).xml`);

                mergeCallback();

            } else {

                doMerge(items, option, total, index, updateData, mergeCallback);
            }
        }

        DanMuHandler.read(items[index], readCallback, updateData);
    }

    /**
     * 【私有】执行合并
     * @param  {数组}  items      表格项数组
     * @param  {对象}  option     参数
     * @param  {对象}  total      弹幕对象
     * @param  {整数}  index      下标
     * @param  {对象}  item       表格项
     * @param  {对象}  $xml       结果
     * @return {对象}             弹幕对象
     */
    function execMerge(items, option, total, index, item, $xml) {

        const danMu = DanMuHandler.parseDanMu(item, $xml);

        if (!total) return danMu;

        const startTime = option.strategy.get(items, total.items, index);
        const startTimeFix = Math.round(startTime * 1000);

        danMu.items.forEach(it => {

            const playTimeFix = Math.round(it.playTime * 1000);

            it.playTime = (playTimeFix + startTimeFix) / 1000;
        });

        total.items = total.items.concat(danMu.items);

        return total;
    }

    return {
        parseStrategy: parseStrategy,
        merge: merge
    };
})();