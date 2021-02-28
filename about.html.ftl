<#assign item='about' title='关于'/>
<#include "/bin/common/header.ftl">
<h1 class="text-center m-3">关&nbsp;&nbsp;&nbsp;&nbsp;于</h1>
<hr />
<br />
<h4 class="font-weight-bold">关于本站</h4>
<p class="lead">弹幕盒子™是一个非盈利性质的开源网站 ( <span><a class="card-link" href="https://baike.baidu.com/item/GPL/2357903" target="_blank" data-toggle="tooltip" data-placement="top" title="通用公共许可证"><kbd>GPL-3.0</kbd></a></span> ) ，依托于Github的Pages服务运行。其致力于弹幕的搜集整理、合并和转换服务，为广大弹幕爱好者提供便利。
</p>
<br />
<br />
<h4 class="font-weight-bold">感谢</h4>
<p class="lead">感谢 <span data-toggle="tooltip" data-placement="top" title="贴吧 和 Q群">弹幕保存计划</span>，对本站搜索结果提供的支持。</p>
<p class="lead">感谢 <span><a class="card-link" href="https://github.com/tiansh" target="_blank">田生(tiansh)</a></span>，本站的弹幕转ASS功能有参考Ta的开源项目：<span><a class="card-link" href="https://github.com/tiansh/us-danmaku" target="_blank"><span class="badge badge-pill badge-success">us-danmaku</span></a></span> 。</p>
<br />
<br />
<h4 class="font-weight-bold">与我联系</h4>
<p class="lead">有任何意见或建议，欢迎使用本站提供的 <span><a href="message" class="card-link">留言板</a></span> 向我反馈。</p>
<br />
<br />
<h4 class="font-weight-bold">更新日志</h4>
<textarea class="form-control" rows="10" readonly>
	<#include "/bin/about/update.log" parse=false>
</textarea>
<br />
<#include "/bin/common/footer.ftl">