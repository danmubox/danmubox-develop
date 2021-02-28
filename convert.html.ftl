<#assign item='convert' title='转换'/>
<#include "/bin/common/header.ftl">
<link rel="stylesheet" type="text/css" href="lib/fontawesome-5.9.0/all.min.css">
<link rel="stylesheet" type="text/css" href="lib/bootstrap-table-1.14.2/bootstrap-table.min.css">
<script defer type="text/javascript" 
    src="lib/bootstrap-table-1.14.2/bootstrap-table.min.js"></script>
<script defer type="text/javascript" 
    src="lib/bootstrap-table-1.14.2/locale/bootstrap-table-zh-CN-drag.min.js"></script>
<script async type="text/javascript" src="lib/mustache-js-3.0.1/mustache.min.js"></script>
<h1 class="text-center m-3">转&nbsp;&nbsp;&nbsp;&nbsp;换</h1>
<hr />
<form>
    <fieldset id="form-convert" class="form-group">
        <ul class="nav nav-tabs" id="tab-convert" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="xml2ass-tab" data-toggle="tab" href="#xml2ass-pane" role="tab" aria-controls="xml2ass" aria-selected="true">XML转ASS</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="ass2xml-tab" data-toggle="tab" href="#ass2xml-pane" role="tab" aria-controls="ass2xml" aria-selected="false">ASS转XML</a>
            </li>
        </ul>
        <br />
        <div class="tab-content">
            <div class="tab-pane active" id="xml2ass-pane" role="tabpanel" aria-labelledby="xml2ass-tab">
                <#include "/bin/convert/xml2ass/fragment.ftl">
            </div>
            <div class="tab-pane" id="ass2xml-pane" role="tabpanel" aria-labelledby="ass2xml-tab">
                <#include "/bin/convert/ass2xml/fragment.ftl">
            </div>
        </div>
        <div class="form-group">
            <label class="col-form-label">输出方式：</label>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="outPutTypePackage" name="outputType" class="custom-control-input" value="0" checked="true">
                <label class="custom-control-label" for="outPutTypePackage" data-toggle="tooltip" data-placement="top" title="当仅有一个待转换文件时，不会打包">打包</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
                <input type="radio" id="outPutTypeEach" name="outputType" class="custom-control-input" value="1">
                <label class="custom-control-label" for="outPutTypeEach">逐个</label>
            </div>
        </div>
        <button id="btn-execute" type="button" class="btn btn-primary btn-block" disabled>
            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
        转&nbsp;&nbsp;&nbsp;&nbsp;换</button>
        <#include "/bin/common/modal-drag.ftl" parse=false />
    </fieldset>
</form>
<script async type="text/javascript" src="lib/jquery-spinner-0.2.1/js/jquery.spinner.min.js"></script>
<script async type="text/javascript" src="lib/jszip-3.2.0/jszip.min.js"></script>
<script async type="text/javascript" src="lib/FileSaver-js-2.0.2/FileSaver.min.js"></script>
<#include "/bin/common/footer.ftl"> 