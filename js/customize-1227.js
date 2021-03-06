//自行加入的JS請寫在這裡
//宏璋加的字級keep
function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}

$(function() {
    // 主視覺  -------------------------------------------------
    $('.singleSlider').slick({
        dots: true,
        arrow: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        fade: true,
        cssEase: 'ease'
    });
    // 節稅資訊  -----------------------------------------------
    $('.singleSlider_TaxReduce').slick({
        dots: true,
        arrow: true,
        // infinite: true,
        // speed: 500,
        // autoplay: false,
        // fade: true,
        // cssEase: 'ease'
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 1,
        responsive: [{
            breakpoint: 768,
            settings: {
                // arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                // arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }]
    });
    // 以下是IE8以下的版本
    if (document.all && document.querySelector && !document.addEventListener) {
        $('.singleSlider_TaxReduce').slick({
            dots: true,
            arrow: true,
            infinite: true,
            speed: 500,
            autoplay: false,
            fade: true,
            cssEase: 'ease'
        });
    }
    // 廣告slider  --------------------------------------------
    $('.adSlider').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        arrow: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: false,
                arrows: true
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: true
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: true
            }
        }]
    });
    // 相關照片  -----------------------------------------------
    $('.Multiple_slider').slick({
        // dots: true,
        // dotsClass: 'slick-dots', //原點可以換成數字
        // infinite: true,
        // autoplay: true,
        // autoplaySpeed: 3000,
        // slidesToShow: 3, //一次顯示幾張
        // slidesToScroll: 1 //一次輪播幾張
        dots: true,
        dotsClass: 'slick-dots', //原點可以換成數字
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        arrow: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false,
                arrows: true
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true
            }
        }]
    });
    // 影片  -------------------------------------------------
    $('.singleSlider-Video').slick({
        dots: false,
        arrow: true,
        infinite: true,
        speed: 500,
        autoplay: false,
        fade: true,
        cssEase: 'ease'
    });
    // 分眾  --------------------------------------------------
    $(".People").off().click(function() {
        $(this).next('ul').slideToggle(300);
    });

    // 相簿  .Syncing_slider-----------------------------------
    $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.controls').html(i + '/' + slick.slideCount);
    });
    $('.Slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.Slider-nav',
        autoplay: false,
        autoplaySpeed: 2000,
        infinite: true
    });
    $('.Slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.Slider-for',
        dots: true,
        arrows: true,
        focusOnSelect: true,
        infinite: true,
    });
    // function 社群
    // 字級  --------------------------------------------------
    // 用class name 下字級
    $('.FontSize').find('.M').addClass('Act');
    $('.FontSize').find('.S').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('Act');
        $('#center>.container>section').removeClass('large_size').addClass('small_size');
        $(this).addClass('Act');
        e.preventDefault();
    });
    $('.FontSize').find('.M').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('Act');
        $('#center>.container>section').removeClass('large_size small_size');
        $(this).addClass('Act');
        e.preventDefault();
    });
    $('.FontSize').find('.L').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('Act');
        $('#center>.container>section').removeClass('small_size').addClass('large_size');
        $(this).addClass('Act');
        e.preventDefault();
    });

    // 用jq設字級
    // $('#center>.container').css({ fontSize: "1.25em" });
    // $('.FontSize .M').addClass('Act');
    // $('.FontSize .L').click(function() {
    //     $('.FontSize li a').removeClass('Act');
    //     $(this).addClass('Act');
    //     $('#center>.container').css({ fontSize: "137.5%" });
    // });
    // $('.FontSize .M').click(function() {
    //     $('.FontSize li a').removeClass('Act');
    //     $(this).addClass('Act');
    //     $('#center>.container').css({ fontSize: "125%" });
    // });
    // $('.FontSize .S').click(function() {
    //     $('.FontSize li a').removeClass('Act');
    //     $(this).addClass('Act');
    //     $('#center>.container').css({ fontSize: "112.5%" });
    // });

    // 以中字級為主的正常設定
    // $('.FontSize .L').click(function(){
    // 	$('.FontSize li a').removeClass('Act');
    // 	$(this).addClass('Act');
    // 	$('.lp').css({fontSize:"110%"});
    // });
    // $('.FontSize .M').click(function(){ 
    // 	$('.FontSize li a').removeClass('Act');
    // 	$(this).addClass('Act');
    // 	$('.lp').css({fontSize:"100%"});
    // });
    // $('.FontSize .S').click(function(){
    // 	$('.FontSize li a').removeClass('Act');
    // 	$(this).addClass('Act');
    // 	$('.lp').css({fontSize:"90%"});
    // });

    // 銀髮族
    $('.Grandpa .M').addClass('Act');
    $('.Grandpa .L').click(function() {
        $('.FontSize li a').removeClass('Act');
        $(this).addClass('Act');
        $('.function+section').css({ fontSize: "135%" });
    });
    $('.Grandpa .M').click(function() {
        $('.FontSize li a').removeClass('Act');
        $(this).addClass('Act');
        $('.function+section').css({ fontSize: "125%" });
    });
    $('.Grandpa .S').click(function() {
        $('.FontSize li a').removeClass('Act');
        $(this).addClass('Act');
        $('.function+section').css({ fontSize: "100%" });
    });

    // 進階查詢  -------------------------------------------------
    // $(window).bind('resize load', function(e) {
    //     var windowWidth = $(window).width();
    //     if (windowWidth <= 1024) {
    //         $('.advance_search button').off().click(function(e) {
    //             $('.advance_block').stop(true, true).slideToggle();
    //         });
    //     } else {
    //         $('.advance_search button').click(function(e) {
    //             $('.advance_block').stop(true, true).slideToggle();
    //         });
    //     }
    // });
    
    $('.advance_search button').click(function(e) {
        $('.advance_block').stop(true, true).slideToggle();
    });

    // 常見問答  -------------------------------------------------
    // $('.QandA div:first-child').find('li:first-child .Ans').show().addClass('Show');
    //第一層選單被click時
    $('.QandA .Qus').click(function() {
        //所有的.Ans刪掉.Show
        $('.QandA .Qus').next('.Ans').hide().removeClass('Show');
        //它底下的.Ans 打開 + .Show
        $(this).next('.Ans').slideDown(300).addClass('Show');
        return false;
    })

    // 愚蠢的側邊欄

    // 1、當.open-side被click的時候，他的上一層#Side right=0
    //    .open-side 圖標、文字要改為：icon-left-open、關閉
    // 2、要判斷假如

    $('.Side_Wrap .open-side').click(function(e){
        // 假如 按鈕（.open-side）的爸（#Side）身上有.Show，就移掉
        // 沒有的話就加上.Show
        if ($(this).parents('#Side').hasClass('Show')) {
            $('#Side').removeClass('Show');
            $('.open-side').attr('name', '展開');
            $('.open-side').html('展開');
            $('.open-side').removeClass('icon-right-open');
            $('.open-side').addClass('icon-left-open');

        } else {
            $('#Side').addClass('Show');
            $('.open-side').attr('name', '收合');
            $('.open-side').html('收合');
            $('.open-side').removeClass('icon-left-open');
            $('.open-side').addClass('icon-right-open');
        }
    });



    // CP頁燈箱  -------------------------------------------------
    /* Button helper. Disable animations, hide close button, change title type and content */
    $('.fancybox-buttons').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        prevEffect: 'none',
        nextEffect: 'none',
        closeBtn: false,
        helpers: {
            title: {
                type: 'inside'
            },
            buttons: {}
        },
        afterLoad: function() {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });
});



















