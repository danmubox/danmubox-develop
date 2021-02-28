/*jshint esversion: 6 */

/**
 * 弹幕表格
 */
class DanMuTable extends ToolbarTable {

    /**
     * 解析
     * @return {数组} 文件数组
     */
    resolve(files) {

        const resolveCallback = this.addIfAbsent.bind(this);
        const updateData = this.updateData.bind(this);

        DanMuHandler.resolveFiles(files, resolveCallback, updateData);
    }
}