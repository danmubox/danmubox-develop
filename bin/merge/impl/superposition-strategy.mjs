/*jshint esversion: 6 */

/**
 * 叠加式
 */
const SuperpositionStrategy = {
    name: "叠加式",
    /**
     * 得到本P的开始时间
     * @param  {数组} files      弹幕文件数组
     * @param  {数组} danMuItems 弹幕对象数组
     * @param  {整数} index      当前处理下标
     * @return {数字}            开始时间
     */
    get: (files, danMuItems, index) => {
        return 0;
    }
};