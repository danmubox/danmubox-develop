<div id="accordion-ass2xml">
    <div class="card">
        <a class="card-link" data-toggle="collapse" href="#input-ass">
            <div class="card-header">
                输入
            </div>
        </a>
        <div id="input-ass" class="collapse show" data-parent="#accordion-ass2xml">
            <div class="card-body">
                <#assign id='ass2xml' />
                <#include "/bin/common/toolbar-table.ftl">
            </div>
        </div>
    </div>
    <div class="card">
        <a class="collapsed card-link" data-toggle="collapse" href="#default-param">
            <div class="card-header">
                缺省参数
            </div>
        </a>
        <div id="default-param" class="collapse" data-parent="#accordion-ass2xml">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-12">
                                    <div class="row">
                                        <div class="form-group col-md-5">
                                            <label>弹幕服务器</label>
                                            <div class="input-group" data-trigger="spinner">
                                                <div class="input-group mb-3">
                                                <select class="form-control custom-select danmu-server"></select>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="form-group col-md-6 offset-md-1">
                                            <label>弹幕编号</label>
                                            <div class="row">
                                                <div class="col-md-3 m-auto">
                                                    <label class="m-auto"><input id="rdo-random" name="danMuId" value="0" type="radio" checked>&nbsp;随机</label>
                                                </div>
                                                <div class="col-md-9">
                                                    <div class="input-group">
                                                        <div class="input-group-prepend">
                                                            <label class="input-group-text">
                                                                <input id="rdo-fixed" name="danMuId" value="1" type="radio">&nbsp;固定
                                                            </label>
                                                        </div>
                                                        <input type="number" class="form-control fixed-danmu-id" value="0" disabled>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-4 text-center">
                                    <div class="custom-control custom-switch">
                                        <input type="checkbox" id="ckb-create-time" class="custom-control-input fill-create-time" checked="true">
                                        <label class="custom-control-label" for="ckb-create-time">填充创建时间</label>
                                    </div>
                                </div>
                                <div class="form-group col-md-4 text-center">
                                    <div class="custom-control custom-switch">
                                        <input type="checkbox" id="cbk-uid" class="custom-control-input fill-uid" checked="true">
                                        <label class="custom-control-label" for="cbk-uid">填充用户编号</label>
                                    </div>
                                </div>
                                <div class="form-group col-md-4 text-center">
                                    <div class="custom-control custom-switch">
                                        <input type="checkbox" id="ckb-history-id" class="custom-control-input fill-history-id" checked="true">
                                        <label class="custom-control-label" for="ckb-history-id">填充历史编号</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<#include "/bin/resource/danmu/danmu.ftl" parse=false>