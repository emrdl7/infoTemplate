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

### 3. 코딩 패턴
- 함수 기반 모듈화
- 반응형 메뉴 (모바일: 토글, PC: 호버)
- Swiper 통합
- 이미지 배경 자동 처리

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

## 브레이크포인트

- **Mobile**: 320px ~ 767px
- **Tablet**: 768px ~ 1028px  
- **PC**: 1029px 이상

## 주요 함수

### common.js

```javascript
menu()          // 메뉴 토글 및 네비게이션
coverimage()    // 이미지 배경 처리
maintab()       // 탭 기능
initSwiper()    // Swiper 초기화
outlink()       // 외부 링크 처리
```

## SCSS Mixins

```scss
@include container($width)                      // 컨테이너
@include responsive-font-size($m, $t, $d)      // 반응형 폰트
@include accessibility-focus                    // 접근성 포커스
@include flex-center                            // Flexbox 중앙
@include transition($property, $duration)       // 트랜지션
@include bg-cover                              // 배경 이미지
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

### v2.1 (2024-02-06)
- Boxicons → Google Material Icons로 변경
- CDN 기반 아이콘 로딩으로 경량화

### v2.0 (2024-02-06)
- 실제 프로젝트 패턴 기반으로 전면 재작성
- jQuery 3.5.1 + Swiper 통합
- 함수 기반 모듈화
- SCSS 구조 개선
- 웹접근성 강화