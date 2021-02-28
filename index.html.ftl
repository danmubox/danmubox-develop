<#assign item='home' />
<#include "/bin/common/header.ftl">
    <link rel="stylesheet" href="lib/WOW-1.1.3/animate.min.css" />
    <div id="wow-logo" class="mt-3 mb-4 text-center" style="visibility:hidden">
        <img src="bin/home/danmubox-big-1.png" class="wow fadeInDown "><br />
        <img src="bin/home/danmubox-big-2.png" class="wow fadeIn  mt-2 mb-2" data-wow-duration="2s"><br />
        <img src="bin/home/danmubox-big-3.png" class="wow fadeInUp ">
    </div>
    <hr />
    <div class="card-deck">
        <div class="card card-menu">
            <a href="search">
                <#include "/bin/home/search.svg" parse=false>
            </a>
            <div class="card-body">
                <a href="search" class="card-link">
                    <h5 class="card-title">搜&nbsp;&nbsp;&nbsp;索</h5>
                </a>
                <p class="card-text">支持以单关键词进行搜索。</p>
                <p class="card-text"><small class="text-muted">搜索出的结果来自互联网，与本网站无关。</small></p>
            </div>
        </div>
        <div class="card card-menu">
            <a href="merge">
                <#include "/bin/home/merge.svg" parse=false>
            </a>
            <div class="card-body">
                <a href="merge" class="card-link">
                    <h5 class="card-title">合&nbsp;&nbsp;&nbsp;并</h5>
                </a>
                <p class="card-text">合并分P弹幕，并下载至本地。</p>
                <p class="card-text"><small class="text-muted">支持以“追加式”、“叠加式”的策略进行合并。</small></p>
            </div>
        </div>
        <div class="card card-menu">
            <a href="convert">
                <#include "/bin/home/convert.svg" parse=false>
            </a>
            <div class="card-body">
                <a href="convert" class="card-link">
                    <h5 class="card-title">转&nbsp;&nbsp;&nbsp;换</h5>
                </a>
                <p class="card-text">支持弹幕(xml)与字幕(ass)互转。</p>
                <p class="card-text"><small class="text-muted">支持样式设定、支持批量转换。</small></p>
            </div>
        </div>
    </div>
    <hr />
    <div>
        <div class="card wow fadeInRight animated" data-wow-duration="1.5s" data-wow-delay="0s">
            <h5 class="card-header">什么是弹幕 ？</h5>
            <div class="card-body">
                <p class="card-text">弹幕（barrage），中文流行词语，指的是在网络上观看视频时弹出的评论性字幕。类似小说中行间彰显的夹批，视频中屏间飘过的评点叫做弹幕，原意指用大量或少量火炮提供密集炮击。而弹幕，顾名思义是指子弹多而形成的幕布，大量吐槽评论从屏幕飘过时效果看上去像是飞行射击游戏里的弹幕。</p>
                <p class="card-text text-right"><small class="text-muted">——&nbsp;&nbsp;摘自百度百科</small></p>
            </div>
        </div>
        <br />
        <div class="card wow fadeInRight animated" data-wow-duration="1.5s" data-wow-delay="0s">
            <h5 class="card-header">如何播放弹幕 ？</h5>
            <div class="card-body">
                <p class="card-text">方式①：使用<a class="card-link" href="http://www.dandanplay.com" target="_blank">弹弹play</a>、BiliLocal等专业弹幕播放软件进行播放。<br/><br/>方式②：将弹幕(xml)转换为字幕(ass)后，使用普通视频播放器播放。</p>
            </div>
        </div>
        <br />
        <div class="card wow fadeInRight animated" data-wow-duration="1.5s" data-wow-delay="0s">
            <h5 class="card-header">弹幕保存计划</h5>
            <div class="card-body">
                <p class="card-text">有关弹幕的收集整理、资源求助、技术交流。<br /><br />
                    贴吧：<a href="https://tieba.baidu.com/f?kw=弹幕保存计划" target="_blank"><img class="pb-2" border="0" src="bin/home/tieba.png" alt="弹幕保存计划吧" title="弹幕保存计划吧"></a><small class="text-muted">（弹幕保存计划吧）</small><br/>
                    Q 群：<a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=3ced5baa4cd57023d2d3f567eaa043cbc773383cf7b134e7fc43fe945ecc7782"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="弹幕保存计划" title="弹幕保存计划"></a><small class="text-muted">（495877205）</small></p>
            </div>
        </div>
        <br />
        <div class="card wow fadeInRight animated" data-wow-duration="1.5s" data-wow-delay="0s">
            <h5 class="card-header">【Tampermonkey脚本】哔哩哔哩(B站|Bilibili)收藏夹Fix<small class="ml-3"><a class="card-link" href="https://greasyfork.org/zh-CN/scripts/383143" target="_blank">[详细]</a></small></h5>
            <div class="card-body">
                <p class="card-text">用于修复B站失效收藏。<br /><br />
                    支持：<br />
                    <span class="font-weight-bold ml-4 mr-2">·</span>可以查看其av号。<br />
                    <span class="font-weight-bold ml-4 mr-2">·</span>修复其标题和封面展示。<br />
                    <span class="font-weight-bold ml-4 mr-2">·</span>可查看子P数量、子P标题、简介信息。<br />
                    <span class="font-weight-bold ml-4 mr-2">·</span>可点击，点击后跳转至biliplus。<br />
                    <span class="font-weight-bold ml-4 mr-2">·</span>可一键复制av号、简介。
                </p>
            </div>
        </div>
    </div>
    <script defer type="text/javascript" src="lib/WOW-1.1.3/wow.min.js"></script>
<#include "/bin/common/footer.ftl">