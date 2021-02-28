<#assign item='merge' title='合并'/>
<#include "/bin/common/header.ftl">
<link rel="stylesheet" type="text/css" href="lib/fontawesome-5.9.0/all.min.css">
<link rel="stylesheet" type="text/css" href="lib/bootstrap-table-1.14.2/bootstrap-table.min.css">
<h1 class="text-center m-3">合&nbsp;&nbsp;&nbsp;&nbsp;并</h1>
<hr />
<form>
    <fieldset id="form-merge" class="form-group">
        <div class="form-group">
            <label class="col-form-label">合并策略：</label>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="mergeStrategyAppend" name="mergeStrategy" class="custom-control-input" value="0" checked="true">
                <label class="custom-control-label" for="mergeStrategyAppend" data-toggle="tooltip" data-placement="top" title="使用前一 P 最后一条弹幕的时间点(按时间排序的最后一条)，作为下一 P 弹幕文件所有弹幕的开始时间。">追加式</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="mergeStrategySuperposition" name="mergeStrategy" class="custom-control-input" value="1">
                <label class="custom-control-label" for="mergeStrategySuperposition" data-toggle="tooltip" data-placement="top" title="直接合并多个弹幕文件，不改变时间轴。">叠加式</label>
            </div>
        </div>
        <div class="card">
            <h5 class="card-header">输入</h5>
            <div class="card-body">
                <#assign id='merge' />
                <#include "/bin/common/toolbar-table.ftl">
            </div>
        </div>
        <br />
        <p><small class="text-muted">温馨提醒：弹幕将按照表格中的顺序进行合并，你可以点击“名称”的列头进行排序。</small></p>
        <button id="btn-execute" type="button" class="btn btn-primary btn-block" disabled>
            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
            合&nbsp;&nbsp;&nbsp;&nbsp;并</button>
    </fieldset>
</form>
<#include "/bin/common/modal-drag.ftl" parse=false />
<#include "/bin/resource/danmu/danmu.ftl" parse=false />
<script defer type="text/javascript" 
    src="lib/bootstrap-table-1.14.2/bootstrap-table.min.js"></script>
<script defer type="text/javascript" 
    src="lib/bootstrap-table-1.14.2/locale/bootstrap-table-zh-CN-drag.min.js"></script>
<script async type="text/javascript" src="lib/mustache-js-3.0.1/mustache.min.js"></script>
<script async type="text/javascript" src="lib/FileSaver-js-2.0.2/FileSaver.min.js"></script>
<#include "/bin/common/footer.ftl">