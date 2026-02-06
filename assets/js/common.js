$(function(){
    // 초기화 함수 호출
    menu();
    coverimage();
    maintab();
    initSwiper();
});

/* ----- Window Size ----- */
var windowh = $(window).height();
var windowW = $(window).width();

$(window).on("resize", function(){
    windowh = $(window).height();
    windowW = $(window).width();
});

/* ----- 메뉴 ----- */
function menu() {
    $("button.main-menu").on("click", function () {
        if (windowW < 1029) {
            $("nav#main-menu").toggleClass("menu");
            $("nav#main-menu").toggleClass("allMenu");
            $("div.shadow").addClass("on");
        } else {
            $("header").addClass("on");
            $("nav#main-menu ul ul").addClass("on");
        }
    });

    $("nav#main-menu button.close").on("click", function () {
        $("nav#main-menu").toggleClass("menu");
        $("nav#main-menu").toggleClass("allMenu");
        $("div.shadow").removeClass("on");
    });

    $("nav#main-menu h3 a").on("click", function (e) {
        $("nav#main-menu div.menus>ul>li").removeClass("on");

        if (windowW < 1029 && $(this).parent().parent().find("ul").length) {
            $(this).parent().parent().addClass("on");
            e.preventDefault();
        } else {
            $("nav#main-menu h3 a").unbind();
        }
    });

    $("nav#main-menu").on("mouseenter", function(){
        if (windowW >= 1029) {
            $("header").addClass("on");
            $("nav#main-menu ul ul").addClass("on");
        }
    });

    $("nav#main-menu").on("mouseleave", function(){
        if (windowW >= 1029) {
            $("header").removeClass("on");
            $("nav#main-menu ul ul").removeClass("on");
        }
    });

    $(".shadow").on("click", function(){
        $("nav#main-menu").removeClass("menu allMenu");
        $(this).removeClass("on");
    });
}

/* ----- 이미지 배경 처리 ----- */
function coverimage() {
    $("[data-bg-image]").each(function(){
        var imgSrc = $(this).find("img").attr("src");
        if (imgSrc) {
            $(this).css("background-image", "url('" + imgSrc + "')");
        }
    });
}

/* ----- 탭 기능 ----- */
function maintab() {
    $("div.tabs button").on("click", function(){
        $("div.tabs button").removeClass("on");
        $(this).addClass("on");
        
        $(".tab-data").removeClass("on");
        $("." + $(this).attr("data")).addClass("on");
    });
}

/* ----- Swiper 초기화 ----- */
function initSwiper() {
    // 메인 슬라이더
    const mainSwiper = new Swiper('.main-swiper', {
        grabCursor: true,
        effect: "creative",
        creativeEffect: {
            prev: {
                shadow: true,
                translate: [0, 0, -400],
            },
            next: {
                translate: ["100%", 0, 0],
            },
        },
        loop: true,
        pagination: {
            el: ".main-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: '.main-next',
            prevEl: '.main-prev',
        },
        breakpoints: {
            1029: {
                creativeEffect: {
                    prev: {
                        shadow: true,
                        translate: [-210, 0, -360],
                    },
                    next: {
                        translate: ["10%", 0, 0],
                        opacity: 0,
                    },
                },
                limitProgress: 3,
            }
        }
    });

    // 배너 슬라이더
    const bannerSwiper = new Swiper('.banner-swiper', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        navigation: {
            nextEl: '.banner-next',
            prevEl: '.banner-prev',
        }
    });

    // 자동재생 컨트롤
    $('.banner-pause').on('click', function(){
        bannerSwiper.autoplay.stop();
        $(this).removeClass("active");
        $('.banner-play').addClass("active");
        return false;
    });

    $('.banner-play').on('click', function(){
        bannerSwiper.autoplay.start();
        $(this).removeClass("active");
        $('.banner-pause').addClass("active");
        return false;
    });
}

/* ----- 외부 링크 처리 ----- */
function outlink() {
    $("a[target='_blank']").each(function(){
        var title = $(this).attr("title") || "";
        if (title.indexOf("새 창") === -1) {
            $(this).attr("title", title + " (새 창)");
        }
    });
}