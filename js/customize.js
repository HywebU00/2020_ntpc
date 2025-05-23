//自行加入的JS請寫在這裡
function isEmptyObject(obj) {
for (var key in obj) {
        return false;
    }
    return true;
}

$(function() {
    // 跑馬燈
    if ($('.marquee').length > 0) {
        $('.marquee ul').slick({
            dots: false,
            infinite: true,
            vertical: true,
            verticalSwiping: true,
            speed: 300,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            pauseOnHover: true, //滑鼠移過後暫停自動撥放
            focusOnSelect: true,
        });
    }

    // 滿意度調查  ----------------------------------------------
    $('.btn-Feedback').click(function(event) {
        $(this).addClass('act');
        $('body').addClass('cover');
        $('.Feedback').fadeIn();
    });

    $('.Feedback').find('a.close').click(function(event) {
        $('.btn-Feedback').removeClass('act');
        $('body').removeClass('cover');
        $('.Feedback').fadeOut();
    });

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

    // 稅務線上服務 2022-0414
    $('.Tax_Online_2022 .link_list a').on('focus', function(event) {
        // if(){}else{}
        $('.Tax_Online_2022').find('.Item_switch').removeClass('act');
        $(this).parents('.Item_switch').addClass('act');
    });

    // 節稅資訊  -----------------------------------------------
    $('.singleSlider_TaxReduce').each(function() {
        if(!$(this).hasClass('taxInfo')) {
            $(this).slick({
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
        }
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
    // // 廣告slider  --------------------------------------------
    // $('.adSlider').slick({
    //     dots: false,
    //     infinite: true,
    //     speed: 300,
    //     slidesToShow: 6,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 4000, // 延長播放時間至 4 秒，提供更好的可讀性
    //     arrow: true,
    //     accessibility: true,
	// 	adaptiveHeight: true,
    //     responsive: [{
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 4,
    //             slidesToScroll: 4,
    //         }
    //     }, {
    //         breakpoint: 768,
    //         settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 3,
    //         }
    //     }, {
    //         breakpoint: 575,
    //         settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2,
    //         }
    //     }]
    // });
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

    // 常見問答 開關icon
    $('.accordion li>a').click(function(event) {
        /* Act on the event */

        $('.accordion li a').removeClass('act');
        $('.accordion .switch').html('展開');

        $(this).addClass('act').find('.switch').html('關閉');
    });

    // 分眾、分享  --------------------------------------------------
    // $("a.People").off().click(function() {
    //     $(this).next('ul').slideToggle(300);
    // });

    $('a.People').on('click', function (e) {
        e.preventDefault(); // 防止 <a> 預設行為
        const $ul = $(this).next('ul');

        if ($ul.css('display') === 'block') {
            $ul.hide();
        } else {
            $ul.show();
        }
    });


    $('.People + ul').on('focusout', function (e) {
        const $ul = $(this);
        setTimeout(() => {
            // 判斷是否還有焦點在這個 ul 內部
            const isStillInside = $.contains($ul[0], document.activeElement);
            if (!isStillInside) {
            $ul.hide(); // 或用 .css('display', 'none')
            }
        }, 0); // 延遲到 focus 移動完成後再判斷
    });


    $(".forward>a").off().click(function() {
        $(this).next('ul').slideToggle(300);
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

    $('.announce .close').click(function(e) {
        $(this).parent().fadeOut(600);
    });
    $('.announce').on('focusout', function (e) {
        const $announce = $(this);
        // 使用 setTimeout 確保下一個焦點已定位好
        setTimeout(() => {
            if (!$(document.activeElement).closest('.announce').length) {
            $announce.hide(); // 或用 .css('display', 'none')
            }
        }, 0);
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

    // 側邊欄
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

    // 鍵盤遊走
    $('#Side .open-side').on('focusin', function () {
        const $this = $('#Side .open-side');
        $('#Side').addClass('Show');
        $this.html('收合');
        $this.removeClass('icon-left-open');
        $this.addClass('icon-right-open');
    });
    $('#Side').on('focusout', function (e) {
        // 確認焦點是否真的離開 #Side 區域
        const related = e.relatedTarget;
        const $this = $('#Side .open-side');
        if (!related || !$.contains($('#Side')[0], related)) {
            $('#Side').removeClass('Show');
            $this.html('展開');
            $this.removeClass('icon-right-open');
            $this.addClass('icon-left-open');
        }
    });




    // function 社群
    // 字級  --------------------------------------------------
    // 用class name 下字級

	// if($.cookie('FontSize')=='S') {
	// 	$('#center>.container>section').removeClass('large_size').addClass('small_size');
	// 	$('.FontSize').find('.S').addClass('Act');
	// }
	// else{
	// 	if($.cookie('FontSize')=='L') {
	// 		$('#center>.container>section').removeClass('small_size').addClass('large_size');
	// 		$('.FontSize').find('.L').addClass('Act');
	// 	}
	// 	else{
	// 		$('#center>.container>section').removeClass('large_size small_size');
	// 		$('.FontSize').find('.M').addClass('Act');
	// 	}
	// }

    $('.FontSize').find('.M').addClass('Act');
    $('.FontSize').find('.S').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('Act');
        $('#center>.container>section').removeClass('large_size').addClass('small_size');
        $(this).addClass('Act');
		$.cookie('FontSize', 'S', { expires: 7 });
        e.preventDefault();
    });
    $('.FontSize').find('.M').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('Act');
        $('#center>.container>section').removeClass('large_size small_size');
        $(this).addClass('Act');
		$.cookie('FontSize', 'M', { expires: 7 });
        e.preventDefault();
    });
    $('.FontSize').find('.L').click(function(e) {
        $(this).parent('li').siblings('li').find('a').removeClass('Act');
        $('#center>.container>section').removeClass('small_size').addClass('large_size');
        $(this).addClass('Act');
		$.cookie('FontSize', 'L', { expires: 7 });
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

    // CP頁燈箱  -------------------------------------------------
    /* Button helper. Disable animations, hide close button, change title type and content */
	// if(isEmptyObject($('.fancybox-buttons'))){
	// 	$('.fancybox-buttons').fancybox({
	// 		openEffect: 'none',
	// 		closeEffect: 'none',
	// 		prevEffect: 'none',
	// 		nextEffect: 'none',
	// 		closeBtn: false,
	// 		helpers: {
	// 			title: {
	// 				type: 'inside'
	// 			},
	// 			buttons: {}
	// 		},
	// 		afterLoad: function() {
	// 			this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
	// 		}
	// 	});
	// }

    // CP頁燈箱  -------------------------------------------------
    // $('.fancybox-buttons').fancybox({
    //     openEffect: 'none',
    //     closeEffect: 'none',
    //     prevEffect: 'none',
    //     nextEffect: 'none',
    //     closeBtn: true,
    //     helpers: {
    //         title: {
    //             type: 'inside'
    //         },
    //         buttons: {}
    //     },
    //     afterLoad: function() {
    //         this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
    //     }
    // });

    //燈箱slick+lightBox組合
    $('.cp_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 545,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false
            }
        }]
    });
    // if(!isEmptyObject($('.cp_slider'))) {
    //     $('.cp_slider').slickLightbox({
    //         caption: 'caption',
    //         useHistoryApi: 'true',
    //         lazy: true
    //     });
    // };

    // SP -------------- 2020-0701
    $('.content-box-switch').click(function(){
        // alert('有');
        $(this).next('section').find('.content-box').slideToggle(300);
    });
});

$(document).ready(function () {
    // 廣告slider  --------------------------------------------
    $('.adSlider').slick({
        dots: false,
        infinite: true,
        // speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000, // 延長播放時間至 4 秒，提供更好的可讀性
        arrow: true,
        accessibility: true,
		adaptiveHeight: true,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        }, {
            breakpoint: 575,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            }
        }]
    });

    // 控制自動播放的變數
	let isPlaying = true;

    // 更新輪播狀態提示
	function updateCarouselStatus(currentSlide, totalSlides) {
		$("#carousel-status").text(
			`目前顯示第 ${currentSlide} 張投影片，共 ${totalSlides} 張`
		);
	}
	// 處理暫停/播放按鈕點擊
	$("#toggle-autoplay").click(function () {
		if (isPlaying) {
			// 暫停播放
			$(".adSlider").slick("slickPause");
			$(this)
				.text("開始播放")
				.attr("aria-label", "開始自動播放輪播")
				.attr("aria-pressed", "true");
		} else {
			// 開始播放
			$(".adSlider").slick("slickPlay");
			$(this)
				.text("暫停播放")
				.attr("aria-label", "暫停自動播放輪播")
				.attr("aria-pressed", "false");
		}
		isPlaying = !isPlaying;
	});

    // 監聽輪播變化
	$(".adSlider").on("afterChange", function (event, slick, currentSlide) {
		updateCarouselStatus(currentSlide + 1, slick.slideCount);
	});

	// 鍵盤控制
	$(".adSlider").on("keydown", function (e) {
		switch (e.key) {
			case "ArrowLeft":
				$(this).slick("slickPrev");
				break;
			case "ArrowRight":
				$(this).slick("slickNext");
				break;
			case "Space":
				$("#toggle-autoplay").click();
				e.preventDefault();
				break;
		}
	});
});













