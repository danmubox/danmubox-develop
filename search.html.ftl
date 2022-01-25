<#assign item='search' title='搜索'/>
<#include "/bin/common/header.ftl">
<link rel="stylesheet" type="text/css" href="lib/fontawesome-5.9.0/all.min.css">
<link rel="stylesheet" type="text/css" href="lib/bootstrap-table-1.14.2/bootstrap-table.min.css">
<h1 class="text-center m-3">搜&nbsp;&nbsp;&nbsp;&nbsp;索</h1>
<hr />
<form class="mb-0">
    <fieldset id="main-form" class="form-group mb-0">
        <div class="form-group">
            <p class="float-right mb-1">
                <small id="danmuku-number" class="text-muted">&nbsp;</small>
            </p>
            <div class="input-group mb-1">
                <input id="txt-keyword" type="text" class="form-control" placeholder="输入搜索关键字">
                <div class="input-group-append">
                    <button id="btn-search" class="btn btn-primary" type="submit" onclick="return false" disabled>搜&nbsp;&nbsp;索</button>
                </div>
            </div>
            <p class="mb-0"><small class="text-muted">温馨提醒：当没有找到匹配的记录时，可尝试减少关键字。如：将“是,大臣” 改为 "大臣"，或使用其它译名或英文名称试试。</small></p>
        </div>
    </fieldset>
</form>
<div id="danmu-pkg" class="alert alert-info alert-dismissible fade show d-none" role="alert">
    <strong>关于弹幕包</strong> <br />弹幕包是一个特定专题的集合，以 <span class="badge badge-info">[弹幕包]【高达】[01] (含50个)</span> 为例，Ta表示：<br />此包专题为“高达”，这是弹幕包的“01”部分；此包内含“50个”aid的弹幕集。<small>(PS：其中部分aid可能是合集)</small>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
    </button>
</div>
<div class="custom-control custom-switch float-right mb-2 mr-1" data-toggle="tooltip" data-placement="top" title="用于点击下载后，在弹出的确认下载框中，重命名文件名称。">
    <input id="ckb-copy" type="checkbox" class="custom-control-input" checked="true">
    <label class="custom-control-label" for="ckb-copy">下载时，拷贝名称至粘贴板</label>
</div>
<table id="table" data-toggle="table" data-thead-classes="thead-light" data-pagination="true" data-locale="zh-CN" data-height="auto">
    <thead>
        <tr>
            <th data-field="name">名称</th>
            <th data-field="from">来源</th>
            <th data-field="length" data-formatter="Common.renderSize">大小</th>
            <th data-field="operate" data-events="operateEvents" data-align="center" data-width="120">操作</th>
        </tr>
    </thead>
</table>
<script id="button-download" type="text/html">
<div class="btn-group">
    <button class="btn btn-success download">下载</button>
    <button type="button" class="btn btn-success dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <button class="dropdown-item btn download xl-download">迅雷下载</button>
        <button class="dropdown-item btn download backup-download">备用地址</button>
    </div>
</div>
</script>
<script defer type="text/javascript" src="bin/search/download.min.js"></script>
<script defer type="text/javascript" 
    src="lib/bootstrap-table-1.14.2/bootstrap-table.min.js"></script>
<script defer type="text/javascript" 
    src="lib/bootstrap-table-1.14.2/locale/bootstrap-table-zh-CN.min.js"></script>
<script async type="text/javascript" src="lib/crypto-js-3.1.9/crypto-js.min.js"></script>
<script async type="text/javascript" src="lib/clipboard-2.0.4/clipboard.min.js"></script>
<#include "/bin/common/footer.ftl">