<div class="toolbar">
    <label class="input-group-btn" style="cursor: pointer;">
        <span class="btn btn-primary btn-sm">
            <i class="fa fa-folder-open" aria-hidden="true"></i>
            添&nbsp;加<input class="file-input" type="file" style="display: none;" multiple>
        </span>
    </label>
    <button type="button" class="btn-remove btn btn-danger btn-sm" disabled>
        <i class="fa fa-minus" aria-hidden="true"></i>
        移&nbsp;除
    </button>
    <button type="button" class="btn-clear btn btn-dark btn-sm" disabled>
        <i class="fa fa-trash" aria-hidden="true"></i>
        清&nbsp;空
    </button>
</div>
<table class="table" data-toggle="table" data-thead-classes="thead-light" data-locale="zh-CN-drag" data-unique-id="name" data-toolbar="#${id} .toolbar" data-click-to-select="true" data-sortable="true">
    <thead>
        <tr>
            <th data-field="chk" data-checkbox="true"></th>
            <th data-field="name" data-sortable="true">名称</th>
            <th data-field="length" data-formatter="Common.renderSize">大小</th>
            <th data-field="num">弹幕数量</th>
            <th data-field="origin" data-formatter="ItemOriginResolver.resolve">来源</th>
            <th data-field="state" data-formatter="TaskStateResolver.parse">状态</th>
        </tr>
    </thead>
</table>