$(function() {
    /*-----------------------------------*/
    ///////////// fix iOS bug /////////////
    /*-----------------------------------*/
    // document.documentElement.addEventListener('gesturestart', function(event) {
    //     event.preventDefault();
    // }, false);
    /*-----------------------------------*/
    ///////////////// 變數 ////////////////
    /*-----------------------------------*/
    var _window = $(window),
        ww = _window.outerWidth(),
        wh = _window.height(),
        _body = $('body'),
        wwNormal = 1400,
        wwMedium = 992,
        wwSmall = 768,
        wwxs = 576;
    /*-----------------------------------*/
    //////////// nojs 先移除////////////////
    /*-----------------------------------*/
    $('html').removeClass('no-js');
    /*-----------------------------------*/
    //////////// nav如果有兩個選單///////////
    /*-----------------------------------*/
    /*var _navLength = $('.navigation ul').length;
    if (_navLength > 1) {
        $('.navigation ul:nth-child(1)').addClass('left_nav');
    }*/
    /*-----------------------------------*/
    /////// header選單 tab及 fix設定////////
    /*-----------------------------------*/
    var _menu = $('.header .menu');
    _menu.find('li').has('ul').addClass('hasChild');
    var liHasChild = _menu.find('li.hasChild');
    var subMenuWidth = liHasChild.first().children('ul').outerWidth();
    /*-----------------------------------*/
    ////////////// 行動版選單切換////////////
    /*-----------------------------------*/
    // _body.prepend('<aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside>');
    // $('header .container').prepend('<button type="button" class="sidebarCtrl">側欄選單</button><button type="button" class="searchCtrl">查詢</button>');

    // $('header .container').prepend('<button type="button" class="sidebarCtrl">側欄選單</button><aside class="sidebar"><div class="m_area"><button type="button" class="sidebarClose">關閉</button></div><div class="menu_overlay"></div></aside><button type="button" class="searchCtrl">查詢</button>');

    // const $allyAU = $('<a class="accesskey" href="#aU" id="aU" accesskey="U" title="網站標題" tabindex="2">:::</a>');
    const $sidebarCtrl = $('<button type="button" class="sidebarCtrl">側欄選單</button>');
    const $sidebar = $(`
    <aside class="sidebar">
        <div class="m_area">
        <button type="button" class="sidebarClose">關閉</button>
        </div>
        <div class="menu_overlay"></div>
    </aside>
    `);
    const $searchCtrl = $('<button type="button" class="searchCtrl">查詢</button>');
    $('header .container').prepend($sidebarCtrl, $sidebar);
    $('.container h1').after($searchCtrl);

    var menu_status = false;
    var _sidebar = $('.sidebar'),
        _search = $('.search'),
        _nav = $('.navigation'),
        _sidebarClose = $('.sidebarClose'),
        _sidebarCtrl = $('.sidebarCtrl'),
        _overlay = $('.menu_overlay');
        _mArea = $('.m_area');
        _sidebarCtrl.append('<span></span><span></span><span></span>');
        _searchCtrl = $('.searchCtrl');
    var search_mode = false;
    // 打開選單 function
    function showSidebar() {
        _sidebar.show();
        _mArea.show();
        _mArea.animate({
            'margin-left': 0
        }, 400, 'easeOutQuint');
        _body.addClass('noscroll');
        _overlay.fadeIn();
        $('.m_search').hide();
        search_mode = false;
    }
    // 縮合選單 function
    function hideSidebar() {
        _mArea.animate({ 'margin-left': _mArea.width() * -1 + 'px' }, 500, 'easeOutQuint', function() {
            _sidebar.fadeOut(200);
            _mArea.hide();
        });
        _body.removeClass('noscroll');
        _overlay.fadeOut();
        liHasChild.children('ul').hide();
        liHasChild.children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
    }
    // 打開選單動作
    _sidebarCtrl.click(function(e) {
        showSidebar();
        e.preventDefault();
    });
    // 關閉動作
    _overlay.add(_sidebarClose).off().click(function() {
        hideSidebar();
    });
    _overlay.off("mouseenter");
    // 無障礙tab設定
    liHasChild.keyup(function() {
        $(this).children('ul').fadeIn();
        $(this).siblings().focus(function() {
            $(this).hide();
        });
    });
    _menu.find('li').keyup(function() {
        $(this).siblings().children('ul').hide();
    });
    _menu.find('li:last>a').focusout(function() {
        _menu.find('li ul').hide();
    });
    function mobileMenu() {
        // switch PC/MOBILE
        ww = _window.outerWidth();
        if (ww < wwMedium) {
            /*-----------------------------------*/
            /////////////// 手機版設定 /////////////
            /*-----------------------------------*/
            menu_status = false;
            _sidebar.hide();
            _overlay.hide();
            _nav.prependTo(_mArea);
            _menu.prependTo(_mArea);
            // _search.prependTo(_body);
            // _search.after(_searchCtrl);
            _search.addClass('m_search');
            _mArea.css({
                'margin-left': _mArea.width() * -1 + 'px'
            });
            liHasChild.on({
                mouseenter: function() {
                    $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
                },
                mouseleave: function() {
                    $(this).parent().siblings('ul').hide();
                    $(this).children('ul').stop(true, true).slideUp('600', 'easeOutQuint');
                }
            });
            // 副選單點出
            liHasChild.off().on('mouseenter,mouseleave');
            liHasChild.on('touchstart', function() {
                $(this).off('mouseenter,mouseleave');
            });
            $('.sidebar .menu .hasChild').off().click(function(e) {
                $(this).siblings('.hasChild').find('ul').hide(); //level1
                $(this).parents('hasChild').siblings('.hasChild').find('ul').hide(); //level2
                $(this).children('ul').stop(true, true).slideDown('600', 'easeOutQuint');
            });

            //手機版第第一層點了不會進入內頁，拿掉第一層的連結無作用
            $('.sidebar .menu .hasChild>a').off().on('click', function(e) {
                e.preventDefault();
            });

            _body.off('touchmove');
            $('.m_search').hide();
        } else {
            /*-----------------------------------*/
            /////////////// PC版設定 /////////////
            /*-----------------------------------*/
            hideSidebar();
            _body.removeClass('noscroll');
            _nav.prependTo('.header .container');
            _search.appendTo('.header .container');
            _menu.appendTo('.header .container');
            _search.removeClass('m_search');
            _search.show();
            // 副選單click
            // liHasChild.on({
            //     mousedown: function() {
            //         $(this).children('ul').stop(true, false).fadeIn(600);
            //         $(this).siblings().children('ul').hide();
            //     }
            // });

            //
            liHasChild.on({
                mouseenter: function() {
                    // $(this).children('ul').stop(true, false).fadeIn();
                    $(this).children('ul').delay(600).fadeIn();
                }
                ,
                mouseleave: function() {
                    $(this).parent().siblings('ul').hide();
                    $(this).children('ul').stop(true, false).fadeOut();
                }
            });




            // ----------------------------------

            if (document.all && document.querySelector && !document.addEventListener) {
                //  
                // 拿掉wow
                liHasChild.hover(function() {
                    $(this).children('ul').show();
                }, function() {
                    $(this).children('ul').hide();
                });
                liHasChild.off('mouseenter');
            }
            // 如果點在外面
            $(document).on('touchend click', function(e) {
                var target = e.target;
                if (!$(target).is('.menu li a')) {
                    $('.menu').find('li ul').hide();
                }
            });
        }
    }
    //設定resize 計時器
    var resizeTimer;
    _window.bind("load resize", function(event) {
        if (!search_mode) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                mobileMenu();
            }, 50);
        }
    });
    mobileMenu();

    // 鍵盤遊走出 .m_area 時，關閉.sidebar
    $('.m_area').on('focusout', function (e) {
        const mArea = $(this);
        setTimeout(() => {
            const active = document.activeElement;
            if (!mArea[0].contains(active)) {
                mArea.closest('.sidebar').hide(); // 或用 .css('display', 'none')
            }
        }, 10); // 確保 focus 已轉移
    });


    // 行動版查詢
    // var _searchCtrl = $('.searchCtrl');
    _searchCtrl.off().on('click', function(e) {
        if (!search_mode) {
            $('.m_search').stop(true, false).slideDown('400', 'easeOutQuint');
            $('.m_search').find('input[type="text"]').focus();
            search_mode = true;
        } else {
            $('.m_search').hide();
            search_mode = false;
        }
    });
    // 如果點在外面
    // $('.main').off().on('click touchend', function(e) {
    //     $('.m_search').hide();
    //     search_mode = false;
    // });
    // 鍵盤遊走 .m_search
    $('.m_search').on('focusout', function () {
        const $this = $(this);
        setTimeout(() => {
            if (!$this.find(':focus').length) {
                $this.css('display', 'none');
            }
        }, 0);
    });

    // 固定版頭
    var hh = $('.header').outerHeight(true),
        menuH = _menu.outerHeight(),
        navH = $('.navbar').height();
    $(window).bind("load scroll resize", function(e) {
        ww = _window.outerWidth();
        if (ww >= wwMedium && $(this).scrollTop() > hh - menuH) {
            $('.header').addClass('fixed');
            $('.header').css('margin-top', menuH - hh);
            $('.main').css('margin-top', hh);
        } else {
            $('.header').removeClass('fixed');
            $('.header').css('margin-top', 0);
            $('.main').css('margin-top', 0);
        }
    });
    /*-----------------------------------*/
    //////////// notice訊息區塊 ////////////
    /*-----------------------------------*/
    $('[class*="notice"] a.close').click(function(e) {
        $(this).parent('[class*="notice"]').hide();
    });
    /*-----------------------------------*/
    //////////// Accordion設定 ////////////
    /*-----------------------------------*/
    $('.accordion').each(function() {
        $(this).find('.accordion-content').hide();
        var _accordionItem = $(this).children('ul').children('li').children('a');
        _accordionItem.each(function() {
            $(this).click(function(e) {
                $(this).parent('li').siblings().children('.accordion-content').slideUp();
                $(this).next('.accordion-content').slideToggle();
                e.preventDefault();
            });
        });
    });
    /*-----------------------------------*/
    /////////////fatfooter開關/////////////
    /*-----------------------------------*/
    $('.btn-fatfooter').click(function(e) {
        $(this).parent('.container').find('nav>ul>li>ul').stop(true, true).slideToggle(function() {
            if ($(this).is(':visible')) {
                $('.btn-fatfooter').html("<b>收合選單</b>");
                $('.btn-fatfooter').attr('name', '收合選單');
                $('.btn-fatfooter').removeClass('icon-down-open');
                $('.btn-fatfooter').addClass('icon-up-open');
            } else {
                $('.btn-fatfooter').html("<b>展開選單</b>");
                $('.btn-fatfooter').attr('name', '展開選單');
                $('.btn-fatfooter').removeClass('icon-up-open');
                $('.btn-fatfooter').addClass('icon-down-open');
            }
        });
        $(this).stop(true, true).toggleClass('close');
    });
    /*-----------------------------------*/
    ////////img objectfix cover////////////
    /*-----------------------------------*/
    $(window).bind('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    /*-----------------------------------*/
    //////////////相簿縮圖+燈箱//////////////
    /*-----------------------------------*/
    //縮圖，same as thumbnail模組
    $(window).bind('resize load', function(e) {
        $('.imgOuter').each(function(index, el) {
            var _imgContainer = $(this),
                cWidth = _imgContainer.width(),
                cHeight = _imgContainer.height(),
                ratioC = cWidth / cHeight,
                _img = _imgContainer.find('img');
            var iWidth = $(this).find('img').width(),
                iHeight = $(this).find('img').height(),
                ratioImg = iWidth / iHeight,
                scaleRatio;
            if (ratioC > ratioImg) {
                scaleRatio = cWidth / iWidth;
                _img.width(cWidth).height(iHeight * scaleRatio).css('top', -.5 * (iHeight * scaleRatio - cHeight));
            } else {
                scaleRatio = cHeight / iHeight;
                _img.height(cHeight).width(iWidth * scaleRatio).css('left', -.5 * (iWidth * scaleRatio - cWidth));
            }
            $(this).find('img').removeClass('img-responsive');
        });
    });
    //相簿JQ設定
    var lightbox_Status = false;
    $('.gallery').append('<div class="lightbox"><a href="#" class="light_close">關閉</a><a href="#" class="light_prev">上一張</a><a href="#" class="light_next">下一張</a><img src="" alt=""><div class="galler_overlay"></div></div>')
    $('.gallery .lightbox').hide(); // lightbox先隱藏
    $('.light_close').click(function(event) {
        $('.gallery .lightbox').hide(); // 如果點到close，lightbox隱藏
        _body.removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
        lightbox_Status = false;
    });
    $('.gallery .lightbox .galler_overlay').click(function(event) {
        $('.gallery .lightbox').hide(); // 如果點到overlay，lightbox隱藏
        _body.removeClass('noscroll');
        $('.gallery .lightbox .caption').html('');
        lightbox_Status = false;
    });
    var PIC_SRC = $('.gallery .lightbox img').attr('src');
    // var THUMB_PIC = $(this).attr('src');
    var PIC_INDEX = 0;
    $('.gallery a').click(function(e) {
        e.preventDefault();
        lightbox_Status = true;
    });
    $('.gallery .thumbnail img').each(function(index) {
        $(this).click(function(e) {
            var THUMB_H3 = $(this).attr('alt');
            _body.addClass('noscroll');
            $('.gallery .lightbox').append('<div class="caption">' + THUMB_H3 + '<div>');
            THUMB_PIC = $(this).attr('src');
            $('.gallery .lightbox img').attr('src', THUMB_PIC);
            $('.gallery .lightbox').fadeIn();
            $('.gallery .lightbox .galler_overlay').fadeIn();
            PIC_INDEX = index;
            e.preventDefault();
        });
    });
    //計算當頁縮圖數量
    var PIC_NUM = $('.gallery .thumbnail').length;
    // 下一張 function
    function NEXT_MOV() {
        //pic_index+1 如果小於 圖片數量
        if ((PIC_INDEX + 1) < PIC_NUM) {
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX++; //pic_index ++
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = 0 //如果等於或大於圖片數量 pic_index =0 ，跳到第一張
        }
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
    }
    $('.gallery .light_next').click(function(e) {
        NEXT_MOV();
        e.preventDefault();
    });
    // 上一張 function
    function PREV_MOV() {
        if ((PIC_INDEX + 1) > 1) { //pic_index+1  如果大於 1
            //PIC_INDEX = (PIC_INDEX + 1) % PIC_NUM;//取餘數
            PIC_INDEX--; //pic_index --
            //if(PIC_INDEX >= PIC_NUM){PIC_INDEX=0;}
        } else {
            PIC_INDEX = PIC_NUM - 1; //如果等於或小於圖片數量 pic_index =圖片數量-1 ，跳到最後一張
        }
        //取縮圖 img src
        THUMB_PIC = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('src');
        THUMB_H3 = $('.gallery .thumbnail img').eq(PIC_INDEX).attr('alt');
        $('.gallery .lightbox .caption').html(THUMB_H3);
        $('.gallery .lightbox img').hide();
        $('.gallery .lightbox img').fadeIn();
        $('.gallery .lightbox img').attr('src', THUMB_PIC);
        //放入燈箱 img src
    }
    $('.gallery .light_prev').click(function(e) {
        PREV_MOV();
        e.preventDefault();
    });
    //左右按鍵移動
    if (lightbox_Status = true) {
        _body.keydown(function(e) {
            if (e.keyCode == 37) {
                PREV_MOV();
            } else if (e.keyCode == 39) {
                NEXT_MOV();
            } else if (e.keyCode == 27) {
                $('.gallery .lightbox').hide();
            }
        });
    }
    /*-----------------------------------*/
    ////////////////多組Tab////////////////
    /*-----------------------------------*/
    var resizeTimer1;
    _window.resize(function() {
        clearTimeout(resizeTimer1);
        resizeTimer1 = setTimeout(function() {
            ww = _window.outerWidth();
            tabSet();
        }, 200);
    });
    tabSet();

    function tabSet() { //頁籤
        function slickContent(obj) {
            if(obj && $(obj) && !$(obj).hasClass('slick-initialized')) {
                $(obj).slick({
                    dots: true,
                    arrow: true,
                    // infinite: true,
                    // speed: 500,
                    // autoplay: false,
                    // fade: true,
                    // cssEase: 'ease'
                    centerMode: true,
                    centerPadding: '0px',
                    slidesToShow: 1,
                    responsive: [{
                        breakpoint: 768,
                        settings: {
                            // arrows: false,
                            centerMode: true,
                            centerPadding: '0px',
                            slidesToShow: 1
                        }
                    }, {
                        breakpoint: 480,
                        settings: {
                            // arrows: false,
                            centerMode: true,
                            centerPadding: '0px',
                            slidesToShow: 1
                        }
                    }]
                });
            } else {
                $(obj).slick('unslick');
                slickContent($(obj));
            }
        }
        $('.tabs').each(function() {
            var _tab = $(this),
                _tabItem = _tab.find('.tabItem'),
                _tabItemA = _tabItem.children('a'),
                _tabContent = _tab.find('.tabContent'),
                tabwidth = _tab.width(),
                tabItemHeight = _tabItem.outerHeight() + 8,
                tiGap = 5,
                tabItemLength = _tabItem.length,
                tabItemWidth;
            slickContent(_tab.find('.active').next('.tabContent').find('.singleSlider_TaxReduce'));
            var tabContentHeight = _tab.find('.active').next().innerHeight();
            _tab.find('.active').next('.tabContent').show();
            if (ww >= wwSmall) {
                _tabContent.css('top', tabItemHeight);
                _tab.height(tabContentHeight + tabItemHeight);
                tabItemWidth = (tabwidth - (tabItemLength - 1) * tiGap) / tabItemLength;
                _tabItem.width(tabItemWidth).css('margin-left', tiGap);
                _tabItem.first().css('margin-left', 0);
                _tabItem.last().css({ 'position': 'absolute', 'top': 0, 'right': 0 }).width(tabItemWidth);
            } else {
                _tab.css('height', 'auto');
                _tabItem.width(tabwidth);
                _tabItem.css('margin-left', 0).last().css('position', 'relative');
            }
            _tabItemA.focus(tabs);
            _tabItemA.click(tabs);
            // Lize加的
            _tabItemA.hover(tabs);

            function tabs(e) {
                var _tabItemNow = $(this).parent(),
                    tvp = _tab.offset().top,
                    tabIndex = _tabItemNow.index() / 2,
                    scollDistance = tvp + tabItemHeight * tabIndex - hh;
                _tab.find('.tabItem').each(function(){
                    if($(this).hasClass('active')) {
                        _tabItem = $(this);
                        $(this).removeClass('active');
                    }
                });
                _tabItemNow.addClass('active');
                if(_tabItemNow.html() != _tabItem.html()) {
                    if (ww <= wwSmall) {
                        _tabItem.next().slideUp();
                        _tabItemNow.next().slideDown();
                        $("html,body").stop(true, false).animate({ scrollTop: scollDistance });
                    } else {
                        _tabItem.next().hide();
                        _tabItemNow.next().show();
                        slickContent(_tabItemNow.next().find('.singleSlider_TaxReduce'));
                        tabContentHeight = _tabItemNow.next().innerHeight();
                        
                        _tab.height(tabContentHeight + tabItemHeight);
                    }
                }
                e.preventDefault();
            }
        });
    }
    /*-----------------------------------*/
    ///////////////置頂go to top////////////
    /*-----------------------------------*/
    $(window).bind('scroll', function() {
        if ($(this).scrollTop() > 200) {
            $('.scrollToTop').fadeIn();
        } else {
            $('.scrollToTop').fadeOut();
        }
    });
    /*-----------------------------------*/
    /////click event to scroll to top//////
    /*-----------------------------------*/
    $('.scrollToTop').click(function(e) {
        $('html, body').animate({ scrollTop: 0 }, 800, 'easeOutExpo');
        // e.preventDefault();
    });
    /*--------------------------------------------------------*/
    /////設定img 在IE9+ SAFARI FIREFOX CHROME 可以object-fit/////
    /*--------------------------------------------------------*/
    var userAgent, ieReg, ie;
    userAgent = window.navigator.userAgent;
    ieReg = /msie|Trident.*rv[ :]*11\./gi;
    ie = ieReg.test(userAgent);
    if (ie) {
        $(".img-container").each(function() {
            var imgUrl = $(this).children('a').find('img').attr('src');
            var $container = $(this);
            $(this).has(".cover").find('a').addClass("ie-object-cover");
            $(this).has(".cover").find('a').css("backgroundImage", "url(" + imgUrl + ")");
            $(this).has(".fill").find('a').addClass("ie-object-fill");
            $(this).has(".fill").find('a').css("backgroundImage", "url(" + imgUrl + ")");
            $(this).has(".contain").find('a').addClass("ie-object-contain");
            $(this).has(".contain").find('a').css("backgroundImage", "url(" + imgUrl + ")");
        });
    }
    // 以下是IE8以下的版本
    if (document.all && document.querySelector && !document.addEventListener) {
        // alert('IE8');
        // 拿掉wow
        $('div').removeClass('wow');
        $('a').removeClass('wow').removeClass('fadeInUp').removeAttr('style');
        $('.Tax_AD').removeClass('wow').removeClass('bounceInLeft').removeClass('bounceInRight').removeAttr('style');
        $('.Visual div').removeClass('wow').removeClass('bounceInLeft').removeClass('bounceInRight').removeAttr('style');
        $('.MainInfo div').removeClass('wow').removeClass('bounceInLeft').removeClass('bounceInRight').removeAttr('style');
    }
    /*-----------------------------*/
    /////form表單 placeholder隱藏/////
    /*-----------------------------*/
    // $('input,textarea').focus(function() {
    //     $(this).removeAttr('placeholder');
    // });
    /*------------------------------------*/
    /////form表單 單個檔案上傳+多個檔案上傳/////
    /*------------------------------------*/
    $(document).on('change', '.check_file', function() {
        var names = [];
        var length = $(this).get(0).files.length;
        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            names.push($(this).get(0).files[i].name);
        }
        // $('input[name=file]').val(names);
        if (length > 2) {
            var fileName = names.join(', ');
            $(this).closest('.upload_grp').find('.upload_file').attr("value", length + " files selected");
        } else {
            $(this).closest('.upload_grp').find('.upload_file').attr("value", names);
        }
    });
    /*-----------------*/
    /////modal設定/////
    /*-----------------*/
    $('#modal_lightbox').hide(); //先隱藏視窗
    $('.modal').after('<div class="modal_overlay"></div>'); //新增透明底
    $('.modal').prepend('<button type="button" class="close">關閉</button>'); //新增關閉按鈕
    $('.modal_overlay').hide(); //隱藏透明底
    //按鈕動作
    $('.openModal').click(function(e) {
        //var index = $('.openModal').index(this);
		var index = $(this).closest('.col').attr('id');
		//alert(index);
        $('#modal_lightbox').html($('#modal_lightbox_' + index).html());
        $('.modal').show();
        $('.modal').prepend('<button type="button" class="close">關閉</button><script>$(function() {$(".close").focus();});</script>'); //新增關閉按鈕
        //點選關閉按鈕及透明底都可關閉
        $('.modal_overlay').click(closeModal);
        //$('.modal .close').click(closeModal);
		$('.modal .close').click(closeModal);
        $('#modal_lightbox').show();
        $('.modal_overlay').show();
        $('body').addClass('noscroll');
        e.preventDefault();
    });
    //關閉function
    function closeModal() {
        $('#modal_lightbox').hide();
        $('.modal_overlay').hide();
        $('.modal').hide();
        $('body').removeClass('noscroll');
		//$('.openModal').eq(0).focus();
		$('#DIV_TaxReduce .slick-next').focus();
    }
    //點選關閉按鈕及透明底都可關閉
    $('.modal_overlay').click(closeModal);
    $('.modal .close').click(closeModal);

    /*-----------------------------------*/
    /////////// 無障礙快捷鍵盤組合  //////////
    /*-----------------------------------*/
    $(document).on('keydown', function(e) {
        // alt+S 查詢
        if (e.altKey && e.keyCode == 83) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('.search').find('input[type="text"]').focus();
        }
        // alt+U header
        if (e.altKey && e.keyCode == 85) {
            $('html, body').animate({ scrollTop: 0 }, 200, 'easeOutExpo');
            $('header').find('.accesskey').focus();
        }
        // alt+C 主要內容區
        if (e.altKey && e.keyCode == 67) {
            $('html, body').stop(true, true).animate({ scrollTop: $('.main').find('.accesskey').offset().top - 70 }, 800, 'easeOutExpo');
            $('.main').find('.accesskey').focus();
        }
        // alt+Z footer
        if (e.altKey && e.keyCode == 90) {
            $('html, body').stop(true, true).animate({ scrollTop: $('footer').find('.accesskey').offset().top }, 800, 'easeOutExpo');
            $('footer').find('.accesskey').focus();
        }
    });
});