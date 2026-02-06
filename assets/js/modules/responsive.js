export class ResponsiveManager {
    constructor() {
        this.initResponsiveImages();
        this.handleResize();
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initResponsiveImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
        });
    }

    handleResize() {
        this.adjustTypography();
        this.handleMobileMenu();
    }

    adjustTypography() {
        const root = document.documentElement;
        const width = window.innerWidth;
        
        if (width < 576) {
            root.style.fontSize = '14px';
        } else if (width < 992) {
            root.style.fontSize = '15px';
        } else {
            root.style.fontSize = '16px';
        }
    }

    handleMobileMenu() {
        // 모바일 메뉴 토글 로직
    }
}