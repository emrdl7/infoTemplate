$(function(){
    // 초기화 함수 호출
    menu();
    coverimage();
    maintab();
    initSwiper();
});

/* ----- 반응형 유틸리티 (업계 표준 브레이크포인트) ----- */
const Responsive = {
    breakpoints: {
        mobile: 320,
        tablet: 768,   // 태블릿 시작
        desktop: 1024  // 데스크톱 시작
    },
    
    // 현재 디바이스 타입 반환
    getDevice: function() {
        const width = window.innerWidth;
        if (width < this.breakpoints.tablet) return 'mobile';
        if (width < this.breakpoints.desktop) return 'tablet';
        return 'desktop';
    },
    
    // 특정 디바이스인지 체크
    isMobile: function() {
        return this.getDevice() === 'mobile';
    },
    
    isTablet: function() {
        return this.getDevice() === 'tablet';
    },
    
    isDesktop: function() {
        return this.getDevice() === 'desktop';
    },
    
    // 하위 호환성 별칭
    isPc: function() {
        return this.isDesktop();
    },
    
    // 모바일 또는 태블릿인지 체크
    isMobileOrTablet: function() {
        return window.innerWidth < this.breakpoints.desktop;
    }
};

/* ----- Throttle 함수 (성능 최적화) ----- */
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

/* ----- Debounce 함수 (성능 최적화) ----- */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/* ----- Window Resize 핸들러 (최적화) ----- */
let currentDevice = Responsive.getDevice();

const handleResize = throttle(function() {
    const newDevice = Responsive.getDevice();
    
    // 디바이스 타입이 변경된 경우에만 메뉴 리셋
    if (currentDevice !== newDevice) {
        currentDevice = newDevice;
        resetMenu();
    }
}, 200);

window.addEventListener('resize', handleResize);

function resetMenu() {
    const $menu = $("nav#main-menu");
    const $shadow = $("div.shadow");
    
    // 모바일 메뉴 상태 초기화
    $menu.removeClass("menu allMenu");
    $menu.find(".menus > ul > li").removeClass("on");
    $shadow.removeClass("on");
    
    // PC에서는 헤더 상태 초기화
    if (Responsive.isPc()) {
        $("header").removeClass("on");
        $menu.find("ul ul").removeClass("on");
    }
}

/* ----- 메뉴 ----- */
function menu() {
    const $mainMenuBtn = $("button.main-menu");
    const $menu = $("nav#main-menu");
    const $closeBtn = $menu.find("button.close");
    const $shadow = $("div.shadow");
    const $menuLinks = $menu.find("h3 a");
    
    // 모바일 메뉴 열기
    $mainMenuBtn.on("click", function() {
        if (Responsive.isMobileOrTablet()) {
            $menu.addClass("menu allMenu");
            $shadow.addClass("on");
            $("body").addClass("lock");
        }
    });
    
    // 모바일 메뉴 닫기
    $closeBtn.on("click", closeMenu);
    $shadow.on("click", closeMenu);
    
    function closeMenu() {
        $menu.removeClass("menu allMenu");
        $shadow.removeClass("on");
        $("body").removeClass("lock");
    }
    
    // 서브메뉴 토글
    $menuLinks.on("click", function(e) {
        const $li = $(this).closest("li");
        const $submenu = $li.find("> ul");
        
        if (Responsive.isMobileOrTablet() && $submenu.length) {
            e.preventDefault();
            
            // 다른 메뉴 닫기
            $menu.find(".menus > ul > li").not($li).removeClass("on");
            
            // 현재 메뉴 토글
            $li.toggleClass("on");
        }
    });
    
    // PC 호버 메뉴
    if (Responsive.isPc()) {
        $menu.on("mouseenter", function() {
            $("header").addClass("on");
            $menu.find("ul ul").addClass("on");
        }).on("mouseleave", function() {
            $("header").removeClass("on");
            $menu.find("ul ul").removeClass("on");
        });
    }
    
    // ESC 키로 메뉴 닫기
    $(document).on("keydown", function(e) {
        if (e.key === "Escape" && $menu.hasClass("menu")) {
            closeMenu();
        }
    });
}

/* ----- 이미지 배경 처리 ----- */
function coverimage() {
    $("[data-bg-image]").each(function(){
        const $img = $(this).find("img");
        if ($img.length) {
            const imgSrc = $img.attr("src");
            if (imgSrc) {
                $(this).css("background-image", `url('${imgSrc}')`);
            }
        }
    });
    
    // Lazy loading 지원
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('[data-lazy-bg]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const $el = $(entry.target);
                    const imgSrc = $el.attr('data-lazy-bg');
                    $el.css('background-image', `url('${imgSrc}')`);
                    $el.removeAttr('data-lazy-bg');
                    imageObserver.unobserve(entry.target);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

/* ----- 탭 기능 ----- */
function maintab() {
    $("div.tabs button").on("click", function(){
        const $btn = $(this);
        const tabData = $btn.attr("data");
        
        // 버튼 상태 변경
        $btn.siblings().removeClass("on");
        $btn.addClass("on");
        
        // 탭 컨텐츠 전환
        const $tabContainer = $btn.closest("section, .tab-container");
        $tabContainer.find(".tab-data").removeClass("on");
        $tabContainer.find(`.tab-data.${tabData}`).addClass("on");
        
        // 접근성: aria-selected 업데이트
        $btn.attr("aria-selected", "true");
        $btn.siblings().attr("aria-selected", "false");
    });
}

/* ----- Swiper 초기화 ----- */
function initSwiper() {
    // 메인 슬라이더
    if ($('.main-swiper').length) {
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
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
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
            },
            // 접근성 개선
            a11y: {
                enabled: true,
                prevSlideMessage: '이전 슬라이드',
                nextSlideMessage: '다음 슬라이드',
            }
        });
    }
    
    // 배너 슬라이더
    if ($('.banner-swiper').length) {
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
            },
            // 반응형 슬라이드 개수
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1029: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                }
            }
        });
        
        // 자동재생 컨트롤
        $('.banner-pause').on('click', function(){
            bannerSwiper.autoplay.stop();
            $(this).removeClass("active").attr("aria-pressed", "false");
            $('.banner-play').addClass("active").attr("aria-pressed", "true");
            return false;
        });
        
        $('.banner-play').on('click', function(){
            bannerSwiper.autoplay.start();
            $(this).removeClass("active").attr("aria-pressed", "false");
            $('.banner-pause').addClass("active").attr("aria-pressed", "true");
            return false;
        });
    }
}

/* ----- 외부 링크 처리 ----- */
function outlink() {
    $("a[target='_blank']").each(function(){
        const $link = $(this);
        const title = $link.attr("title") || "";
        
        if (title.indexOf("새 창") === -1) {
            $link.attr("title", title + " (새 창)");
        }
        
        // rel 속성 추가 (보안)
        if (!$link.attr("rel")) {
            $link.attr("rel", "noopener noreferrer");
        }
    });
}

/* ----- 스크롤 관련 유틸리티 ----- */
const ScrollUtils = {
    // 부드러운 스크롤
    smoothScroll: function(target, offset = 0) {
        const $target = $(target);
        if ($target.length) {
            $('html, body').animate({
                scrollTop: $target.offset().top - offset
            }, 600);
        }
    },
    
    // Top 버튼
    initTopButton: function() {
        const $topBtn = $('.btn-top');
        if (!$topBtn.length) return;
        
        const toggleTopBtn = throttle(function() {
            if ($(window).scrollTop() > 300) {
                $topBtn.fadeIn();
            } else {
                $topBtn.fadeOut();
            }
        }, 100);
        
        $(window).on('scroll', toggleTopBtn);
        
        $topBtn.on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 400);
        });
    }
};

// Top 버튼 초기화
$(function() {
    ScrollUtils.initTopButton();
});