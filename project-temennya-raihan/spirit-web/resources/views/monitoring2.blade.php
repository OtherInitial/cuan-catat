<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="">
    <meta name="author" content="">

    <title>SPIRIT</title>
    <meta name="description"
        content="Most Powerful &amp; Comprehensive Bootstrap 5 HTML Admin Dashboard Template built for developers!">
    <meta name="keywords"
        content="dashboard, bootstrap 5 dashboard, bootstrap 5 design, bootstrap 5, bootstrap 5 free, free admin template">
    <!-- laravel CRUD token -->
    <meta name="csrf-token" content="ROP2uekHVQjTGvm0yxHxBQWCIR037etEDnEmR2D4">
    <!-- Canonical SEO -->
    <link rel="canonical" href="https://themeselection.com/item/sneat-bootstrap-html-laravel-admin-template/">
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="logo1.png">

    <!-- CSS FILES -->
    <link rel="preconnect" href="https://fonts.googleapis.com">

    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&amp;display=swap"
        rel="stylesheet">

    <link rel="stylesheet"
        href="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/fonts/boxicons.css?id=b821a646ad0904f9218f56d8be8f070c">

    <!-- Core CSS -->

    <link rel="stylesheet"
        href="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/css/theme-default.css?id=3d127db9612959fd1b1297d4adb3d55e">
    <link rel="stylesheet"
        href="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/css/demo.css?id=8a804dae81f41c0f9fcbef2fa8316bdd">

    <link rel="stylesheet"
        href="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css?id=98fefe4424f0148a6e7c70b613511b33">

    <!-- Vendor Styles -->
    <link rel="stylesheet"
        href="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/apex-charts/apex-charts.css">

    <link href='https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css' rel='stylesheet'>

    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Sono:wght@200;300;400;500;700&display=swap"
        rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">

    <link rel="stylesheet" href="{{ asset('css/bootstrap-icons.css') }}">

    <link rel="stylesheet" href="{{ asset('css/owl.carousel.min.css') }}">

    <link rel="stylesheet" href="{{ asset('css/owl.theme.default.min.css') }}">

    <link rel="stylesheet" href="{{ asset('css/templatemo-pod-talk.css') }}">

    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/js/helpers.js">
    </script>
    <style type="text/css">
        .layout-menu-fixed .layout-navbar-full .layout-menu,
        .layout-page {
            padding-top: 0px !important;
        }

        .content-wrapper {
            padding-bottom: 0px !important;
        }
    </style>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/js/config.js">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

    <!-- beautify ignore:end -->

    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async="async" src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    </script>
    <style type="text/css">
        .apexcharts-canvas {
            position: relative;
            user-select: none;
            /* cannot give overflow: hidden as it will crop tooltips which overflow outside chart area */
        }


        /* scrollbar is not visible by default for legend, hence forcing the visibility */
        .apexcharts-canvas ::-webkit-scrollbar {
            -webkit-appearance: none;
            width: 6px;
        }

        .apexcharts-canvas ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, .5);
            box-shadow: 0 0 1px rgba(255, 255, 255, .5);
            -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5);
        }


        .apexcharts-inner {
            position: relative;
        }

        .apexcharts-text tspan {
            font-family: inherit;
        }

        .legend-mouseover-inactive {
            transition: 0.15s ease all;
            opacity: 0.20;
        }

        .apexcharts-series-collapsed {
            opacity: 0;
        }

        .apexcharts-tooltip {
            border-radius: 5px;
            box-shadow: 2px 2px 6px -4px #999;
            cursor: default;
            font-size: 14px;
            left: 62px;
            opacity: 0;
            pointer-events: none;
            position: absolute;
            top: 20px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            white-space: nowrap;
            z-index: 12;
            transition: 0.15s ease all;
        }

        .apexcharts-tooltip.apexcharts-active {
            opacity: 1;
            transition: 0.15s ease all;
        }

        .apexcharts-tooltip.apexcharts-theme-light {
            border: 1px solid #e3e3e3;
            background: rgba(255, 255, 255, 0.96);
        }

        .apexcharts-tooltip.apexcharts-theme-dark {
            color: #fff;
            background: rgba(30, 30, 30, 0.8);
        }

        .apexcharts-tooltip * {
            font-family: inherit;
        }


        .apexcharts-tooltip-title {
            padding: 6px;
            font-size: 15px;
            margin-bottom: 4px;
        }

        .apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
            background: #ECEFF1;
            border-bottom: 1px solid #ddd;
        }

        .apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-title {
            background: rgba(0, 0, 0, 0.7);
            border-bottom: 1px solid #333;
        }

        .apexcharts-tooltip-text-y-value,
        .apexcharts-tooltip-text-goals-value,
        .apexcharts-tooltip-text-z-value {
            display: inline-block;
            font-weight: 600;
            margin-left: 5px;
        }

        .apexcharts-tooltip-text-y-label:empty,
        .apexcharts-tooltip-text-y-value:empty,
        .apexcharts-tooltip-text-goals-label:empty,
        .apexcharts-tooltip-text-goals-value:empty,
        .apexcharts-tooltip-text-z-value:empty {
            display: none;
        }

        .apexcharts-tooltip-text-y-value,
        .apexcharts-tooltip-text-goals-value,
        .apexcharts-tooltip-text-z-value {
            font-weight: 600;
        }

        .apexcharts-tooltip-text-goals-label,
        .apexcharts-tooltip-text-goals-value {
            padding: 6px 0 5px;
        }

        .apexcharts-tooltip-goals-group,
        .apexcharts-tooltip-text-goals-label,
        .apexcharts-tooltip-text-goals-value {
            display: flex;
        }

        .apexcharts-tooltip-text-goals-label:not(:empty),
        .apexcharts-tooltip-text-goals-value:not(:empty) {
            margin-top: -6px;
        }

        .apexcharts-tooltip-marker {
            width: 12px;
            height: 12px;
            position: relative;
            top: 0px;
            margin-right: 10px;
            border-radius: 50%;
        }

        .apexcharts-tooltip-series-group {
            padding: 0 10px;
            display: none;
            text-align: left;
            justify-content: left;
            align-items: center;
        }

        .apexcharts-tooltip-series-group.apexcharts-active .apexcharts-tooltip-marker {
            opacity: 1;
        }

        .apexcharts-tooltip-series-group.apexcharts-active,
        .apexcharts-tooltip-series-group:last-child {
            padding-bottom: 4px;
        }

        .apexcharts-tooltip-series-group-hidden {
            opacity: 0;
            height: 0;
            line-height: 0;
            padding: 0 !important;
        }

        .apexcharts-tooltip-y-group {
            padding: 6px 0 5px;
        }

        .apexcharts-tooltip-box,
        .apexcharts-custom-tooltip {
            padding: 4px 8px;
        }

        .apexcharts-tooltip-boxPlot {
            display: flex;
            flex-direction: column-reverse;
        }

        .apexcharts-tooltip-box>div {
            margin: 4px 0;
        }

        .apexcharts-tooltip-box span.value {
            font-weight: bold;
        }

        .apexcharts-tooltip-rangebar {
            padding: 5px 8px;
        }

        .apexcharts-tooltip-rangebar .category {
            font-weight: 600;
            color: #777;
        }

        .apexcharts-tooltip-rangebar .series-name {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
        }

        .apexcharts-xaxistooltip {
            opacity: 0;
            padding: 9px 10px;
            pointer-events: none;
            color: #373d3f;
            font-size: 13px;
            text-align: center;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
            background: #ECEFF1;
            border: 1px solid #90A4AE;
            transition: 0.15s ease all;
        }

        .apexcharts-xaxistooltip.apexcharts-theme-dark {
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 0, 0, 0.5);
            color: #fff;
        }

        .apexcharts-xaxistooltip:after,
        .apexcharts-xaxistooltip:before {
            left: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        .apexcharts-xaxistooltip:after {
            border-color: rgba(236, 239, 241, 0);
            border-width: 6px;
            margin-left: -6px;
        }

        .apexcharts-xaxistooltip:before {
            border-color: rgba(144, 164, 174, 0);
            border-width: 7px;
            margin-left: -7px;
        }

        .apexcharts-xaxistooltip-bottom:after,
        .apexcharts-xaxistooltip-bottom:before {
            bottom: 100%;
        }

        .apexcharts-xaxistooltip-top:after,
        .apexcharts-xaxistooltip-top:before {
            top: 100%;
        }

        .apexcharts-xaxistooltip-bottom:after {
            border-bottom-color: #ECEFF1;
        }

        .apexcharts-xaxistooltip-bottom:before {
            border-bottom-color: #90A4AE;
        }

        .apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:after {
            border-bottom-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:before {
            border-bottom-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-xaxistooltip-top:after {
            border-top-color: #ECEFF1
        }

        .apexcharts-xaxistooltip-top:before {
            border-top-color: #90A4AE;
        }

        .apexcharts-xaxistooltip-top.apexcharts-theme-dark:after {
            border-top-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-xaxistooltip-top.apexcharts-theme-dark:before {
            border-top-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-xaxistooltip.apexcharts-active {
            opacity: 1;
            transition: 0.15s ease all;
        }

        .apexcharts-yaxistooltip {
            opacity: 0;
            padding: 4px 10px;
            pointer-events: none;
            color: #373d3f;
            font-size: 13px;
            text-align: center;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
            background: #ECEFF1;
            border: 1px solid #90A4AE;
        }

        .apexcharts-yaxistooltip.apexcharts-theme-dark {
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 0, 0, 0.5);
            color: #fff;
        }

        .apexcharts-yaxistooltip:after,
        .apexcharts-yaxistooltip:before {
            top: 50%;
            border: solid transparent;
            content: " ";
            height: 0;
            width: 0;
            position: absolute;
            pointer-events: none;
        }

        .apexcharts-yaxistooltip:after {
            border-color: rgba(236, 239, 241, 0);
            border-width: 6px;
            margin-top: -6px;
        }

        .apexcharts-yaxistooltip:before {
            border-color: rgba(144, 164, 174, 0);
            border-width: 7px;
            margin-top: -7px;
        }

        .apexcharts-yaxistooltip-left:after,
        .apexcharts-yaxistooltip-left:before {
            left: 100%;
        }

        .apexcharts-yaxistooltip-right:after,
        .apexcharts-yaxistooltip-right:before {
            right: 100%;
        }

        .apexcharts-yaxistooltip-left:after {
            border-left-color: #ECEFF1;
        }

        .apexcharts-yaxistooltip-left:before {
            border-left-color: #90A4AE;
        }

        .apexcharts-yaxistooltip-left.apexcharts-theme-dark:after {
            border-left-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-yaxistooltip-left.apexcharts-theme-dark:before {
            border-left-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-yaxistooltip-right:after {
            border-right-color: #ECEFF1;
        }

        .apexcharts-yaxistooltip-right:before {
            border-right-color: #90A4AE;
        }

        .apexcharts-yaxistooltip-right.apexcharts-theme-dark:after {
            border-right-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-yaxistooltip-right.apexcharts-theme-dark:before {
            border-right-color: rgba(0, 0, 0, 0.5);
        }

        .apexcharts-yaxistooltip.apexcharts-active {
            opacity: 1;
        }

        .apexcharts-yaxistooltip-hidden {
            display: none;
        }

        .apexcharts-xcrosshairs,
        .apexcharts-ycrosshairs {
            pointer-events: none;
            opacity: 0;
            transition: 0.15s ease all;
        }

        .apexcharts-xcrosshairs.apexcharts-active,
        .apexcharts-ycrosshairs.apexcharts-active {
            opacity: 1;
            transition: 0.15s ease all;
        }

        .apexcharts-ycrosshairs-hidden {
            opacity: 0;
        }

        .apexcharts-selection-rect {
            cursor: move;
        }

        .svg_select_boundingRect,
        .svg_select_points_rot {
            pointer-events: none;
            opacity: 0;
            visibility: hidden;
        }

        .apexcharts-selection-rect+g .svg_select_boundingRect,
        .apexcharts-selection-rect+g .svg_select_points_rot {
            opacity: 0;
            visibility: hidden;
        }

        .apexcharts-selection-rect+g .svg_select_points_l,
        .apexcharts-selection-rect+g .svg_select_points_r {
            cursor: ew-resize;
            opacity: 1;
            visibility: visible;
        }

        .svg_select_points {
            fill: #efefef;
            stroke: #333;
            rx: 2;
        }

        .apexcharts-svg.apexcharts-zoomable.hovering-zoom {
            cursor: crosshair
        }

        .apexcharts-svg.apexcharts-zoomable.hovering-pan {
            cursor: move
        }

        .apexcharts-zoom-icon,
        .apexcharts-zoomin-icon,
        .apexcharts-zoomout-icon,
        .apexcharts-reset-icon,
        .apexcharts-pan-icon,
        .apexcharts-selection-icon,
        .apexcharts-menu-icon,
        .apexcharts-toolbar-custom-icon {
            cursor: pointer;
            width: 20px;
            height: 20px;
            line-height: 24px;
            color: #6E8192;
            text-align: center;
        }

        .apexcharts-zoom-icon svg,
        .apexcharts-zoomin-icon svg,
        .apexcharts-zoomout-icon svg,
        .apexcharts-reset-icon svg,
        .apexcharts-menu-icon svg {
            fill: #6E8192;
        }

        .apexcharts-selection-icon svg {
            fill: #444;
            transform: scale(0.76)
        }

        .apexcharts-theme-dark .apexcharts-zoom-icon svg,
        .apexcharts-theme-dark .apexcharts-zoomin-icon svg,
        .apexcharts-theme-dark .apexcharts-zoomout-icon svg,
        .apexcharts-theme-dark .apexcharts-reset-icon svg,
        .apexcharts-theme-dark .apexcharts-pan-icon svg,
        .apexcharts-theme-dark .apexcharts-selection-icon svg,
        .apexcharts-theme-dark .apexcharts-menu-icon svg,
        .apexcharts-theme-dark .apexcharts-toolbar-custom-icon svg {
            fill: #f3f4f5;
        }

        .apexcharts-canvas .apexcharts-zoom-icon.apexcharts-selected svg,
        .apexcharts-canvas .apexcharts-selection-icon.apexcharts-selected svg,
        .apexcharts-canvas .apexcharts-reset-zoom-icon.apexcharts-selected svg {
            fill: #008FFB;
        }

        .apexcharts-theme-light .apexcharts-selection-icon:not(.apexcharts-selected):hover svg,
        .apexcharts-theme-light .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg,
        .apexcharts-theme-light .apexcharts-zoomin-icon:hover svg,
        .apexcharts-theme-light .apexcharts-zoomout-icon:hover svg,
        .apexcharts-theme-light .apexcharts-reset-icon:hover svg,
        .apexcharts-theme-light .apexcharts-menu-icon:hover svg {
            fill: #333;
        }

        .apexcharts-selection-icon,
        .apexcharts-menu-icon {
            position: relative;
        }

        .apexcharts-reset-icon {
            margin-left: 5px;
        }

        .apexcharts-zoom-icon,
        .apexcharts-reset-icon,
        .apexcharts-menu-icon {
            transform: scale(0.85);
        }

        .apexcharts-zoomin-icon,
        .apexcharts-zoomout-icon {
            transform: scale(0.7)
        }

        .apexcharts-zoomout-icon {
            margin-right: 3px;
        }

        .apexcharts-pan-icon {
            transform: scale(0.62);
            position: relative;
            left: 1px;
            top: 0px;
        }

        .apexcharts-pan-icon svg {
            fill: #fff;
            stroke: #6E8192;
            stroke-width: 2;
        }

        .apexcharts-pan-icon.apexcharts-selected svg {
            stroke: #008FFB;
        }

        .apexcharts-pan-icon:not(.apexcharts-selected):hover svg {
            stroke: #333;
        }

        .apexcharts-toolbar {
            position: absolute;
            z-index: 11;
            max-width: 176px;
            text-align: right;
            border-radius: 3px;
            padding: 0px 6px 2px 6px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .apexcharts-menu {
            background: #fff;
            position: absolute;
            top: 100%;
            border: 1px solid #ddd;
            border-radius: 3px;
            padding: 3px;
            right: 10px;
            opacity: 0;
            min-width: 110px;
            transition: 0.15s ease all;
            pointer-events: none;
        }

        .apexcharts-menu.apexcharts-menu-open {
            opacity: 1;
            pointer-events: all;
            transition: 0.15s ease all;
        }

        .apexcharts-menu-item {
            padding: 6px 7px;
            font-size: 12px;
            cursor: pointer;
        }

        .apexcharts-theme-light .apexcharts-menu-item:hover {
            background: #eee;
        }

        .apexcharts-theme-dark .apexcharts-menu {
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
        }

        @media screen and (min-width: 768px) {
            .apexcharts-canvas:hover .apexcharts-toolbar {
                opacity: 1;
            }
        }

        .apexcharts-datalabel.apexcharts-element-hidden {
            opacity: 0;
        }

        .apexcharts-pie-label,
        .apexcharts-datalabels,
        .apexcharts-datalabel,
        .apexcharts-datalabel-label,
        .apexcharts-datalabel-value {
            cursor: default;
            pointer-events: none;
        }

        .apexcharts-pie-label-delay {
            opacity: 0;
            animation-name: opaque;
            animation-duration: 0.3s;
            animation-fill-mode: forwards;
            animation-timing-function: ease;
        }

        .apexcharts-canvas .apexcharts-element-hidden {
            opacity: 0;
        }

        .apexcharts-hide .apexcharts-series-points {
            opacity: 0;
        }

        .apexcharts-gridline,
        .apexcharts-annotation-rect,
        .apexcharts-tooltip .apexcharts-marker,
        .apexcharts-area-series .apexcharts-area,
        .apexcharts-line,
        .apexcharts-zoom-rect,
        .apexcharts-toolbar svg,
        .apexcharts-area-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,
        .apexcharts-line-series .apexcharts-series-markers .apexcharts-marker.no-pointer-events,
        .apexcharts-radar-series path,
        .apexcharts-radar-series polygon {
            pointer-events: none;
        }


        /* markers */

        .apexcharts-marker {
            transition: 0.15s ease all;
        }

        @keyframes opaque {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }


        /* Resize generated styles */

        @keyframes resizeanim {
            from {
                opacity: 0;
            }

            to {
                opacity: 0;
            }
        }

        .resize-triggers {
            animation: 1ms resizeanim;
            visibility: hidden;
            opacity: 0;
        }

        .resize-triggers,
        .resize-triggers>div,
        .contract-trigger:before {
            content: " ";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        .resize-triggers>div {
            background: #eee;
            overflow: auto;
        }

        .contract-trigger:before {
            width: 200%;
            height: 200%;
        }
    </style>
    <style media="screen">
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
        }

        body {
            min-height: 100vh;
            background: #e2e7ff;
            color: white;
            background-size: cover;
            background-position: center;
        }

        .side-bar {
            background: #ffffff;
            backdrop-filter: blur(15px);
            width: 250px;
            position: fixed;
            top: 0;
            left: -250px;
            overflow-y: auto;
            transition: 0.6s ease;
            transition-property: left;
            z-index: 999;
            position: fixed;
            height: 100%;
            overflow-y: auto;
        }

        .side-bar::-webkit-scrollbar {
            width: 0px;
        }



        .side-bar.active {
            left: 0;
        }

        h1 {

            text-align: center;
            font-weight: 500;
            font-size: 25px;
            padding-bottom: 13px;
            font-family: sans-serif;
            letter-spacing: 2px;
        }

        .side-bar .menus {
            width: 100%;
            margin-top: 30px;
        }

        .side-bar .menus .item {
            position: relative;
            cursor: pointer;
        }

        .side-bar .menus .item a {
            color: #000000;
            font-size: 16px;
            text-decoration: none;
            display: block;
            padding: 5px 30px;
            line-height: 60px;
        }

        .side-bar .menus .item a:hover {
            background: #008FFB;
            color: white;
            border-radius: 6px;
            transition: 0.3s ease;
        }

        .side-bar .menus .item i {
            margin-right: 15px;
        }

        .side-bar .menus .item a .dropdown {
            position: absolute;
            right: 0;
            margin: 20px;
            transition: 0.3s ease;
        }

        .side-bar .menus .item .sub-menu {
            background: #262627;
            display: none;
        }

        .side-bar .menus .item .sub-menu a {
            padding-left: 80px;
        }

        .rotate {
            transform: rotate(90deg);
        }

        .close-btn {
            position: absolute;
            color: #fff;

            font-size: 23px;
            right: 0px;
            margin: 15px;
            cursor: pointer;
        }

        .menu-btn {
            position: absolute;
            color: rgb(0, 0, 0);
            font-size: 35px;
            margin: 25px;
            cursor: pointer;
            z-index: 1;
        }

        .main {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 50px;
        }

        .main h1 {
            color: rgba(0, 0, 0, 0.8);
            font-size: 60px;
            text-align: center;
            line-height: 80px;
        }

        @media (max-width: 900px) {
            .main h1 {
                font-size: 40px;
                line-height: 60px;
            }
        }

        .images {
            width: 100px;
            margin: 15px;
            border-radius: 50%;
            margin-left: 70px;
            border: 3px solid #b4b8b9;
        }

        header {
            background: #2f9df1;
        }

        .fade-in-and-slide1 {
            opacity: 0;
            transform: translateY(-50px);
            animation: fadeInAndSlideAnimation 1s ease-out forwards;
            animation-delay: 0.5s;
        }

        @keyframes fadeInAndSlideAnimation {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-and-slide2 {
            opacity: 0;
            transform: translateY(-50px);
            animation: fadeInAndSlideAnimation 1s ease-out forwards;
            animation-delay: 1s;
        }

        @keyframes fadeInAndSlideAnimation {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in-and-slide3 {
            opacity: 0;
            transform: translateY(-50px);
            animation: fadeInAndSlideAnimation 1s ease-out forwards;
            animation-delay: 1.5s;
        }

        @keyframes fadeInAndSlideAnimation {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" charset="utf-8"></script>
</head>

<body>
    <div class="navbar">
        <div class="menu-btn">
            <i class="fas fa-bars"></i>
        </div>
        <div class="ab">
            <button id="logoutButton">
                <span id="logoutSymbol">&#x21AA;</span> Logout
            </button>
            <form id="logout-form" action="/logout" method="POST" class="d-none">
                @csrf
            </form>
        </div>
    </div>
    <style>
        .navbar {
            color: black;
            background-color: white;
            border-bottom: 8px solid #008FFB;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
            z-index: 1;
            position: fixed;
            top: 0;
            /* Menentukan posisi navbar di bagian atas layar */
            width: 100%;
        }

        .ab {
            display: flex;
            align-items: center;
            margin-left: auto;
            cursor: pointer;
        }

        #logoutButton {
            background-color: #107dd8;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        #logoutSymbol {
            margin-right: 8px;
        }
    </style>
    <script>
        // Fungsi untuk menghandle logout
        function logout() {
            // Menampilkan konfirmasi
            var confirmLogout = confirm('Apakah Anda yakin ingin logout?');

            // Jika pengguna mengonfirmasi logout
            if (confirmLogout) {
                // Submit formulir logout
                document.getElementById('logout-form').submit();
            }
        }

        // Menambahkan event listener ke tombol logout
        document.getElementById('logoutButton').addEventListener('click', logout);
    </script>

    <div class="side-bar">
        <header>
            <div class="close-btn">

                <i class="fas fa-times"></i>
            </div>
            <img class="images" src="logo.png" alt="">
            <h1>SPIRIT</h1>
        </header>
        <div class="menus">
            <div class="item"><a href="home"><i class="fas fa-desktop"></i>Dashboard</a></div>
            <div class="item"><a href="iot"><i class="fas fa-th"></i>Internet of Things</a></div>
            <div class="item"><a href="controlling"><i class="fas fa-cogs"></i>Controllings</a></div>
        </div>
    </div>

    <script type="text/javascript">
        $(document).ready(function() {
            //jquery for toggle sub menus
            $('.sub-btn').click(function() {
                $(this).next('.sub-menu').slideToggle();
                $(this).find('.dropdown').toggleClass('rotate');
            });

            //jquery for expand and collapse the sidebar
            $('.menu-btn').click(function() {
                $('.side-bar').addClass('active');
                $('.menu-btn').css("visibility", "hidden");
            });

            $('.close-btn').click(function() {
                $('.side-bar').removeClass('active');
                $('.menu-btn').css("visibility", "visible");
            });
        });
    </script>
    <script>
        $(document).ready(function() {
            $("#id14").hide();
            $("#grafik8").click(function() {
                $("#id13").hide(); // Menampilkan/menyembunyikan elemen pertama
                $("#id14").show(); // Menampilkan/menyembunyikan elemen kedua
            });
            $("#close8").click(function() {
                $("#id13").show(); // Menampilkan/menyembunyikan elemen pertama
                $("#id14").hide(); // Menampilkan/menyembunyikan elemen kedua
            });
            $("#id16").hide();
            $("#grafik9").click(function() {
                $("#id15").hide(); // Menampilkan/menyembunyikan elemen pertama
                $("#id16").show(); // Menampilkan/menyembunyikan elemen kedua
            });
            $("#close9").click(function() {
                $("#id15").show(); // Menampilkan/menyembunyikan elemen pertama
                $("#id16").hide(); // Menampilkan/menyembunyikan elemen kedua
            });
        });
    </script>
    <!-- Content wrapper -->
    <div class="content"><br>
        <div class="container d-flex justify-content-center">
            <div class="card text-center"
                style="width: 300px; padding: 20px; border: none; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); background-color: #f5fbff; color:#107dd8">
                <div class="card-header fw-bold" style="background-color: #e6f4fd; border-bottom: 1px solid #e7f5fd; ">
                    REAL-TIME CLOCK
                </div>
                <br>
                <div class="card-body">
                    <h5 class="card-title" id="current-time" style="font-size: 32px; margin-bottom: 0;color:#107dd8"></h5>
                    <p class="card-text" id="current-date"></p>
                </div>
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
        <script>
            function updateTime() {
                var currentTime = new Date();
                var hours = currentTime.getHours();
                var minutes = currentTime.getMinutes();
                var seconds = currentTime.getSeconds();
                var month = currentTime.toLocaleString('default', {
                    month: 'long'
                });
                var day = currentTime.getDate();
                var year = currentTime.getFullYear();

                document.getElementById('current-time').innerHTML = hours + ":" + minutes + ":" + seconds;
                document.getElementById('current-date').innerHTML = day + " " + month + " " + year;
            }
            setInterval(updateTime, 1000); // update every second
        </script>
        <p class="fw-bold"
            style="text-align: center; color:hsl(207, 86%, 45%)  ; font-size:35px; padding-top:35px; font-style:oblique">
            WATER LEVEL</p>
        <p style="font-size: 15px; font-weight:normal; align-items:center; text-align:center"> <span
                id="lastUpdated6"></span> </p>
        <script>
            // Function to format timestamp to human-readable date and time
            function formatTimestamp(timestamp) {
                const date = new Date(timestamp);
                return date.toLocaleString(); // You can customize the format as needed
            }

            // Fetch last update time
            fetch("/api/get-data-sensor-spirit/")
                .then((res) => res.json())
                .then(result => {
                    // Display last update time
                    document.getElementById("lastUpdated6").innerText = "Last Update: " + formatTimestamp(result.data
                        .waktu_kirim);
                });
        </script>
        <script>
            /**
             * Javascript Fluid Meter
             * by Angel Arcoraci
             * https://github.com/aarcoraci
             *
             * MIT License
             */
            function FluidMeter() {
                var context;
                var targetContainer;

                var time = null;
                var dt = null;

                var options = {
                    drawShadow: true,
                    drawText: true,
                    drawPercentageSign: true,
                    drawBubbles: true,
                    fontSize: "70px",
                    fontFamily: "Arial",
                    fontFillStyle: "white",
                    size: 300,
                    borderWidth: 25,
                    backgroundColor: "##7be495",
                    foregroundColor: "#cff4d2"
                };

                var currentFillPercentage = 0;
                var fillPercentage = 0;

                //#region fluid context values
                var foregroundFluidLayer = {
                    fillStyle: "green",
                    angle: 0,
                    horizontalPosition: 0,
                    angularSpeed: 0,
                    maxAmplitude: 9,
                    frequency: 30,
                    horizontalSpeed: -150,
                    initialHeight: 0
                };

                var backgroundFluidLayer = {
                    fillStyle: "blue",
                    angle: 0,
                    horizontalPosition: 0,
                    angularSpeed: 140,
                    maxAmplitude: 12,
                    frequency: 40,
                    horizontalSpeed: 150,
                    initialHeight: 0
                };

                var bubblesLayer = {
                    bubbles: [],
                    amount: 12,
                    speed: 20,
                    current: 0,
                    swing: 0,
                    size: 2,
                    reset: function(bubble) {
                        // calculate the area where to spawn the bubble based on the fluid area
                        var meterBottom = (options.size - (options.size - getMeterRadius()) / 2) - options.borderWidth;
                        var fluidAmount = currentFillPercentage * (getMeterRadius() - options.borderWidth * 2) / 100;

                        bubble.r = random(this.size, this.size * 2) / 2;
                        bubble.x = random(0, options.size);
                        bubble.y = random(meterBottom, meterBottom - fluidAmount);
                        bubble.velX = 0;
                        bubble.velY = random(this.speed, this.speed * 2);
                        bubble.swing = random(0, 2 * Math.PI);
                    },
                    init() {
                        for (var i = 0; i < this.amount; i++) {

                            var meterBottom = (options.size - (options.size - getMeterRadius()) / 2) - options.borderWidth;
                            var fluidAmount = currentFillPercentage * (getMeterRadius() - options.borderWidth * 2) / 100;
                            this.bubbles.push({
                                x: random(0, options.size),
                                y: random(meterBottom, meterBottom - fluidAmount),
                                r: random(this.size, this.size * 2) / 2,
                                velX: 0,
                                velY: random(this.speed, this.speed * 2)
                            });
                        }
                    }
                }
                //#endregion

                /**
                 * initializes and mount the canvas element on the document
                 */
                function setupCanvas() {
                    var canvas = document.createElement('canvas');
                    canvas.width = options.size;
                    canvas.height = options.size;
                    canvas.imageSmoothingEnabled = true;
                    context = canvas.getContext("2d");
                    targetContainer.appendChild(canvas);

                    // shadow is not required  to be on the draw loop
                    //#region shadow
                    if (options.drawShadow) {
                        context.save();
                        context.beginPath();
                        context.filter = "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))";
                        context.arc(options.size / 2, options.size / 2, getMeterRadius() / 2, 0, 2 * Math.PI);
                        context.closePath();
                        context.fill();
                        context.restore();
                    }
                    //#endregion
                }

                /**
                 * draw cycle
                 */
                function draw() {
                    var now = new Date().getTime();
                    dt = (now - (time || now)) / 1000;
                    time = now;

                    requestAnimationFrame(draw);
                    context.clearRect(0, 0, options.size, options.size);
                    drawMeterBackground();
                    drawFluid(dt);
                    if (options.drawText) {
                        drawText();
                    }
                    drawMeterForeground();
                }

                function drawMeterBackground() {
                    context.save();
                    context.fillStyle = options.backgroundColor;
                    context.beginPath();
                    context.arc(options.size / 2, options.size / 2, getMeterRadius() / 2 - options.borderWidth, 0, 2 * Math.PI);
                    context.closePath();
                    context.fill();
                    context.restore();
                }

                function drawMeterForeground() {
                    context.save();
                    context.lineWidth = options.borderWidth;
                    context.strokeStyle = options.foregroundColor;
                    context.beginPath();
                    context.arc(options.size / 2, options.size / 2, getMeterRadius() / 2 - options.borderWidth / 2, 0, 2 * Math
                        .PI);
                    context.closePath();
                    context.stroke();
                    context.restore();
                }
                /**
                 * draws the fluid contents of the meter
                 * @param  {} dt elapsed time since last frame
                 */
                function drawFluid(dt) {
                    context.save();
                    context.arc(options.size / 2, options.size / 2, getMeterRadius() / 2 - options.borderWidth, 0, Math.PI * 2);
                    context.clip();
                    drawFluidLayer(backgroundFluidLayer, dt);
                    drawFluidLayer(foregroundFluidLayer, dt);
                    if (options.drawBubbles) {
                        drawFluidMask(foregroundFluidLayer, dt);
                        drawBubblesLayer(dt);
                    }
                    context.restore();
                }


                /**
                 * draws the foreground fluid layer
                 * @param  {} dt elapsed time since last frame
                 */
                function drawFluidLayer(layer, dt) {
                    // calculate wave angle
                    if (layer.angularSpeed > 0) {
                        layer.angle += layer.angularSpeed * dt;
                        layer.angle = layer.angle < 0 ? layer.angle + 360 : layer.angle;
                    }

                    // calculate horizontal position
                    layer.horizontalPosition += layer.horizontalSpeed * dt;
                    if (layer.horizontalSpeed > 0) {
                        layer.horizontalPosition > Math.pow(2, 53) ? 0 : layer.horizontalPosition;
                    } else if (layer.horizontalPosition < 0) {
                        layer.horizontalPosition < -1 * Math.pow(2, 53) ? 0 : layer.horizontalPosition;
                    }

                    var x = 0;
                    var y = 0;
                    var amplitude = layer.maxAmplitude * Math.sin(layer.angle * Math.PI / 180);

                    var meterBottom = (options.size - (options.size - getMeterRadius()) / 2) - options.borderWidth;
                    var fluidAmount = currentFillPercentage * (getMeterRadius() - options.borderWidth * 2) / 100;

                    if (currentFillPercentage < fillPercentage) {
                        currentFillPercentage += 15 * dt;
                    } else if (currentFillPercentage > fillPercentage) {
                        currentFillPercentage -= 15 * dt;
                    }

                    layer.initialHeight = meterBottom - fluidAmount;

                    context.save();
                    context.beginPath();

                    context.lineTo(0, layer.initialHeight);

                    while (x < options.size) {
                        y = layer.initialHeight + amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
                        context.lineTo(x, y);
                        x++;
                    }

                    context.lineTo(x, options.size);
                    context.lineTo(0, options.size);
                    context.closePath();

                    context.fillStyle = layer.fillStyle;
                    context.fill();
                    context.restore();
                }

                /**
                 * clipping mask for objects within the fluid constrains
                 * @param {Object} layer layer to be used as a mask
                 */
                function drawFluidMask(layer) {
                    var x = 0;
                    var y = 0;
                    var amplitude = layer.maxAmplitude * Math.sin(layer.angle * Math.PI / 180);

                    context.beginPath();

                    context.lineTo(0, layer.initialHeight);

                    while (x < options.size) {
                        y = layer.initialHeight + amplitude * Math.sin((x + layer.horizontalPosition) / layer.frequency);
                        context.lineTo(x, y);
                        x++;
                    }
                    context.lineTo(x, options.size);
                    context.lineTo(0, options.size);
                    context.closePath();
                    context.clip();
                }

                function drawBubblesLayer(dt) {
                    context.save();
                    for (var i = 0; i < bubblesLayer.bubbles.length; i++) {
                        var bubble = bubblesLayer.bubbles[i];

                        context.beginPath();
                        context.strokeStyle = 'white';
                        context.arc(bubble.x, bubble.y, bubble.r, 2 * Math.PI, false);
                        context.stroke();
                        context.closePath();

                        var currentSpeed = bubblesLayer.current * dt;

                        bubble.velX = Math.abs(bubble.velX) < Math.abs(bubblesLayer.current) ? bubble.velX + currentSpeed :
                            bubblesLayer.current;
                        bubble.y = bubble.y - bubble.velY * dt;
                        bubble.x = bubble.x + (bubblesLayer.swing ? 0.4 * Math.cos(bubblesLayer.swing += 0.03) * bubblesLayer
                            .swing : 0) + bubble.velX * 0.5;

                        // determine if current bubble is outside the safe area
                        var meterBottom = (options.size - (options.size - getMeterRadius()) / 2) - options.borderWidth;
                        var fluidAmount = currentFillPercentage * (getMeterRadius() - options.borderWidth * 2) / 100;

                        if (bubble.y <= meterBottom - fluidAmount) {
                            bubblesLayer.reset(bubble);
                        }

                    }
                    context.restore();
                }

                function drawText() {

                    var text = options.drawPercentageSign ?
                        currentFillPercentage.toFixed(0) + "%" : currentFillPercentage.toFixed(0);

                    context.save();
                    context.font = getFontSize();
                    context.fillStyle = options.fontFillStyle;
                    context.textAlign = "center";
                    context.textBaseline = 'middle';
                    context.filter = "drop-shadow(0px 0px 5px rgba(0,0,0,0.4))"
                    context.fillText(text, options.size / 2, options.size / 2);
                    context.restore();
                }

                //#region helper methods
                function clamp(number, min, max) {
                    return Math.min(Math.max(number, min), max);
                };

                function getMeterRadius() {
                    return options.size * 0.9;
                }

                function random(min, max) {
                    var delta = max - min;
                    return max === min ? min : Math.random() * delta + min;
                }

                function getFontSize() {
                    return options.fontSize + " " + options.fontFamily;
                }
                //#endregion

                return {
                    init: function(env) {
                        if (!env.targetContainer)
                            throw "empty or invalid container";

                        targetContainer = env.targetContainer;
                        fillPercentage = clamp(env.fillPercentage, 0, 100);

                        if (env.options) {
                            options.drawShadow = env.options.drawShadow === false ? false : true;
                            options.size = env.options.size;
                            options.drawBubbles = env.options.drawBubbles === false ? false : true;
                            options.borderWidth = env.options.borderWidth || options.borderWidth;
                            options.foregroundFluidColor = env.options.foregroundFluidColor || options.foregroundFluidColor;
                            options.backgroundFluidColor = env.options.backgroundFluidColor || options.backgroundFluidColor;
                            options.backgroundColor = env.options.backgroundColor || options.backgroundColor;
                            options.foregroundColor = env.options.foregroundColor || options.foregroundColor;

                            options.drawText = env.options.drawText === false ? false : true;
                            options.drawPercentageSign = env.options.drawPercentageSign === false ? false : true;
                            options.fontSize = env.options.fontSize || options.fontSize;
                            options.fontFamily = env.options.fontFamily || options.fontFamily;
                            options.fontFillStyle = env.options.fontFillStyle || options.fontFillStyle;
                            // fluid settings

                            if (env.options.foregroundFluidLayer) {
                                foregroundFluidLayer.fillStyle = env.options.foregroundFluidLayer.fillStyle ||
                                    foregroundFluidLayer.fillStyle;
                                foregroundFluidLayer.angularSpeed = env.options.foregroundFluidLayer.angularSpeed ||
                                    foregroundFluidLayer.angularSpeed;
                                foregroundFluidLayer.maxAmplitude = env.options.foregroundFluidLayer.maxAmplitude ||
                                    foregroundFluidLayer.maxAmplitude;
                                foregroundFluidLayer.frequency = env.options.foregroundFluidLayer.frequency ||
                                    foregroundFluidLayer.frequency;
                                foregroundFluidLayer.horizontalSpeed = env.options.foregroundFluidLayer.horizontalSpeed ||
                                    foregroundFluidLayer.horizontalSpeed;
                            }

                            if (env.options.backgroundFluidLayer) {
                                backgroundFluidLayer.fillStyle = env.options.backgroundFluidLayer.fillStyle ||
                                    backgroundFluidLayer.fillStyle;
                                backgroundFluidLayer.angularSpeed = env.options.backgroundFluidLayer.angularSpeed ||
                                    backgroundFluidLayer.angularSpeed;
                                backgroundFluidLayer.maxAmplitude = env.options.backgroundFluidLayer.maxAmplitude ||
                                    backgroundFluidLayer.maxAmplitude;
                                backgroundFluidLayer.frequency = env.options.backgroundFluidLayer.frequency ||
                                    backgroundFluidLayer.frequency;
                                backgroundFluidLayer.horizontalSpeed = env.options.backgroundFluidLayer.horizontalSpeed ||
                                    backgroundFluidLayer.horizontalSpeed;
                            }
                        }

                        bubblesLayer.init();
                        setupCanvas();
                        draw();
                    },
                    setPercentage(percentage) {

                        fillPercentage = clamp(percentage, 0, 100);
                    }
                }
            };
        </script>
        <style>
            .fluid-meter-container {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
            }

                                                .fluid-meter {
                                                    max-width: 100%;
                                                    /* Make the fluid meter responsive */
                                                }
                                            </style>
                                            <div class="col-md-6">
                                                <div id="id13">
                                                    <div class="fluid-meter-container">
                                                        <div class="text-center fw-bold" id="fluid-meter">
                                                            <h6 class="card-title text-center" style="color:#107dd8">Tandon Atas</h6>
                                                        </div>
                                                    </div>
                                                    <div id="lighticon"
                                                        class="text-center text-muted justify-content-center align-items-center pt-2"
                                                        style="font-size: 20px;">
                                                        <div class="row justify-content-center">
                                                            <div class="col justify-content-start align-items-center"
                                                                style="padding-bottom: 20px; margin-left:5px">
                                                                <a href="youtube.com" class="btn btn-primary me-2"><svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16" height="16"
                                                                        fill="currentColor" class="bi bi-calendar"
                                                                        viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                                    </svg></a>
                                                                <a href="#" id="grafik8"
                                                                    class="btn btn-primary"><svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="16" height="16"
                                                                        fill="currentColor" class="bi bi-graph-up"
                                                                        viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd"
                                                                            d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                                                    </svg></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="id14" style="" class="text-center">
                                                    <div class="chartstyle py-5">
                                                        <canvas id="lightchart" width="406" height="0"></canvas>
                                                        <div class="lighterrore">@include('chartvol1')</div>
                                                    </div>
                                                    <button class="btn bg-success text-white" id="lightpng1"
                                                        type="button">Export as PNG</button>
                                                    <button id="close8"
                                                        class="btn bg-success text-white lighttutupc">Close</button>

                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div id="id15">
                                                    <div class="fluid-meter-container">
                                                        <div class="text-center fw-bold" id="fluid-meter1">
                                                            <h6 class="card-title text-center" style="color:#107dd8">Tandon Bawah</h6>
                                                        </div>
                                                    </div>
                                                    <div id="lighticon"
                                                        class="text-center text-muted justify-content-center align-items-center pt-2"
                                                        style="font-size: 20px;">
                                                        <div class="row justify-content-center">
                                                            <div class="col justify-content-start align-items-center"
                                                                style="padding-bottom: 20px; margin-left:5px">
                                                                <a href="youtube.com" class="btn btn-primary me-2"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                        fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                                                        <path
                                                                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
                                                                    </svg></a>
                                                                <a href="#" id="grafik9" class="btn btn-primary"><svg
                                                                        xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                        fill="currentColor" class="bi bi-graph-up" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd"
                                                                            d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                                                                    </svg></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="id16" style="" class="text-center">
                                                    <div class="chartstyle py-5">
                                                        <canvas id="lightchart" width="406" height="0"></canvas>
                                                        <div class="lighterrore">@include('chartvol1')</div>
                                                    </div>
                                                    <button class="btn bg-success text-white" id="lightpng1" type="button">Export as
                                                        PNG</button>
                                                    <button id="close9" class="btn bg-success text-white lighttutupc">Close</button>
                                                    <br>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 mt-md-3">
                                <div class="card mb-3 text-center fade-in-and-slide2" style="padding:20px">
                                    <div class="card-header">
                                        <ul class="nav nav-pills card-header-pills">
                                            <li class="nav-item">
                                                <a class="nav-link active" href="#"
                                                    onclick="changeContent('active')">Otomatis</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" href="#"
                                                    onclick="changeContent('link')">Controlling</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="card-body" id="cardContent">
                                        <h5 class="card-title">Penyiraman Irigasi</h5>
                                        <p class="card-text text-center">Penyiraman Irigasi Dilakukan Secara Otomatis. Penyiraman Otomatis Dilakukan Pada Pagi Dan Sore Hari</p>
                                    </div>
                                </div>

                                <script>
                                    function changeContent(type) {
                                        var cardContent = document.getElementById('cardContent');
                                        if (type === 'active') {
                                            cardContent.innerHTML =
                                                '<h5 class="card-title">Penyiraman Irigasi</h5><p class="card-text text-center">Penyiraman Irigasi Dilakukan Secara Otomatis. Penyiraman Otomatis Dilakukan Pada Pagi Dan Sore Hari</p>';
                                        } else if (type === 'link') {
                                            cardContent.innerHTML =
                                                '<h5 class="card-title">Controlling</h5><p class="card-text">Controlling irigasi bermanfaat untuk mengatur pengendalian pengairan pada sawah. Pengendalian irigasi dengan memasukkan lama air yang akan mengairi irigasi sawah dengan satuan menit. Ketika anda klik simpan maka pengairan pada sawah akan otomatis dinyalakan sesuai dengan lamanya input pengairan yang diharapkan</p><h6 style="color: rgb(0, 0, 0)">Masukkan Nilai Menit</h6><form id="nilaiForm" method="post">@csrf<input type="number" name="nilaiMenit" id="nilaiMenit" required><label>  Menit</label><br><br><button type="submit" class="btn btn-primary btn-block">Simpan</button></form>';
                                        }
                                    }
                                </script>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4" style="margin-bottom:2%">
                        <div class="card fade-in-and-slide3 bg-gradient" style="height:100%;padding:10px">
                            <div class="card-header bg-gradient">
                                <h4 class="m-0" style="color:#107dd8">Gambar Lahan Pertanian
                                </h4>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-12 text-dark">
                                        <div id="carouselExampleFade" class="carousel slide carousel-fade">
                                            <div class="carousel-inner">
                                                <div class="carousel-item active">
                                                    <img src="irigasi.jpg" class="d-block w-100" alt="...">
                                                </div>
                                                <div class="carousel-item">
                                                    <img src="iri.jpg" class="d-block w-100" alt="...">
                                                </div>
                                            </div>
                                            <button class="carousel-control-prev" type="button"
                                                data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next" type="button"
                                                data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer bg-gradient">
                                <div class="row no-gutters align-items-center">
                                    <img class="col-3 ml-8 mb-8" src="cloudy.png" alt="Cloudy">
                                    <div class="col-7 ml-5" style="font-size: 18px; color:#107dd8">
                                        <br>
                                        <p style="color: black"> <span id="lastUpdated20"></span> </p>
                                        <script>
                                            // Function to format timestamp to human-readable date and time
                                            function formatTimestamp(timestamp) {
                                                const date = new Date(timestamp);
                                                return date.toLocaleString(); // You can customize the format as needed
                                            }

                                            // Fetch last update time
                                            fetch("/api/data-suhu-spirit/")
                                                .then((res) => res.json())
                                                .then(result => {
                                                    // Display last update time
                                                    document.getElementById("lastUpdated20").innerText = "Last Update: " + formatTimestamp(result.data
                                                        .waktu_rtc);
                                                });
                                        </script>
                                        <div class="font-weight-bold text-dark" id="suhu"></div>
                                        <br>
                                        <p style="color: black"> <span id="lastUpdated21"></span> </p>
                                        <script>
                                            // Function to format timestamp to human-readable date and time
                                            function formatTimestamp(timestamp) {
                                                const date = new Date(timestamp);
                                                return date.toLocaleString(); // You can customize the format as needed
                                            }

                                            // Fetch last update time
                                            fetch("/api/data-kelembaban-spirit/")
                                                .then((res) => res.json())
                                                .then(result => {
                                                    // Display last update time
                                                    document.getElementById("lastUpdated21").innerText = "Last Update: " + formatTimestamp(result.data
                                                        .waktu_rtc);
                                                });
                                        </script>
                                        <div class="font-weight-bold text-dark" id="kelembaban"></div>
                                        <script>
                                            fetch("/api/data-suhu-spirit/")
                                                .then((res) => res.json())
                                                .then(result => {
                                                    // Display last update time
                                                    document.getElementById("suhu").innerText = "Suhu | " + (result.data
                                                        .suhu) + " °C";
                                                });
                                        </script>
                                        <script>
                                            fetch("/api/data-kelembaban-spirit/")
                                                .then((res) => res.json())
                                                .then(result => {
                                                    // Display last update time
                                                    document.getElementById("kelembaban").innerText = "Kelembaban | " + (result.data
                                                        .kelembaban) + " %";
                                                });
                                        </script>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .card-container {
                    margin: 20px;
                }

                .big-card {
                    background-color: #84c8ff;

                }

                .row {
                    display: flex;
                    justify-content: space-between;
                    height: 100%;
                }
                
                .fade-in-and-slide1 {
                    opacity: 0;
                    transform: translateY(-50px);
                    animation: fadeInAndSlideAnimation 1s ease-out forwards;
                    animation-delay: 1.5s;
                }
        
                @keyframes fadeInAndSlideAnimation {
                    from {
                        opacity: 0;
                        transform: translateY(-50px);
                    }
        
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                });
            });
    </script>

    </div>
    </div>
    <!-- / Content -->
    <!--</div>-->
    <!--</div>-->
    <!-- Footer -->
    <!-- Footer-->
    <!--<footer class="content-footer footer bg-footer-theme">-->
    <!--    <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">-->
    <!--        <div class="mb-2 mb-md-0">-->
    <!--            ©-->
    <!--            <script>
        -- >
        <
        !--document.write(new Date().getFullYear()) -- >
            <
            !--
    </script>-->
    <!--            , made by <a href="https://themeselection.com" target="_blank" class="footer-link fw-bolder">OmahIoT</a>-->
    <!--        </div>-->
    <!--        {{-- <div>-->
    <!--        <a href="https://themeselection.com/license/" class="footer-link me-4"-->
    <!--            target="_blank">License</a>-->
    <!--        <a href="https://themeselection.com/" target="_blank" class="footer-link me-4">More-->
    <!--            Themes</a>-->
    <!--        <a href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/laravel-introduction.html"-->
    <!--            target="_blank" class="footer-link me-4">Documentation</a>-->
    <!--        <a href="https://github.com/themeselection/sneat-html-laravel-admin-template-free/issues"-->
    <!--            target="_blank" class="footer-link d-none d-sm-inline-block">Support</a>-->
    <!--    </div> --}}-->
    <!--    </div>-->
    <!--</footer>-->
    <!--/ Footer-->
    <!-- / Footer -->

    </div>
    <!--/ Content wrapper -->
    </div>
    <!-- / Layout page -->

    <!-- Overlay -->
    <!--<div class="layout-overlay layout-menu-toggle"></div>-->
    <!-- Drag Target Area To SlideIn Menu On Small Screens -->
    <!--<div class="drag-target"></div>-->
    </div>
    <!-- / Layout wrapper -->
    <!--/ Layout Content -->
    </section>
    <!-- Include Scripts -->
    <!-- BEGIN: Vendor JS-->
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/jquery/jquery.js?id=c9eab148c98f81221c99ba6da84fdbe2">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/popper/popper.js?id=3b2f93fa0eb2f0ed310a789319de72fc">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/js/bootstrap.js?id=f4406bcd0acdeffbdcca24c2e1033ae6">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js?id=2f948c841c6aca9e3a18f6ef2c65b140">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/js/menu.js?id=3421096250c82e0d3760f641a4d2dba0">
    </script>
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/vendor/libs/apex-charts/apexcharts.js">
    </script>
    <!-- END: Page Vendor JS-->
    <!-- BEGIN: Theme JS-->
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/js/main.js?id=0c91cceb5195b308a36d5ac021b16464">
    </script>

    <!-- END: Theme JS-->
    <!-- Pricing Modal JS-->
    <!-- END: Pricing Modal JS-->
    <!-- BEGIN: Page JS-->
    <script
        src="https://demos.themeselection.com/sneat-bootstrap-html-laravel-admin-template-free/demo/assets/js/dashboards-analytics.js">
    </script>
    <!-- END: Page JS-->




    <svg id="SvgjsSvg1283" width="2" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev"
        style="overflow: hidden; top: -100%; left: -100%; position: absolute; opacity: 0;">
        <defs id="SvgjsDefs1284"></defs>
        <polyline id="SvgjsPolyline1285" points="0,0"></polyline>
        <path id="SvgjsPath1286"
            d="M-1 217.1625L-1 217.1625C-1 217.1625 61.09071568080357 217.1625 61.09071568080357 217.1625C61.09071568080357 217.1625 122.18143136160714 217.1625 122.18143136160714 217.1625C122.18143136160714 217.1625 183.27214704241072 217.1625 183.27214704241072 217.1625C183.27214704241072 217.1625 244.36286272321428 217.1625 244.36286272321428 217.1625C244.36286272321428 217.1625 305.45357840401783 217.1625 305.45357840401783 217.1625C305.45357840401783 217.1625 366.54429408482144 217.1625 366.54429408482144 217.1625C366.54429408482144 217.1625 427.635009765625 217.1625 427.635009765625 217.1625C427.635009765625 217.1625 427.635009765625 217.1625 427.635009765625 217.1625 ">
        </path>
    </svg>
    </body>

    </html>
@endsection
