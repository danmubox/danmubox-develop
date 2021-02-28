/*jshint esversion: 6 */

/**
 * 字幕表格
 */
class AssTable extends ToolbarTable {

    /**
     * 解析
     * @return {数组} 文件数组
     */
    resolve(files) {

        const resolveCallback = this.addIfAbsent.bind(this);
        const updateData = this.updateData.bind(this);

        AssHandler.resolveFiles(files, resolveCallback, updateData);
    }
}