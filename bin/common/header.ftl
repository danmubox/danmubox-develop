<#macro if_active name>${(item==name)?string(' active','')}</#macro>
<!DOCTYPE html>
<html lang="zh">

<head>
    <meta charset="UTF-8">
    <title>弹幕盒子${(title??)?string(' - '+title!, '')}</title>
    <link rel="icon" href="favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="lib/pace-1.0.2/themes/blue/pace-theme-flash.css">
    <script type="text/javascript" src="lib/pace-1.0.2/pace.min.js"></script>
    <link rel="stylesheet" type="text/css" href="lib/bootstrap-4.3.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="lib/toastr-2.1.1/toastr.css">
    <script defer type="text/javascript" src="lib/jquery-3.4.1/jquery.min.js"></script>
    <script defer type="text/javascript" src="lib/jquery-cookie-1.4.1/jquery.cookie.min.js"></script>
    <script defer type="text/javascript" src="lib/popper-1.14.7/popper.min.js"></script>
    <script defer type="text/javascript" 
        src="lib/bootstrap-4.3.1/js/bootstrap.min.js"></script>
    <script defer type="text/javascript" src="lib/toastr-2.1.1/toastr.min.js"></script>
</head>

<body>
    <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
        <a class="navbar-brand" href="./">
            <img src="bin/common/danmubox.png" alt="弹幕盒子">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link<@if_active name='home'/>" href="./">主页</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link<@if_active name='search'/>" href="search">搜索</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link<@if_active name='merge'/>" href="merge">合并</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link<@if_active name='convert'/>" href="convert">转换</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link<@if_active name='message'/>" href="message">留言板</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link<@if_active name='about'/>" href="about">关于</a>
                </li>
            </ul>
        </div>
    </nav>
    <div class="container center">