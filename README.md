# 관공서 웹사이트 기본 템플릿

실제 프로젝트 패턴 분석을 기반으로 한 실용적인 템플릿입니다.

## 프로젝트 구조

```
infoTemplate/
├── index.html
├── assets/
│   ├── css/
│   │   ├── swiper-bundle.css
│   │   └── style.css (컴파일된 파일)
│   ├── js/
│   │   ├── jquery-3.5.1.min.js
│   │   ├── swiper-bundle.js
│   │   └── common.js
│   └── scss/
│       ├── _normalize.scss
│       ├── variables.scss
│       ├── mixins.scss
│       └── style.scss
└── README.md
```

## 주요 특징

### 1. 기술 스택
- **jQuery 3.5.1**: 실제 프로젝트 패턴 기반
- **Swiper**: 슬라이더 라이브러리
- **SCSS**: CSS 전처리기
- **Google Material Icons**: CDN 기반 아이콘

### 2. 웹접근성 준수
- Skip Navigation 구현
- 스크린리더 전용 텍스트 (.sr-only)
- ARIA 속성 사용
- 키보드 네비게이션 지원

### 3. 성능 최적화
- **모바일 퍼스트**: 모든 스타일과 스크립트
- **Throttle/Debounce**: 불필요한 연산 제거
- **Lazy Loading**: Intersection Observer 지원
- **디바이스 감지**: Responsive 유틸리티

### 4. SCSS 구조
- **_normalize.scss**: CSS 리셋
- **variables.scss**: 변수 정의
- **mixins.scss**: 20+ 재사용 믹스인
- **style.scss**: 메인 스타일시트

## 브레이크포인트

3단계만 사용:

| 단계 | 범위 | 용도 |
|------|------|------|
| **Mobile** | ~767px | 스마트폰 |
| **Tablet** | 768px ~ 1023px | 태블릿 |
| **Desktop** | 1024px~ | PC, 노트북 |

## 사용 방법

### 1. SCSS 컴파일
IDE의 SCSS 컴파일러 플러그인 사용:
- 입력: `assets/scss/style.scss`
- 출력: `assets/css/style.css`

### 2. 필수 라이브러리
- jQuery 3.5.1
- Swiper Bundle
- Google Material Icons (CDN 자동 로드)

### 3. 개발 시작
1. index.html을 브라우저에서 열기
2. SCSS 수정 후 자동 컴파일 확인
3. common.js에서 기능 추가

## 핵심 함수

### JavaScript (common.js)

```javascript
// 메인 함수
menu()              // 반응형 메뉴
coverimage()        // 이미지 배경 처리
maintab()           // 탭 전환
initSwiper()        // 슬라이더 초기화

// 반응형 유틸리티
Responsive.isMobile()         // ~767px
Responsive.isTablet()         // 768px~1023px
Responsive.isDesktop()        // 1024px~
Responsive.isMobileOrTablet() // ~1023px

// 성능 최적화
throttle(func, delay)   
debounce(func, delay)

// 스크롤
ScrollUtils.smoothScroll(target, offset)
ScrollUtils.initTopButton()
```

## SCSS Mixins

### 반응형 (3단계)
```scss
.element {
    font-size: 14px;
    
    @include tablet {
        font-size: 16px;  // 768px~
    }
    
    @include desktop {
        font-size: 18px;  // 1024px~
    }
}

// 범위 제한
@include mobile-only { ... }   // ~767px만
@include tablet-only { ... }   // 768px~1023px만
```

### 레이아웃
```scss
@include container($max-width)
@include flex-center
@include flex-between
@include grid-auto(250px, 20px)
```

### 타이포그래피
```scss
@include font-responsive(14px, 16px, 18px)
@include ellipsis(2)  // 2줄 말줄임
```

### 효과
```scss
@include transition(all, 0.3s)
@include hover-lift(5px)
@include bg-cover
@include aspect-ratio(16, 9)
```

### 접근성
```scss
@include focus-visible
@include sr-only
```

### 기타
```scss
@include card(20px, 8px)
@include custom-scrollbar(8px)
@include button-reset
@include link-reset
```

## Material Icons 사용

```html
<!-- 기본 -->
<span class="material-icons">home</span>
<span class="material-icons">menu</span>

<!-- 아웃라인 -->
<span class="material-symbols-outlined">home</span>
<span class="material-symbols-outlined">menu</span>
```

아이콘 목록: https://fonts.google.com/icons

## 커스터마이징

### 색상 변경
```scss
// variables.scss
$primary-color: #0056b3;
$secondary-color: #6c757d;
```

### 브레이크포인트 조정
```scss
// variables.scss
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
```

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- IE 11+ (부분 지원)

## 변경 이력

### v2.4 (2024-02-06)
- **단순화**: 3단계 브레이크포인트에 집중
- Mobile / Tablet / Desktop만 사용
- 불필요한 설명 제거
- README 간소화

### v2.3 (2024-02-06)
- 브레이크포인트 표준화 (768px, 1024px)

### v2.2 (2024-02-06)
- 성능 최적화 (Throttle/Debounce)
- 모바일 퍼스트 SCSS

### v2.1 (2024-02-06)
- Google Material Icons

### v2.0 (2024-02-06)
- 실제 프로젝트 패턴 기반 재작성

## 라이선스

MIT License