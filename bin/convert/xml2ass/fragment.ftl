<div id="accordion-xml2ass">
    <div class="card">
        <a class="card-link" data-toggle="collapse" href="#input-xml">
            <div class="card-header">
                输入
            </div>
        </a>
        <div id="input-xml" class="collapse show" data-parent="#accordion-xml2ass">
            <div class="card-body">
                <#assign id='xml2ass' />
                <#include "/bin/common/toolbar-table.ftl">
            </div>
        </div>
    </div>
    <div class="card">
        <a class="collapsed card-link" data-toggle="collapse" href="#base-param">
            <div class="card-header">
                基础参数
            </div>
        </a>
        <div id="base-param" class="collapse" data-parent="#accordion-xml2ass">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-8">
                        <form>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>视频宽度</label>
                                    <div class="input-group" data-trigger="spinner">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-primary fa fa-minus-circle" type="button" data-spin="down"></button>
                                        </div>
                                        <input type="text" class="form-control text-center video-width" value="672" data-min="1" data-step="1">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary fa fa-plus-circle" type="button" data-spin="up"></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-6">
                                    <label>视频高度</label>
                                    <div class="input-group" data-trigger="spinner">
                                        <div class="input-group-prepend">
                                            <button class="btn btn-outline-primary fa fa-minus-circle" type="button" data-spin="down"></button>
                                        </div>
                                        <input type="text" class="form-control text-center video-height" value="504" data-min="1" data-step="1">
                                        <div class="input-group-append">
                                            <button class="btn btn-outline-primary fa fa-plus-circle" type="button" data-spin="up"></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-10">
                                    <label>字体</label>
                                    <div class="input-group mb-3">
                                        <select class="form-control custom-select font">
                                        </select>
                                        <div class="input-group-append">
                                            <span class="input-group-text" data-toggle="tooltip" data-placement="top" title="本机需安装相应字体才能看到效果">
                                                <i class="fa fa-info-circle"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group col-md-2">
                                    <label for="inputPassword4">加粗</label>
                                    <input class="form-control font-bold" type="checkbox">
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-sm-4 text-center" style="border: 1px solid #ddd;line-height: 200px;">
                        <p class="font-example" style="font-size:25pt;">字幕</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <p class="m-0 float-left">字缩放</p>
                            <p class="m-0">[&nbsp;<d>100</d>%&nbsp;]</p>
                        </div>
                        <input type="range" class="custom-range font-scale" min="1" max="250" value="100">
                    </div>
                    <div class="col-sm-12 mt-2">
                        <div class="text-center">
                            <p class="m-0 float-left">透明度</p>
                            <p class="m-0">[&nbsp;<d>50</d>%&nbsp;]</p>
                        </div>
                        <input type="range" class="custom-range font-opacity" min="1" max="100" value="50">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="card">
        <a class="collapsed card-link" data-toggle="collapse" href="#extend-param">
            <div class="card-header">
                扩展参数
            </div>
        </a>
        <div id="extend-param" class="collapse" data-parent="#accordion-xml2ass">
            <div class="card-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="text-center">
                            <p class="m-0 float-left">字幕范围</p>
                            <p class="m-0">[&nbsp;<d>100</d>%&nbsp;]</p>
                        </div>
                        <input type="range" class="custom-range range-scale" min="1" max="100" value="100">
                    </div>
                    <div class="col-sm-12 mt-2">
                        <div class="text-center">
                            <p class="m-0 float-left">滚动停留</p>
                            <p class="m-0">[&nbsp;<d>12</d>秒&nbsp;]</p>
                        </div>
                        <input type="range" class="custom-range roll-stay" min="1" max="30" value="12">
                    </div>
                    <div class="col-sm-12 mt-2">
                        <div class="text-center">
                            <p class="m-0 float-left">顶底停留</p>
                            <p class="m-0">[&nbsp;<d>4</d>秒&nbsp;]</p>
                        </div>
                        <input type="range" class="custom-range fixed-stay" min="1" max="15" value="4">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<#include "/bin/resource/ass/ass.ftl" parse=false>