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
- **반응형 디자인**: 1029px 브레이크포인트

### 2. 웹접근성 준수
- Skip Navigation 구현
- 스크린리더 전용 텍스트 (.sr-only)
- ARIA 속성 사용
- 키보드 네비게이션 지원

### 3. 코딩 패턴 (최적화)
- **모바일 퍼스트 접근**: 모든 스타일과 스크립트
- **성능 최적화**: Throttle/Debounce 적용
- **디바이스 감지**: Responsive 유틸리티 객체
- **함수 기반 모듈화**: menu(), coverimage(), maintab()
- **반응형 메뉴**: 모바일(토글), PC(호버)
- **Lazy Loading**: Intersection Observer 지원
- **접근성**: ARIA, 키보드 네비게이션, ESC 닫기

### 4. SCSS 구조
- **_normalize.scss**: CSS 리셋
- **variables.scss**: 변수 정의
- **mixins.scss**: 재사용 가능한 믹스인
- **style.scss**: 메인 스타일시트

## 사용 방법

### 1. SCSS 컴파일
IDE의 SCSS 컴파일러 플러그인 사용:
- 입력: `assets/scss/style.scss`
- 출력: `assets/css/style.css`

### 2. 필수 라이브러리
다음 파일들이 필요합니다:
- jQuery 3.5.1
- Swiper Bundle
- Google Material Icons (CDN으로 자동 로드)

### 3. 개발 시작
1. index.html을 브라우저에서 열기
2. SCSS 수정 후 자동 컴파일 확인
3. common.js에서 기능 추가

## 브레이크포인트 (업계 표준)

- **Mobile**: 320px ~ 767px
- **Tablet**: 768px ~ 1023px  
- **Desktop**: 1024px 이상

> Bootstrap, Tailwind CSS 등 주요 프레임워크와 호환되는 표준 브레이크포인트를 사용합니다.

## 주요 함수 및 유틸리티

### common.js

```javascript
// 핵심 함수
menu()              // 메뉴 토글 및 네비게이션
coverimage()        // 이미지 배경 처리 (Lazy Loading 지원)
maintab()           // 탭 기능
initSwiper()        // Swiper 초기화
outlink()           // 외부 링크 처리

// 반응형 유틸리티
Responsive.getDevice()        // 'mobile', 'tablet', 'desktop' 반환
Responsive.isMobile()         // 모바일 체크 (~767px)
Responsive.isTablet()         // 태블릿 체크 (768px~1023px)
Responsive.isDesktop()        // 데스크톱 체크 (1024px~)
Responsive.isPc()             // 데스크톱 별칭 (하위 호환성)
Responsive.isMobileOrTablet() // 모바일 또는 태블릿 체크

// 성능 최적화
throttle(func, delay)   // Throttle 함수
debounce(func, delay)   // Debounce 함수

// 스크롤 유틸리티
ScrollUtils.smoothScroll(target, offset)  // 부드러운 스크롤
ScrollUtils.initTopButton()                // Top 버튼 초기화
```

## SCSS Mixins (모바일 퍼스트)

### 반응형
```scss
@include tablet { ... }              // 768px 이상
@include desktop { ... }             // 1024px 이상
@include pc { ... }                  // 1024px 이상 (별칭)
@include mobile-only { ... }         // ~767px
@include tablet-only { ... }         // 768px ~ 1023px
@include respond-to(900px) { ... }   // 커스텀 브레이크포인트
```

### 레이아웃
```scss
@include container($max-width)       // 컨테이너
@include flex-center                 // Flex 중앙 정렬
@include flex-between                // Flex 양쪽 정렬
@include flex-column                 // Flex 세로 배치
@include grid-auto(250px, 20px)      // Auto-fit Grid
```

### 타이포그래피
```scss
@include font-responsive(14px, 16px, 18px)  // 반응형 폰트
@include ellipsis(2)                         // 2줄 말줄임
```

### 효과
```scss
@include transition(all, 0.3s, ease)   // 트랜지션
@include hover-lift(5px)               // 호버 시 상승
@include hover-scale(1.05)             // 호버 시 확대
@include bg-cover                      // 배경 커버
@include aspect-ratio(16, 9)           // 종횡비 유지
```

### 접근성
```scss
@include focus-visible               // 포커스 스타일
@include sr-only                     // 스크린리더 전용
```

### 기타
```scss
@include card(20px, 8px)             // 카드 스타일
@include custom-scrollbar(8px)       // 커스텀 스크롤바
@include button-reset                // 버튼 리셋
@include link-reset                  // 링크 리셋
```

## 커스터마이징

### 색상 변경
`variables.scss`에서 색상 변수 수정:
```scss
$primary-color: #0056b3;
$secondary-color: #6c757d;
```

### 브레이크포인트 조정
`variables.scss`에서 브레이크포인트 수정:
```scss
$screen-size-pc: 1029px;
$screen-size-tablet: 768px;
```

### 메뉴 구조 변경
`index.html`의 `#main-menu` 섹션 수정

### Material Icons 사용법

**기본 아이콘 (Material Icons):**
```html
<span class="material-icons">home</span>
<span class="material-icons">menu</span>
<span class="material-icons">search</span>
```

**아웃라인 아이콘 (Material Symbols):**
```html
<span class="material-symbols-outlined">home</span>
<span class="material-symbols-outlined">menu</span>
<span class="material-symbols-outlined">search</span>
```

아이콘 목록: https://fonts.google.com/icons

## 브라우저 지원

- Chrome (최신)
- Firefox (최신)
- Safari (최신)
- Edge (최신)
- IE 11+ (부분 지원)

## 라이선스

MIT License

## 변경 이력

### v2.3 (2024-02-06)
- **브레이크포인트 표준화**: 업계 표준으로 변경
  - Mobile: ~767px
  - Tablet: 768px ~ 1023px
  - Desktop: 1024px 이상
- Bootstrap, Tailwind CSS와 호환
- 하위 호환성 유지 (pc → desktop 별칭)

### v2.2 (2024-02-06)
- **성능 최적화**: Throttle/Debounce 적용
- **모바일 퍼스트**: 모든 SCSS를 모바일 우선으로 재작성
- **반응형 유틸리티**: Responsive 객체 추가
- **실용적인 Mixins**: 20+ 개의 실전 믹스인
- **Lazy Loading**: Intersection Observer 지원
- **접근성 개선**: ESC 키 닫기, ARIA 속성
- **Top 버튼**: 스크롤 상단 이동 기능
- **유틸리티 클래스**: d-none, d-tablet-none 등

### v2.1 (2024-02-06)
- Boxicons → Google Material Icons로 변경
- CDN 기반 아이콘 로딩으로 경량화

### v2.0 (2024-02-06)
- 실제 프로젝트 패턴 기반으로 전면 재작성
- jQuery 3.5.1 + Swiper 통합
- 함수 기반 모듈화
- SCSS 구조 개선
- 웹접근성 강화