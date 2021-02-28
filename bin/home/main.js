/*jshint esversion: 6 */

$(() => {
    'use strict';

    new WOW().init();

    const hoverClass = "border-info";
    const hoverInColor = "#2599db";
    const hoverOutColor = "#25c0db";

    // 此处需使用this，不可使用()=>
    $(".card-menu").hover(function() {

        const $this = $(this);

        $this.addClass(hoverClass);
        $this.find("svg path").attr("fill", hoverInColor);

    }, function() {

        const $this = $(this);

        $this.removeClass(hoverClass);
        $this.find("svg path").attr("fill", hoverOutColor);
    });
});