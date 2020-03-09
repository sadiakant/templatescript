//<![CDATA[
/*! Theia Sticky Sidebar | v1.7.0 - https://github.com/WeCodePixels/theia-sticky-sidebar */
(function($){$.fn.theiaStickySidebar=function(options){var defaults={'containerSelector':'','additionalMarginTop':0,'additionalMarginBottom':0,'updateSidebarHeight':true,'minWidth':0,'disableOnResponsiveLayouts':true,'sidebarBehavior':'modern','defaultPosition':'relative','namespace':'TSS'};options=$.extend(defaults,options);options.additionalMarginTop=parseInt(options.additionalMarginTop)||0;options.additionalMarginBottom=parseInt(options.additionalMarginBottom)||0;tryInitOrHookIntoEvents(options,this);function tryInitOrHookIntoEvents(options,$that){var success=tryInit(options,$that);if(!success){console.log('TSS: Body width smaller than options.minWidth. Init is delayed.');$(document).on('scroll.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that));$(window).on('resize.'+options.namespace,function(options,$that){return function(evt){var success=tryInit(options,$that);if(success){$(this).unbind(evt)}}}(options,$that))}}function tryInit(options,$that){if(options.initialized===true){return true}if($('body').width()<options.minWidth){return false}init(options,$that);return true}function init(options,$that){options.initialized=true;var existingStylesheet=$('#theia-sticky-sidebar-stylesheet-'+options.namespace);if(existingStylesheet.length===0){$('head').append($('<style id="theia-sticky-sidebar-stylesheet-'+options.namespace+'">.theiaStickySidebar:after {content: ""; display: table; clear: both;}</style>'))}$that.each(function(){var o={};o.sidebar=$(this);o.options=options||{};o.container=$(o.options.containerSelector);if(o.container.length==0){o.container=o.sidebar.parent()}o.sidebar.parents().css('-webkit-transform','none');o.sidebar.css({'position':o.options.defaultPosition,'overflow':'visible','-webkit-box-sizing':'border-box','-moz-box-sizing':'border-box','box-sizing':'border-box'});o.stickySidebar=o.sidebar.find('.theiaStickySidebar');if(o.stickySidebar.length==0){var javaScriptMIMETypes=/(?:text|application)\/(?:x-)?(?:javascript|ecmascript)/i;o.sidebar.find('script').filter(function(index,script){return script.type.length===0||script.type.match(javaScriptMIMETypes)}).remove();o.stickySidebar=$('<div>').addClass('theiaStickySidebar').append(o.sidebar.children());o.sidebar.append(o.stickySidebar)}o.marginBottom=parseInt(o.sidebar.css('margin-bottom'));o.paddingTop=parseInt(o.sidebar.css('padding-top'));o.paddingBottom=parseInt(o.sidebar.css('padding-bottom'));var collapsedTopHeight=o.stickySidebar.offset().top;var collapsedBottomHeight=o.stickySidebar.outerHeight();o.stickySidebar.css('padding-top',1);o.stickySidebar.css('padding-bottom',1);collapsedTopHeight-=o.stickySidebar.offset().top;collapsedBottomHeight=o.stickySidebar.outerHeight()-collapsedBottomHeight-collapsedTopHeight;if(collapsedTopHeight==0){o.stickySidebar.css('padding-top',0);o.stickySidebarPaddingTop=0}else{o.stickySidebarPaddingTop=1}if(collapsedBottomHeight==0){o.stickySidebar.css('padding-bottom',0);o.stickySidebarPaddingBottom=0}else{o.stickySidebarPaddingBottom=1}o.previousScrollTop=null;o.fixedScrollTop=0;resetSidebar();o.onScroll=function(o){if(!o.stickySidebar.is(":visible")){return}if($('body').width()<o.options.minWidth){resetSidebar();return}if(o.options.disableOnResponsiveLayouts){var sidebarWidth=o.sidebar.outerWidth(o.sidebar.css('float')=='none');if(sidebarWidth+50>o.container.width()){resetSidebar();return}}var scrollTop=$(document).scrollTop();var position='static';if(scrollTop>=o.sidebar.offset().top+(o.paddingTop-o.options.additionalMarginTop)){var offsetTop=o.paddingTop+options.additionalMarginTop;var offsetBottom=o.paddingBottom+o.marginBottom+options.additionalMarginBottom;var containerTop=o.sidebar.offset().top;var containerBottom=o.sidebar.offset().top+getClearedHeight(o.container);var windowOffsetTop=0+options.additionalMarginTop;var windowOffsetBottom;var sidebarSmallerThanWindow=(o.stickySidebar.outerHeight()+offsetTop+offsetBottom)<$(window).height();if(sidebarSmallerThanWindow){windowOffsetBottom=windowOffsetTop+o.stickySidebar.outerHeight()}else{windowOffsetBottom=$(window).height()-o.marginBottom-o.paddingBottom-options.additionalMarginBottom}var staticLimitTop=containerTop-scrollTop+o.paddingTop;var staticLimitBottom=containerBottom-scrollTop-o.paddingBottom-o.marginBottom;var top=o.stickySidebar.offset().top-scrollTop;var scrollTopDiff=o.previousScrollTop-scrollTop;if(o.stickySidebar.css('position')=='fixed'){if(o.options.sidebarBehavior=='modern'){top+=scrollTopDiff}}if(o.options.sidebarBehavior=='stick-to-top'){top=options.additionalMarginTop}if(o.options.sidebarBehavior=='stick-to-bottom'){top=windowOffsetBottom-o.stickySidebar.outerHeight()}if(scrollTopDiff>0){top=Math.min(top,windowOffsetTop)}else{top=Math.max(top,windowOffsetBottom-o.stickySidebar.outerHeight())}top=Math.max(top,staticLimitTop);top=Math.min(top,staticLimitBottom-o.stickySidebar.outerHeight());var sidebarSameHeightAsContainer=o.container.height()==o.stickySidebar.outerHeight();if(!sidebarSameHeightAsContainer&&top==windowOffsetTop){position='fixed'}else if(!sidebarSameHeightAsContainer&&top==windowOffsetBottom-o.stickySidebar.outerHeight()){position='fixed'}else if(scrollTop+top-o.sidebar.offset().top-o.paddingTop<=options.additionalMarginTop){position='static'}else{position='absolute'}}if(position=='fixed'){var scrollLeft=$(document).scrollLeft();o.stickySidebar.css({'position':'fixed','width':getWidthForObject(o.stickySidebar)+'px','transform':'translateY('+top+'px)','left':(o.sidebar.offset().left+parseInt(o.sidebar.css('padding-left'))-scrollLeft)+'px','top':'0px'})}else if(position=='absolute'){var css={};if(o.stickySidebar.css('position')!='absolute'){css.position='absolute';css.transform='translateY('+(scrollTop+top-o.sidebar.offset().top-o.stickySidebarPaddingTop-o.stickySidebarPaddingBottom)+'px)';css.top='0px'}css.width=getWidthForObject(o.stickySidebar)+'px';css.left='';o.stickySidebar.css(css)}else if(position=='static'){resetSidebar()}if(position!='static'){if(o.options.updateSidebarHeight==true){o.sidebar.css({'min-height':o.stickySidebar.outerHeight()+o.stickySidebar.offset().top-o.sidebar.offset().top+o.paddingBottom})}}o.previousScrollTop=scrollTop};o.onScroll(o);$(document).on('scroll.'+o.options.namespace,function(o){return function(){o.onScroll(o)}}(o));$(window).on('resize.'+o.options.namespace,function(o){return function(){o.stickySidebar.css({'position':'static'});o.onScroll(o)}}(o));if(typeof ResizeSensor!=='undefined'){new ResizeSensor(o.stickySidebar[0],function(o){return function(){o.onScroll(o)}}(o))}function resetSidebar(){o.fixedScrollTop=0;o.sidebar.css({'min-height':'1px'});o.stickySidebar.css({'position':'static','width':'','transform':'none'})}function getClearedHeight(e){var height=e.height();e.children().each(function(){height=Math.max(height,$(this).height())});return height}})}function getWidthForObject(object){var width;try{width=object[0].getBoundingClientRect().width}catch(err){}if(typeof width==="undefined"){width=object.width()}return width}return this}})(jQuery);

/*! MenuIfy by Templateify | v1.0.0 - https://www.templateify.com */
!function(a){a.fn.menuify=function(){return this.each(function(){var $t=a(this),b=$t.find('.LinkList ul > li').children('a'),c=b.length;for(var i=0;i<c;i++){var d=b.eq(i),h=d.text();if(h.charAt(0)!=='_'){var e=b.eq(i+1),j=e.text();if(j.charAt(0)==='_'){var m=d.parent();m.append('<ul class="sub-menu m-sub"/>');}}if(h.charAt(0)==='_'){d.text(h.replace('_',''));d.parent().appendTo(m.children('.sub-menu'));}}for(var i=0;i<c;i++){var f=b.eq(i),k=f.text();if(k.charAt(0)!=='_'){var g=b.eq(i+1),l=g.text();if(l.charAt(0)==='_'){var n=f.parent();n.append('<ul class="sub-menu2 m-sub"/>');}}if(k.charAt(0)==='_'){f.text(k.replace('_',''));f.parent().appendTo(n.children('.sub-menu2'));}}$t.find('.LinkList ul li ul').parent('li').addClass('has-sub');});}}(jQuery);

/*! Tabify by Templateify | v1.0.0 - https://www.templateify.com */
!function(a){a.fn.tabify=function(b){b=jQuery.extend({onHover:false,animated:true,transition:'fadeInUp'},b);return this.each(function(){var e=a(this),c=e.children('[tab-ify]'),d=0,n='tab-animated',k='tab-active';if(b.onHover==true){var event='mouseenter'}else{var event='click'}e.prepend('<ul class="select-tab"></ul>');c.each(function(){if(b.animated==true){a(this).addClass(n)}e.find('.select-tab').append('<li><a href="javascript:;">'+a(this).attr('tab-ify')+'</a></li>')}).eq(d).addClass(k).addClass('tab-'+b.transition);e.find('.select-tab a').on(event,function(){var f=a(this).parent().index();a(this).closest('.select-tab').find('.active').removeClass('active');a(this).parent().addClass('active');c.removeClass(k).removeClass('tab-'+b.transition).eq(f).addClass(k).addClass('tab-'+b.transition);return false}).eq(d).parent().addClass('active')})}}(jQuery);

/*! jQuery replaceText by "Cowboy" Ben Alman | v1.1.0 - http://benalman.com/projects/jquery-replacetext-plugin/ */
(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);
//]]>
//<![CDATA[
var _$_obify1 = ["lazyify", "fn", "data-image", "attr", "width", "round", "height", "/w", "-h", "-p-k-no-nu", "", "s72-c", "match", "/s72-c", "replace", "w72-h", "/w72-h72-p-k-no-nu", "load resize scroll", "on", "scrollTop", "top", "offset", "onload", "lazy-ify", "addClass", "style", "background-image:url(", "src", ")", "each", "menuify", "#magify-main-menu", "show-menu", "#magify-main-menu .widget", "click", "search-active", "toggleClass", "body", ".search-toggle", "text", ".blog-posts-title a.more,.related-title a.more", ".follow-by-email-text", "trim", "$ads={1}", "<div id=\"new-before-ad\"/>", "replaceWith", "$ads={2}", "<div id=\"new-after-ad\"/>", ".post-body strike", "length", "appendTo", "#before-ad", "#new-before-ad", "#after-ad", "#new-after-ad", "#main-before-ad .widget", "#main-after-ad .widget", ".count", "find", "content", "data", "$", "split", "href", "#social-counter ul.social-icons li a", "//resources.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/s35-r/avatar.jpg", "//img1.blogblog.com/img/blank.gif", ".avatar-image-container img", "/", "pop", "button", "css", "colored-button", ".post-body a", "html", "contact-form", "<div class=\"contact-form\"/>", "#ContactForm1", "append", ".contact-form", "alert-success", "<div class=\"alert-message alert-success short-b\">", "</div>", "alert-info", "<div class=\"alert-message alert-info short-b\">", "alert-warning", "<div class=\"alert-message alert-warning short-b\">", "alert-error", "<div class=\"alert-message alert-error short-b\">", "left-sidebar", "<style>.item #main-wrapper{float:right}.item #sidebar-wrapper{float:left}</style>", "right-sidebar", "<style>.item #main-wrapper{float:left}.item #sidebar-wrapper{float:right}</style>", "full-width", "<style>.item #main-wrapper{width:100%}.item #sidebar-wrapper{display:none}</style>", "code-box", "<pre class=\"code-box short-b\">", "</pre>", "b", ".post-body .short-b", "url", "screen", "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=", ",height=", ",left=", ",top=", "open", "focus", ".share-links .window-ify,.entry-share .window-ify", ".show-hid a", "show-hidden", ".share-links", "<li class=\"", "\"><a href=\"", "\" title=\"", "\" target=\"_blank\"/></li>", ".author-description span li", ".author-description", "show-icons", ".about-author .author-description span a", "a", "toLowerCase", "getmega", "has-sub mega-menu", "msimple", "#magify-main-menu li", "featured", "#featured .HTML .widget-content", ".block-posts .HTML .widget-content", ".widget-ready .HTML .widget-content", "data-label", ".related-tag", "related", "getrelated", ".related-content", "<span class=\"no-posts\"><b>Error:</b> No Results Found</span>", "<div class=\"no-posts error-503\"><b>Error loading feeds!</b> Maybe because the connection failed or the blogger server did not respond to the request.</div>", "<div class=\"loader\"/>", "/feeds/posts/summary?alt=json&max-results=", "recent", "list", "/feeds/comments/summary?alt=json&max-results=", "/feeds/posts/summary/-/", "?alt=json&max-results=", "comments", "link", "rel", "alternate", "$t", "title", "media$thumbnail", "img.youtube.com", "/default.", "/0.", "https://4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s72-c/nth-ify.png", "name", "author", "postAuthor", "true", "<span class=\"entry-author\">", "</span>", "published", "substring", " ", ", ", "postDate", "<span class=\"entry-time\"><time class=\"published\" datetime=\"", "\">", "</time></span>", "<div class=\"entry-meta\">", "category", "term", "<span class=\"entry-category\">", "/s113", "/w55-h55-p-k-no-nu", "gd$image", "//4.bp.blogspot.com/-oSjP8F09qxo/Wy1J9dp7b0I/AAAAAAAACF0/ggcRfLCFQ9s2SSaeL9BFSE2wyTYzQaTyQCK4BGAYYCw/w55-h55-p-k-no-nu/avatar.jpg", "<article class=\"custom-item item-", "\"><a class=\"entry-image-link cmm-avatar\" href=\"", "\"><span class=\"entry-thumb\" data-image=\"", "\"/></a><h2 class=\"entry-title\"><a href=\"", "</a></h2><p class=\"cmm-snippet excerpt\">", "</p></article>", ".id-", "-", " .entry-category{background-color:", ";color:#fff}.id-", " .loader:after{border-color:", ";border-right-color:rgba(155,155,155,0.2)}", " .title-wrap:after,.id-", " .title-wrap > a.more:hover,.id-", " .entry-header:not(.entry-info) .entry-title a:hover{color:", "}.id-", "block1", "col-left", "col-right", "grid1", "videos", "geterror404", "GET", "json", "prepend", "#page-skin-2", "id-", " show-ify", "parent", "column-left block-column id-", "column-right block-column id-", "show-ify", "<ul class=\"mega-widget\">", "<div class=\"featured-posts\">", "<div class=\"block-posts-1\">", "<div class=\"column-posts\">", "<div class=\"grid-posts-1\">", "<div class=\"block-videos\">", "<div class=\"custom-widget\">", "<div class=\"related-posts\">", "entry", "feed", "<article class=\"mega-item\"><div class=\"mega-content\"><a class=\"entry-image-link\" href=\"", "</a></h2>", "</div></article>", "<article class=\"featured-item post item-", "\"><div class=\"featured-item-inner\"><a class=\"entry-image-link before-mask\" href=\"", "\"/></a>", "<div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"", "</div></div></article>", "<article class=\"block-item item-", "\"><div class=\"block-inner\">", "<a class=\"entry-image-link before-mask\" href=\"", "\"/></a><div class=\"entry-header entry-info\"><h2 class=\"entry-title\"><a href=\"", "\"><a class=\"entry-image-link\" href=\"", "\"/></a><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"", "<article class=\"column-item item-", "\"><div class=\"column-inner\">", "<article class=\"grid-item item-", "\"><div class=\"entry-image\"><a class=\"entry-image-link\" href=\"", "\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"", "<article class=\"videos-item item-", "\"/><span class=\"video-icon\"/></a></div><div class=\"entry-header\"><h2 class=\"entry-title\"><a href=\"", "<article class=\"related-item post item-", "</ul>", "/search", "/search/label/", "a:first", "span.entry-thumb", "<ul>", "ajax", "getfeatured", "getblock", "showMore", "<a class=\"more\" href=\"/search/label/", "</a>", ".widget-title", "getwidget", "<div class=\"fb-comments\" data-width=\"100%\" data-href=\"", "\" order_by=\"time\" data-numposts=\"5\"></div>", "comments-system-", "show", ".entry-meta .entry-comments-link", "blogger", "disqus", "#comments", "facebook", "hide", "comments-system-default", ".comments .toplevel-thread > ol > .comment .comment-actions .comment-reply", ".comments .toplevel-thread > #top-continue", ".blog-post-comments", ".index-post .entry-image-link .entry-thumb, .PopularPosts .entry-image-link .entry-thumb, .FeaturedPost .entry-image-link .entry-thumb,.about-author .author-avatar", "clone", "#main-logo .header-widget a", "remove", "#h1-tag", ".mobile-logo", "#magify-main-menu-nav", "id", "main-mobile-nav", ".getMega, .mega-widget, .mega-tab", "class", "sub-menu m-sub", ".complex-tabs > ul.select-tab", ".complex-tabs", ".mega-menu > a", ".mega-tabs ul li > a", "nav-active", ".show-mobile-menu, .hide-mobile-menu, .overlay", "<div class=\"submenu-toggle\"/>", ".mobile-menu .has-sub", ".submenu-toggle", ".mobile-menu .mega-menu", ".mobile-menu .mega-tabs", "has-sub", "hasClass", "preventDefault", "slideToggle", ".m-sub", "children", "> .m-sub", "removeClass", ".mobile-menu ul li .submenu-toggle", "#mobile-menu", "#about-section ul.social-footer", "social-bg-hover", ".social-mobile", "#footer-wrapper", "is-fixed", "scroll", "#header-wrapper .headerify", "theiaStickySidebar", "#main-wrapper,#sidebar-wrapper", "visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:14px!important;color:#fff!important;", "Blogger Templates", "", "a#templateify", "a#templateify:visible", "location", "fadeIn", "fadeOut", "on-footer", "animate", "html, body", ".back-top", "<img src=\"$1\"/>", "replaceText", "<iframe id=\"youtube\" width=\"100%\" height=\"358\" src=\"https://www.youtube.com/embed/$1\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>", "p.comment-content", "load", "#load-more-link", ".blog-posts", "post-animated post-fadeInUp", ".index-post", "#blog-pager .no-more", ".index-post .entry-image-link .entry-thumb", "#blog-pager .loading"];
! function (_0xaf1cx3) {
    _0xaf1cx3[_$_obify1[1]][_$_obify1[0]] = function () {
        return this[_$_obify1[29]](function () {
            var _0xaf1cx4 = _0xaf1cx3(this),
                _0xaf1cx5 = _0xaf1cx4[_$_obify1[3]](_$_obify1[2]),
                _0xaf1cx6 = Math[_$_obify1[5]](_0xaf1cx4[_$_obify1[4]]()),
                _0xaf1cx7 = Math[_$_obify1[5]](_0xaf1cx4[_$_obify1[6]]()),
                _0xaf1cx8 = _$_obify1[7] + _0xaf1cx6 + _$_obify1[8] + _0xaf1cx7 + _$_obify1[9],
                _0xaf1cx9 = _$_obify1[10];
            if (_0xaf1cx5[_$_obify1[12]](_$_obify1[11])) {
                _0xaf1cx9 = _0xaf1cx5[_$_obify1[14]](_$_obify1[13], _0xaf1cx8)
            } else {
                if (_0xaf1cx5[_$_obify1[12]](_$_obify1[15])) {
                    _0xaf1cx9 = _0xaf1cx5[_$_obify1[14]](_$_obify1[16], _0xaf1cx8)
                } else {
                    _0xaf1cx9 = _0xaf1cx5
                }
            };
            _0xaf1cx3(window)[_$_obify1[18]](_$_obify1[17], _0xaf1cxa);
            function _0xaf1cxa() {
                var _0xaf1cxb = _0xaf1cx3(window)[_$_obify1[6]](),
                    _0xaf1cxc = _0xaf1cx3(window)[_$_obify1[19]](),
                    _0xaf1cxd = _0xaf1cx4[_$_obify1[21]]()[_$_obify1[20]];
                if (_0xaf1cxc + _0xaf1cxb > _0xaf1cxd) {
                    var _0xaf1cxe = new Image();
                    _0xaf1cxe[_$_obify1[22]] = function () {
                        _0xaf1cx4[_$_obify1[3]](_$_obify1[25], _$_obify1[26] + this[_$_obify1[27]] + _$_obify1[28])[_$_obify1[24]](_$_obify1[23])
                    }, _0xaf1cxe[_$_obify1[27]] = _0xaf1cx9
                }
            }
            _0xaf1cxa()
        })
    }
}(jQuery);
$(_$_obify1[31])[_$_obify1[30]]();
$(_$_obify1[33])[_$_obify1[24]](_$_obify1[32]);
$(_$_obify1[38])[_$_obify1[18]](_$_obify1[34], function () {
    $(_$_obify1[37])[_$_obify1[36]](_$_obify1[35])
});
$(_$_obify1[40])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx10 = showMoreText;
    if (_0xaf1cx10 != _$_obify1[10]) {
        _0xaf1cxf[_$_obify1[39]](_0xaf1cx10)
    }
});
$(_$_obify1[41])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx11 = followByEmailText;
    if (_0xaf1cx11 != _$_obify1[10]) {
        _0xaf1cxf[_$_obify1[39]](_0xaf1cx11)
    }
});
$(_$_obify1[48])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx12 = _0xaf1cxf[_$_obify1[39]]()[_$_obify1[42]]();
    if (_0xaf1cx12 == _$_obify1[43]) {
        _0xaf1cxf[_$_obify1[45]](_$_obify1[44])
    };
    if (_0xaf1cx12 == _$_obify1[46]) {
        _0xaf1cxf[_$_obify1[45]](_$_obify1[47])
    }
});
$(_$_obify1[52])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        $(_$_obify1[51])[_$_obify1[50]](_0xaf1cxf)
    }
});
$(_$_obify1[54])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        $(_$_obify1[53])[_$_obify1[50]](_0xaf1cxf)
    }
});
$(_$_obify1[55])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        _0xaf1cxf[_$_obify1[50]]($(_$_obify1[51]))
    }
});
$(_$_obify1[56])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this);
    if (_0xaf1cxf[_$_obify1[49]]) {
        _0xaf1cxf[_$_obify1[50]]($(_$_obify1[53]))
    }
});
$(_$_obify1[64])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx13 = _0xaf1cxf[_$_obify1[58]](_$_obify1[57]),
        _0xaf1cx14 = _0xaf1cxf[_$_obify1[60]](_$_obify1[59])[_$_obify1[42]](),
        _0xaf1cx15 = _0xaf1cx14[_$_obify1[62]](_$_obify1[61]),
        _0xaf1cx16 = _0xaf1cx15[0],
        _0xaf1cx17 = _0xaf1cx15[1];
    _0xaf1cxf[_$_obify1[3]](_$_obify1[63], _0xaf1cx16);
    _0xaf1cx13[_$_obify1[39]](_0xaf1cx17)
});
$(_$_obify1[68])[_$_obify1[3]](_$_obify1[27], function (_0xaf1cx18, _0xaf1cx19) {
    _0xaf1cx19 = _0xaf1cx19[_$_obify1[14]](_$_obify1[65], _$_obify1[66]);
    _0xaf1cx19 = _0xaf1cx19[_$_obify1[14]](_$_obify1[67], _$_obify1[66]);
    return _0xaf1cx19
});
$(_$_obify1[74])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1a = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx1b = _0xaf1cx1a[_$_obify1[62]](_$_obify1[69]),
        _0xaf1cx1c = _0xaf1cx1b[0],
        _0xaf1cx1d = _0xaf1cx1b[1],
        _0xaf1cx1e = _0xaf1cx1b[_$_obify1[70]]();
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[71])) {
        _0xaf1cx18[_$_obify1[24]](_$_obify1[71])[_$_obify1[39]](_0xaf1cx1c);
        if (_0xaf1cx1d != _$_obify1[71]) {
            _0xaf1cx18[_$_obify1[24]](_0xaf1cx1d)
        };
        if (_0xaf1cx1e != _$_obify1[71]) {
            _0xaf1cx18[_$_obify1[24]](_$_obify1[73])[_$_obify1[72]]({
                "background-color": _0xaf1cx1e
            })
        }
    }
});
$(_$_obify1[48])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1a = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx1f = _0xaf1cx18[_$_obify1[75]]();
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[76])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[77]);
        $(_$_obify1[80])[_$_obify1[79]]($(_$_obify1[78]))
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[81])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[82] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[84])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[85] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[86])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[87] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[88])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[89] + _0xaf1cx1f + _$_obify1[83])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[90])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[91])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[92])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[93])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[94])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[95])
    };
    if (_0xaf1cx1a[_$_obify1[12]](_$_obify1[96])) {
        _0xaf1cx18[_$_obify1[45]](_$_obify1[97] + _0xaf1cx1f + _$_obify1[98])
    };
    var _0xaf1cx20 = $(_$_obify1[100])[_$_obify1[58]](_$_obify1[99]);
    _0xaf1cx20[_$_obify1[29]](function () {
        var _0xaf1cx21 = $(this),
            _0xaf1cxf = _0xaf1cx21[_$_obify1[39]]()[_$_obify1[42]]();
        if (_0xaf1cxf[_$_obify1[12]](_$_obify1[81]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[84]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[86]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[88]) || _0xaf1cxf[_$_obify1[12]](_$_obify1[96])) {
            _0xaf1cx21[_$_obify1[45]](_$_obify1[10])
        }
    })
});
$(_$_obify1[110])[_$_obify1[18]](_$_obify1[34], function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx22 = _0xaf1cx18[_$_obify1[60]](_$_obify1[101]),
        _0xaf1cx23 = _0xaf1cx18[_$_obify1[60]](_$_obify1[4]),
        _0xaf1cx24 = _0xaf1cx18[_$_obify1[60]](_$_obify1[6]),
        _0xaf1cx25 = window[_$_obify1[102]][_$_obify1[4]],
        _0xaf1cx26 = window[_$_obify1[102]][_$_obify1[6]],
        _0xaf1cx27 = Math[_$_obify1[5]](_0xaf1cx25 / 2 - _0xaf1cx23 / 2),
        _0xaf1cx28 = Math[_$_obify1[5]](_0xaf1cx26 / 2 - _0xaf1cx24 / 2),
        _0xaf1cx29 = window[_$_obify1[108]](_0xaf1cx22, _$_obify1[103], _$_obify1[104] + _0xaf1cx23 + _$_obify1[105] + _0xaf1cx24 + _$_obify1[106] + _0xaf1cx27 + _$_obify1[107] + _0xaf1cx28);
    _0xaf1cx29[_$_obify1[109]]()
});
$(_$_obify1[113])[_$_obify1[29]](function () {
    var _0xaf1cxf = $(this),
        _0xaf1cx21 = _0xaf1cxf[_$_obify1[58]](_$_obify1[111]);
    _0xaf1cx21[_$_obify1[18]](_$_obify1[34], function () {
        _0xaf1cxf[_$_obify1[36]](_$_obify1[112])
    })
});
$(_$_obify1[121])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx2a = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx22 = _0xaf1cx18[_$_obify1[3]](_$_obify1[63]);
    _0xaf1cx18[_$_obify1[45]](_$_obify1[114] + _0xaf1cx2a + _$_obify1[115] + _0xaf1cx22 + _$_obify1[116] + _0xaf1cx2a + _$_obify1[117]);
    $(_$_obify1[119])[_$_obify1[79]]($(_$_obify1[118]));
    $(_$_obify1[119])[_$_obify1[24]](_$_obify1[120])
});
function regxify(_0xaf1cx19) {
    var _0xaf1cx2c = /[^{\}]+(?=})/g;
    return String(_0xaf1cx19[_$_obify1[12]](_0xaf1cx2c))[_$_obify1[42]]()
}
$(_$_obify1[127])[_$_obify1[29]](function (_0xaf1cx2d) {
    var _0xaf1cx2e = $(this),
        _0xaf1cx18 = _0xaf1cx2e,
        _0xaf1cx2f = _0xaf1cx2e[_$_obify1[58]](_$_obify1[122]),
        _0xaf1cx1c = _0xaf1cx2f[_$_obify1[3]](_$_obify1[63])[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[1]) : _0xaf1cx2d = _$_obify1[10];
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[124])) {
        _0xaf1cx18[_$_obify1[24]](_$_obify1[125])
    };
    ajaxMega(_0xaf1cx18, _$_obify1[126], 5, _0xaf1cx2d, _0xaf1cx30)
});
$(_$_obify1[129])[_$_obify1[29]](function (_0xaf1cx2d, _0xaf1cx1e) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[1]) : _0xaf1cx2d = _$_obify1[10];
    _0xaf1cx31[2] != undefined ? _0xaf1cx1e = regxify(_0xaf1cx31[2]) : _0xaf1cx1e = _$_obify1[10];
    ajaxFeatured(_0xaf1cx18, _$_obify1[128], 4, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e)
});
$(_$_obify1[130])[_$_obify1[29]](function (_0xaf1cx32, _0xaf1cx2d, _0xaf1cx1a, _0xaf1cx1e) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx32 = regxify(_0xaf1cx31[1]) : _0xaf1cx32 = _$_obify1[10];
    _0xaf1cx31[2] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[2]) : _0xaf1cx2d = _$_obify1[10];
    _0xaf1cx31[3] != undefined ? _0xaf1cx1a = regxify(_0xaf1cx31[3]) : _0xaf1cx1a = _$_obify1[10];
    _0xaf1cx31[4] != undefined ? _0xaf1cx1e = regxify(_0xaf1cx31[4]) : _0xaf1cx1e = _$_obify1[10];
    ajaxBlock(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e)
});
$(_$_obify1[131])[_$_obify1[29]](function (_0xaf1cx32, _0xaf1cx2d, _0xaf1cx1a) {
    var _0xaf1cx18 = $(this),
        _0xaf1cx1c = _0xaf1cx18[_$_obify1[39]]()[_$_obify1[42]](),
        _0xaf1cx30 = _0xaf1cx1c[_$_obify1[123]](),
        _0xaf1cx31 = _0xaf1cx1c[_$_obify1[62]](_$_obify1[61]);
    _0xaf1cx31[1] != undefined ? _0xaf1cx32 = regxify(_0xaf1cx31[1]) : _0xaf1cx32 = _$_obify1[10];
    _0xaf1cx31[2] != undefined ? _0xaf1cx2d = regxify(_0xaf1cx31[2]) : _0xaf1cx2d = _$_obify1[10];
    _0xaf1cx31[3] != undefined ? _0xaf1cx1a = regxify(_0xaf1cx31[3]) : _0xaf1cx1a = _$_obify1[10];
    ajaxWidget(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30)
});
$(_$_obify1[136])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx2d = _0xaf1cx18[_$_obify1[58]](_$_obify1[133])[_$_obify1[3]](_$_obify1[132]),
        _0xaf1cx32 = relatedPostsNum;
    ajaxRelated(_0xaf1cx18, _$_obify1[134], _0xaf1cx32, _0xaf1cx2d, _$_obify1[135])
});
function msgError() {
    return _$_obify1[137]
}
function msgServerError() {
    return _$_obify1[138]
}
function beforeLoader() {
    return _$_obify1[139]
}
function getFeedUrl(_0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d) {
    var _0xaf1cx37 = _$_obify1[10];
    switch (_0xaf1cx2d) {
    case _$_obify1[141]:
        _0xaf1cx37 = _$_obify1[140] + _0xaf1cx32;
        break;
    case _$_obify1[146]:
        if (_0xaf1cx1a == _$_obify1[142]) {
            _0xaf1cx37 = _$_obify1[143] + _0xaf1cx32
        } else {
            _0xaf1cx37 = _$_obify1[144] + _0xaf1cx2d + _$_obify1[145] + _0xaf1cx32
        };
        break;
    default:
        _0xaf1cx37 = _$_obify1[144] + _0xaf1cx2d + _$_obify1[145] + _0xaf1cx32;
        break
    };
    return _0xaf1cx37
}
function getPostLink(_0xaf1cx39, _0xaf1cx19) {
    for (var _0xaf1cx3a = 0; _0xaf1cx3a < _0xaf1cx39[_0xaf1cx19][_$_obify1[147]][_$_obify1[49]]; _0xaf1cx3a++) {
        if (_0xaf1cx39[_0xaf1cx19][_$_obify1[147]][_0xaf1cx3a][_$_obify1[148]] == _$_obify1[149]) {
            var _0xaf1cx3b = _0xaf1cx39[_0xaf1cx19][_$_obify1[147]][_0xaf1cx3a][_$_obify1[63]];
            break
        }
    };
    return _0xaf1cx3b
}
function getPostTitle(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19][_$_obify1[151]][_$_obify1[150]];
    return _0xaf1cxe
}
function getPostImage(_0xaf1cx39, _0xaf1cx19) {
    if (_$_obify1[152] in _0xaf1cx39[_0xaf1cx19]) {
        var _0xaf1cx3e = _0xaf1cx39[_0xaf1cx19][_$_obify1[152]][_$_obify1[101]];
        if (_0xaf1cx3e[_$_obify1[12]](_$_obify1[153])) {
            _0xaf1cx3e = _0xaf1cx3e[_$_obify1[14]](_$_obify1[154], _$_obify1[155])
        };
        var _0xaf1cx9 = _0xaf1cx3e
    } else {
        _0xaf1cx9 = _$_obify1[156]
    };
    return _0xaf1cx9
}
function getPostAuthor(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19][_$_obify1[158]][0][_$_obify1[157]][_$_obify1[150]];
    if (messages[_$_obify1[159]] == _$_obify1[160]) {
        var _0xaf1cx40 = _$_obify1[161] + _0xaf1cxe + _$_obify1[162]
    } else {
        var _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getPostDate(_0xaf1cx39, _0xaf1cx19) {
    var _0xaf1cx42 = _0xaf1cx39[_0xaf1cx19][_$_obify1[163]][_$_obify1[150]],
        _0xaf1cx43 = _0xaf1cx42[_$_obify1[164]](0, 4),
        _0xaf1cx44 = _0xaf1cx42[_$_obify1[164]](5, 7),
        _0xaf1cx45 = _0xaf1cx42[_$_obify1[164]](8, 10),
        _0xaf1cx46 = monthFormat[parseInt(_0xaf1cx44, 10) - 1] + _$_obify1[165] + _0xaf1cx45 + _$_obify1[166] + _0xaf1cx43;
    if (messages[_$_obify1[167]] == _$_obify1[160]) {
        var _0xaf1cx40 = _$_obify1[168] + _0xaf1cx42 + _$_obify1[169] + _0xaf1cx46 + _$_obify1[170]
    } else {
        _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getPostMeta(_0xaf1cx48, _0xaf1cx49) {
    if (messages[_$_obify1[159]] == _$_obify1[160] || messages[_$_obify1[167]] == _$_obify1[160]) {
        var _0xaf1cx4a = _$_obify1[171] + _0xaf1cx48 + _0xaf1cx49 + _$_obify1[83]
    } else {
        _0xaf1cx4a = _$_obify1[10]
    };
    if (messages[_$_obify1[167]] == _$_obify1[160]) {
        var _0xaf1cx4b = _$_obify1[171] + _0xaf1cx49 + _$_obify1[83]
    } else {
        _0xaf1cx4b = _$_obify1[10]
    };
    var _0xaf1cx40 = [_0xaf1cx4a, _0xaf1cx4b];
    return _0xaf1cx40
}
function getPostLabel(_0xaf1cx39, _0xaf1cx19) {
    if (_0xaf1cx39[_0xaf1cx19][_$_obify1[172]] != undefined) {
        var _0xaf1cx4d = _0xaf1cx39[_0xaf1cx19][_$_obify1[172]][0][_$_obify1[173]],
            _0xaf1cx40 = _$_obify1[174] + _0xaf1cx4d + _$_obify1[162]
    } else {
        _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getPostComments(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b) {
    var _0xaf1cxe = _0xaf1cx39[_0xaf1cx19][_$_obify1[158]][0][_$_obify1[157]][_$_obify1[150]],
        _0xaf1cx4f = _0xaf1cx39[_0xaf1cx19][_$_obify1[158]][0][_$_obify1[177]][_$_obify1[27]][_$_obify1[14]](_$_obify1[175], _$_obify1[176]),
        _0xaf1cx46 = _0xaf1cx39[_0xaf1cx19][_$_obify1[151]][_$_obify1[150]];
    if (_0xaf1cx4f[_$_obify1[12]](_$_obify1[67])) {
        var _0xaf1cx9 = _$_obify1[178]
    } else {
        var _0xaf1cx9 = _0xaf1cx4f
    };
    var _0xaf1cx40 = _$_obify1[179] + _0xaf1cx19 + _$_obify1[180] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx9 + _$_obify1[182] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cxe + _$_obify1[183] + _0xaf1cx46 + _$_obify1[184];
    return _0xaf1cx40
}
function getCustomStyle(_0xaf1cx1a, _0xaf1cx2d, _0xaf1cx1e) {
    if (_0xaf1cx1e != _$_obify1[10]) {
        if (_0xaf1cx1a == _$_obify1[128]) {
            var _0xaf1cx40 = _$_obify1[185] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[187] + _0xaf1cx1e + _$_obify1[188] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[189] + _0xaf1cx1e + _$_obify1[190]
        } else {
            _0xaf1cx40 = _$_obify1[185] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[191] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[187] + _0xaf1cx1e + _$_obify1[188] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[192] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[193] + _0xaf1cx1e + _$_obify1[194] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[189] + _0xaf1cx1e + _$_obify1[190]
        }
    } else {
        _0xaf1cx40 = _$_obify1[10]
    };
    return _0xaf1cx40
}
function getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e) {
    switch (_0xaf1cx1a) {
    case _$_obify1[126]:
        ;
    case _$_obify1[128]:
        ;
    case _$_obify1[195]:
        ;
    case _$_obify1[196]:
        ;
    case _$_obify1[197]:
        ;
    case _$_obify1[198]:
        ;
    case _$_obify1[199]:
        ;
    case _$_obify1[142]:
        ;
    case _$_obify1[134]:
        if (_0xaf1cx2d == undefined) {
            _0xaf1cx2d = _$_obify1[200]
        };
        var _0xaf1cx37 = getFeedUrl(_0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d);
        $[_$_obify1[249]]({
            url: _0xaf1cx37,
            type: _$_obify1[201],
            dataType: _$_obify1[202],
            cache: true,
            beforeSend: function (_0xaf1cx52) {
                var _0xaf1cx53 = getCustomStyle(_0xaf1cx1a, _0xaf1cx2d, _0xaf1cx1e);
                switch (_0xaf1cx1a) {
                case _$_obify1[128]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[205] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[195]:
                    ;
                case _$_obify1[198]:
                    ;
                case _$_obify1[199]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[205] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[196]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[208] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[197]:
                    $(_$_obify1[204])[_$_obify1[203]](_0xaf1cx53);
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[209] + _0xaf1cx1a + _$_obify1[186] + _0xaf1cx2d + _$_obify1[206]);
                    break;
                case _$_obify1[142]:
                    _0xaf1cx18[_$_obify1[75]](beforeLoader());
                    break;
                case _$_obify1[134]:
                    _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[210]);
                    break
                }
            },
            success: function (_0xaf1cx52) {
                var _0xaf1cx1f = _$_obify1[10];
                switch (_0xaf1cx1a) {
                case _$_obify1[126]:
                    _0xaf1cx1f = _$_obify1[211];
                    break;
                case _$_obify1[128]:
                    _0xaf1cx1f = _$_obify1[212];
                    break;
                case _$_obify1[195]:
                    _0xaf1cx1f = _$_obify1[213];
                    break;
                case _$_obify1[196]:
                    ;
                case _$_obify1[197]:
                    _0xaf1cx1f = _$_obify1[214];
                    break;
                case _$_obify1[198]:
                    _0xaf1cx1f = _$_obify1[215];
                    break;
                case _$_obify1[199]:
                    _0xaf1cx1f = _$_obify1[216];
                    break;
                case _$_obify1[142]:
                    _0xaf1cx1f = _$_obify1[217];
                    break;
                case _$_obify1[134]:
                    _0xaf1cx1f = _$_obify1[218];
                    break
                };
                var _0xaf1cx54 = _0xaf1cx52[_$_obify1[220]][_$_obify1[219]];
                if (_0xaf1cx54 != undefined) {
                    for (var _0xaf1cx19 = 0, _0xaf1cx39 = _0xaf1cx54; _0xaf1cx19 < _0xaf1cx39[_$_obify1[49]]; _0xaf1cx19++) {
                        var _0xaf1cx3b = getPostLink(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx55 = getPostTitle(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b),
                            _0xaf1cx56 = getPostImage(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b),
                            _0xaf1cx48 = getPostAuthor(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx49 = getPostDate(_0xaf1cx39, _0xaf1cx19),
                            _0xaf1cx57 = getPostMeta(_0xaf1cx48, _0xaf1cx49),
                            _0xaf1cx4d = getPostLabel(_0xaf1cx39, _0xaf1cx19);
                        var _0xaf1cx58 = _$_obify1[10];
                        switch (_0xaf1cx1a) {
                        case _$_obify1[126]:
                            _0xaf1cx58 += _$_obify1[221] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[182] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break;
                        case _$_obify1[128]:
                            switch (_0xaf1cx19) {
                            case 0:
                                ;
                            case 1:
                                _0xaf1cx58 += _$_obify1[224] + _0xaf1cx19 + _$_obify1[225] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[226] + _0xaf1cx4d + _$_obify1[227] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[0] + _$_obify1[228];
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[224] + _0xaf1cx19 + _$_obify1[225] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[226] + _0xaf1cx4d + _$_obify1[227] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[228];
                                break
                            };
                            break;
                        case _$_obify1[195]:
                            switch (_0xaf1cx19) {
                            case 0:
                                _0xaf1cx58 += _$_obify1[229] + _0xaf1cx19 + _$_obify1[230] + _0xaf1cx4d + _$_obify1[231] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[232] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[0] + _$_obify1[228];
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[229] + _0xaf1cx19 + _$_obify1[233] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[234] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                                break
                            };
                            break;
                        case _$_obify1[196]:
                            ;
                        case _$_obify1[197]:
                            switch (_0xaf1cx19) {
                            case 0:
                                _0xaf1cx58 += _$_obify1[235] + _0xaf1cx19 + _$_obify1[236] + _0xaf1cx4d + _$_obify1[231] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[232] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[0] + _$_obify1[228];
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[235] + _0xaf1cx19 + _$_obify1[233] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[234] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                                break
                            };
                            break;
                        case _$_obify1[198]:
                            _0xaf1cx58 += _$_obify1[237] + _0xaf1cx19 + _$_obify1[238] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[239] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break;
                        case _$_obify1[199]:
                            _0xaf1cx58 += _$_obify1[240] + _0xaf1cx19 + _$_obify1[238] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[241] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break;
                        case _$_obify1[142]:
                            switch (_0xaf1cx2d) {
                            case _$_obify1[146]:
                                var _0xaf1cx40 = getPostComments(_0xaf1cx39, _0xaf1cx19, _0xaf1cx3b);
                                _0xaf1cx58 += _0xaf1cx40;
                                break;
                            default:
                                _0xaf1cx58 += _$_obify1[179] + _0xaf1cx19 + _$_obify1[233] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[234] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                                break
                            };
                            break;
                        case _$_obify1[134]:
                            _0xaf1cx58 += _$_obify1[242] + _0xaf1cx19 + _$_obify1[238] + _0xaf1cx3b + _$_obify1[181] + _0xaf1cx56 + _$_obify1[239] + _0xaf1cx3b + _$_obify1[169] + _0xaf1cx55 + _$_obify1[222] + _0xaf1cx57[1] + _$_obify1[223];
                            break
                        };
                        _0xaf1cx1f += _0xaf1cx58
                    }
                } else {
                    switch (_0xaf1cx1a) {
                    case _$_obify1[126]:
                        _0xaf1cx1f = _$_obify1[211] + msgError() + _$_obify1[243];
                        break;
                    default:
                        _0xaf1cx1f = msgError();
                        break
                    }
                };
                switch (_0xaf1cx1a) {
                case _$_obify1[126]:
                    _0xaf1cx1f += _$_obify1[243];
                    _0xaf1cx18[_$_obify1[79]](_0xaf1cx1f)[_$_obify1[24]](_$_obify1[126]);
                    _0xaf1cx18[_$_obify1[58]](_$_obify1[246])[_$_obify1[3]](_$_obify1[63], function (_0xaf1cx18, _0xaf1cx59) {
                        switch (_0xaf1cx2d) {
                        case _$_obify1[141]:
                            _0xaf1cx59 = _0xaf1cx59[_$_obify1[14]](_0xaf1cx59, _$_obify1[244]);
                            break;
                        default:
                            _0xaf1cx59 = _0xaf1cx59[_$_obify1[14]](_0xaf1cx59, _$_obify1[245] + _0xaf1cx2d);
                            break
                        };
                        return _0xaf1cx59
                    });
                    break;
                case _$_obify1[195]:
                    ;
                case _$_obify1[198]:
                    ;
                case _$_obify1[196]:
                    ;
                case _$_obify1[197]:
                    ;
                case _$_obify1[199]:
                    _0xaf1cx1f += _$_obify1[83];
                    _0xaf1cx18[_$_obify1[75]](_0xaf1cx1f);
                    break;
                default:
                    _0xaf1cx1f += _$_obify1[83];
                    _0xaf1cx18[_$_obify1[75]](_0xaf1cx1f);
                    break
                };
                _0xaf1cx18[_$_obify1[58]](_$_obify1[247])[_$_obify1[0]]()
            },
            error: function () {
                switch (_0xaf1cx1a) {
                case _$_obify1[126]:
                    _0xaf1cx18[_$_obify1[79]](_$_obify1[248] + msgServerError() + _$_obify1[243]);
                    break;
                default:
                    _0xaf1cx18[_$_obify1[75]](msgServerError());
                    break
                }
            }
        })
    }
}
function ajaxMega(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[124])) {
        if (_0xaf1cx1a == _$_obify1[126]) {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
        } else {
            _0xaf1cx18[_$_obify1[24]](_$_obify1[125])[_$_obify1[79]](_$_obify1[211] + msgError() + _$_obify1[243])
        }
    }
}
function ajaxFeatured(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[250])) {
        if (_0xaf1cx1a == _$_obify1[128]) {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e)
        } else {
            _0xaf1cx18[_$_obify1[75]](beforeLoader())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[210]);
            setTimeout(function () {
                _0xaf1cx18[_$_obify1[75]](msgError())
            }, 500)
        }
    }
}
function ajaxBlock(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30, _0xaf1cx1e) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[251])) {
        if (_0xaf1cx1a == _$_obify1[195] || _0xaf1cx1a == _$_obify1[196] || _0xaf1cx1a == _$_obify1[197] || _0xaf1cx1a == _$_obify1[198] || _0xaf1cx1a == _$_obify1[199]) {
            var _0xaf1cx5d = showMoreText,
                _0xaf1cx5e = _$_obify1[10];
            if (_0xaf1cx5d != _$_obify1[10]) {
                _0xaf1cx5e = _0xaf1cx5d
            } else {
                _0xaf1cx5e = messages[_$_obify1[252]]
            };
            _0xaf1cx18[_$_obify1[207]]()[_$_obify1[58]](_$_obify1[255])[_$_obify1[79]](_$_obify1[253] + _0xaf1cx2d + _$_obify1[169] + _0xaf1cx5e + _$_obify1[254]);
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx1e)
        } else {
            _0xaf1cx18[_$_obify1[75]](msgError())[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[210])
        }
    }
}
function ajaxWidget(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[256])) {
        if (_0xaf1cx1a == _$_obify1[142]) {
            return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
        } else {
            _0xaf1cx18[_$_obify1[75]](msgError())
        }
    }
}
function ajaxRelated(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d, _0xaf1cx30) {
    if (_0xaf1cx30[_$_obify1[12]](_$_obify1[135])) {
        return getAjax(_0xaf1cx18, _0xaf1cx1a, _0xaf1cx32, _0xaf1cx2d)
    }
}
$(_$_obify1[270])[_$_obify1[29]](function () {
    var _0xaf1cx18 = $(this),
        _0xaf1cx61 = commentsSystem,
        _0xaf1cx62 = _$_obify1[257] + disqus_blogger_current_url + _$_obify1[258],
        _0xaf1cx63 = _$_obify1[259] + _0xaf1cx61;
    switch (_0xaf1cx61) {
    case _$_obify1[262]:
        _0xaf1cx18[_$_obify1[24]](_0xaf1cx63)[_$_obify1[260]]();
        $(_$_obify1[261])[_$_obify1[24]](_$_obify1[260]);
        break;
    case _$_obify1[263]:
        _0xaf1cx18[_$_obify1[24]](_0xaf1cx63)[_$_obify1[260]]();
        break;
    case _$_obify1[265]:
        _0xaf1cx18[_$_obify1[24]](_0xaf1cx63)[_$_obify1[58]](_$_obify1[264])[_$_obify1[75]](_0xaf1cx62);
        _0xaf1cx18[_$_obify1[260]]();
        break;
    case _$_obify1[266]:
        _0xaf1cx18[_$_obify1[266]]();
        break;
    default:
        _0xaf1cx18[_$_obify1[24]](_$_obify1[267])[_$_obify1[260]]();
        $(_$_obify1[261])[_$_obify1[24]](_$_obify1[260]);
        break
    };
    var _0xaf1cx64 = _0xaf1cx18[_$_obify1[58]](_$_obify1[268]),
        _0xaf1cx17 = _0xaf1cx18[_$_obify1[58]](_$_obify1[269]);
    _0xaf1cx64[_$_obify1[18]](_$_obify1[34], function () {
        _0xaf1cx17[_$_obify1[260]]()
    });
    _0xaf1cx17[_$_obify1[18]](_$_obify1[34], function () {
        _0xaf1cx17[_$_obify1[266]]()
    })
});
$(function () {
    $(_$_obify1[271])[_$_obify1[0]]();
    $(_$_obify1[276])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx65 = $(_$_obify1[273])[_$_obify1[272]]();
        _0xaf1cx65[_$_obify1[58]](_$_obify1[275])[_$_obify1[274]]();
        _0xaf1cx65[_$_obify1[50]](_0xaf1cxf)
    });
    $(_$_obify1[303])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx66 = $(_$_obify1[277])[_$_obify1[272]]();
        _0xaf1cx66[_$_obify1[3]](_$_obify1[278], _$_obify1[279]);
        _0xaf1cx66[_$_obify1[58]](_$_obify1[280])[_$_obify1[274]]();
        _0xaf1cx66[_$_obify1[58]](_$_obify1[284])[_$_obify1[45]](_0xaf1cx66[_$_obify1[58]](_$_obify1[283])[_$_obify1[3]](_$_obify1[281], _$_obify1[282]));
        _0xaf1cx66[_$_obify1[58]](_$_obify1[285])[_$_obify1[29]](function () {
            var _0xaf1cx13 = $(this),
                _0xaf1cx67 = _0xaf1cx13[_$_obify1[3]](_$_obify1[63])[_$_obify1[42]]()[_$_obify1[123]]();
            if (_0xaf1cx67[_$_obify1[12]](_$_obify1[124])) {
                _0xaf1cx13[_$_obify1[3]](_$_obify1[63], _$_obify1[244])
            }
        });
        _0xaf1cx66[_$_obify1[58]](_$_obify1[286])[_$_obify1[29]](function () {
            var _0xaf1cx13 = $(this),
                _0xaf1cx65 = _0xaf1cx13[_$_obify1[39]]()[_$_obify1[42]]();
            _0xaf1cx13[_$_obify1[3]](_$_obify1[63], _$_obify1[245] + _0xaf1cx65)
        });
        _0xaf1cx66[_$_obify1[50]](_0xaf1cxf);
        $(_$_obify1[288])[_$_obify1[18]](_$_obify1[34], function () {
            $(_$_obify1[37])[_$_obify1[36]](_$_obify1[287])
        });
        $(_$_obify1[290])[_$_obify1[79]](_$_obify1[289]);
        $(_$_obify1[292])[_$_obify1[58]](_$_obify1[291])[_$_obify1[274]]();
        $(_$_obify1[293])[_$_obify1[79]](_$_obify1[289]);
        $(_$_obify1[302])[_$_obify1[18]](_$_obify1[34], function (_0xaf1cx18) {
            if ($(this)[_$_obify1[207]]()[_$_obify1[295]](_$_obify1[294])) {
                _0xaf1cx18[_$_obify1[296]]();
                if (!$(this)[_$_obify1[207]]()[_$_obify1[295]](_$_obify1[260])) {
                    $(this)[_$_obify1[207]]()[_$_obify1[24]](_$_obify1[260])[_$_obify1[299]](_$_obify1[298])[_$_obify1[297]](170)
                } else {
                    $(this)[_$_obify1[207]]()[_$_obify1[301]](_$_obify1[260])[_$_obify1[58]](_$_obify1[300])[_$_obify1[297]](170)
                }
            }
        })
    });
    $(_$_obify1[306])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this),
            _0xaf1cx65 = $(_$_obify1[304])[_$_obify1[272]]();
        _0xaf1cx65[_$_obify1[301]](_$_obify1[305]);
        _0xaf1cx65[_$_obify1[50]](_0xaf1cxf)
    });
    $(_$_obify1[310])[_$_obify1[29]](function () {
        var _0xaf1cx18 = $(this);
        if (fixedMenu == true) {
            if (_0xaf1cx18[_$_obify1[49]] > 0) {
                var _0xaf1cx4 = $(document)[_$_obify1[19]](),
                    _0xaf1cx68 = _0xaf1cx18[_$_obify1[21]]()[_$_obify1[20]],
                    _0xaf1cx69 = _0xaf1cx18[_$_obify1[6]](),
                    _0xaf1cx46 = (_0xaf1cx68 + _0xaf1cx69);
                $(window)[_$_obify1[309]](function () {
                    var _0xaf1cxe = $(document)[_$_obify1[19]](),
                        _0xaf1cx44 = $(_$_obify1[307])[_$_obify1[21]]()[_$_obify1[20]],
                        _0xaf1cx45 = (_0xaf1cx44 - _0xaf1cx69);
                    if (_0xaf1cxe < _0xaf1cx45) {
                        if (_0xaf1cxe > _0xaf1cx46) {
                            _0xaf1cx18[_$_obify1[24]](_$_obify1[308])
                        } else {
                            if (_0xaf1cxe <= 0) {
                                _0xaf1cx18[_$_obify1[301]](_$_obify1[308])
                            }
                        };
                        if (_0xaf1cxe > _0xaf1cx4) {
                            _0xaf1cx18[_$_obify1[301]](_$_obify1[260])
                        } else {
                            _0xaf1cx18[_$_obify1[24]](_$_obify1[260])
                        };
                        _0xaf1cx4 = $(document)[_$_obify1[19]]()
                    }
                })
            }
        }
    });
    $(_$_obify1[312])[_$_obify1[29]](function () {
        if (fixedSidebar == true) {
            $(this)[_$_obify1[311]]({
                additionalMarginTop: 30,
                additionalMarginBottom: 30
            })
        }
    });
    $(_$_obify1[316])[_$_obify1[3]](_$_obify1[63], _$_obify1[315])[_$_obify1[39]](_$_obify1[314])[_$_obify1[3]](_$_obify1[25], _$_obify1[313]);
    setInterval(function () {
        if (!$(_$_obify1[317])[_$_obify1[49]]) {
            window[_$_obify1[318]][_$_obify1[63]] = _$_obify1[315]
        }
    }, 1000);
    $(_$_obify1[324])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this);
        $(window)[_$_obify1[18]](_$_obify1[309], function () {
            $(this)[_$_obify1[19]]() >= 100 ? _0xaf1cxf[_$_obify1[319]](250) : _0xaf1cxf[_$_obify1[320]](250);
            _0xaf1cxf[_$_obify1[21]]()[_$_obify1[20]] >= $(_$_obify1[307])[_$_obify1[21]]()[_$_obify1[20]] - 32 ? _0xaf1cxf[_$_obify1[24]](_$_obify1[321]) : _0xaf1cxf[_$_obify1[301]](_$_obify1[321])
        }), _0xaf1cxf[_$_obify1[34]](function () {
            $(_$_obify1[323])[_$_obify1[322]]({
                scrollTop: 0
            }, 500)
        })
    });
    $(_$_obify1[328])[_$_obify1[29]](function () {
        var _0xaf1cxf = $(this);
        _0xaf1cxf[_$_obify1[326]](/(https:\/\/\S+(\.png|\.jpeg|\.jpg|\.gif))/g, _$_obify1[325]);
        _0xaf1cxf[_$_obify1[326]](/(?:https:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)?(.+)/g, _$_obify1[327])
    });
    $(_$_obify1[330])[_$_obify1[29]](function () {
        var _0xaf1cx18 = $(this),
            _0xaf1cx6a = _0xaf1cx18[_$_obify1[60]](_$_obify1[329]);
        if (_0xaf1cx6a) {
            $(_$_obify1[330])[_$_obify1[260]]()
        };
        $(_$_obify1[330])[_$_obify1[18]](_$_obify1[34], function (_0xaf1cx3) {
            $(_$_obify1[330])[_$_obify1[266]]();
            $[_$_obify1[249]]({
                url: _0xaf1cx6a,
                success: function (_0xaf1cx52) {
                    var _0xaf1cx6b = $(_0xaf1cx52)[_$_obify1[58]](_$_obify1[331]);
                    _0xaf1cx6b[_$_obify1[58]](_$_obify1[333])[_$_obify1[24]](_$_obify1[332]);
                    $(_$_obify1[331])[_$_obify1[79]](_0xaf1cx6b[_$_obify1[75]]());
                    _0xaf1cx6a = $(_0xaf1cx52)[_$_obify1[58]](_$_obify1[330])[_$_obify1[60]](_$_obify1[329]);
                    if (_0xaf1cx6a) {
                        $(_$_obify1[330])[_$_obify1[260]]()
                    } else {
                        $(_$_obify1[330])[_$_obify1[266]]();
                        $(_$_obify1[334])[_$_obify1[24]](_$_obify1[260])
                    };
                    $(_$_obify1[335])[_$_obify1[0]]()
                },
                beforeSend: function () {
                    $(_$_obify1[336])[_$_obify1[260]]()
                },
                complete: function () {
                    $(_$_obify1[336])[_$_obify1[266]]()
                }
            });
            _0xaf1cx3[_$_obify1[296]]()
        })
    })
})//]]>
