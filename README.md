# Git Plants

Generating plant visuals based on GitHub activity, designed for use in profile READMEs.

GitHub 활동을 기반으로 식물 비주얼을 생성하여, 프로필 README에서 사용할 수 있도록 설계된 플랫폼입니다.

<div align="center">

<a href="#english">🇺🇸 English</a> | <a href="#korean">🇰🇷 한국어</a>

</div>

---

<a id="english"></a>

## 🌱 Overview

Git Plants transforms your GitHub contribution data into growing plants. Watch your coding habits bloom into a beautiful garden that you can showcase on your GitHub profile.

## 🛠️ Tech Stack

### Framework

<img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>

### Language

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

### State Management

<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=zustand&logoColor=white"/>

### Internationalization

<img src="https://img.shields.io/badge/next--intl-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>

### Package Manager

<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"/>

## ✨ Features

### 🌿 Plant Growth System

Your plant grows based on your GitHub contributions:

```
🌰 SEED → 🌱 SPROUT → 🌿 GROWING → 🪴 MATURE → 🌻 HARVEST
 (0~9)     (10~29)     (30~49)      (50~69)      (70+)
```

- Reach **70 contributions** to harvest your plant
- Earn crops and seeds with each harvest
- Multiple harvests possible per month (140 = 2 harvests, 210 = 3 harvests)

### 🔐 Authentication

- GitHub OAuth integration for seamless login
- Secure session management with automatic token refresh

### 🎨 Customization

- **Garden Mode**: Landscape view with customizable backgrounds and pots
- **Mini Mode**: Compact vertical widget for profile sidebars
- Adjustable widget size and pot positioning
- Collection of backgrounds, pots, and badges _(coming soon)_ to unlock

### 🏪 Shop System

- Earn seeds through GitHub contributions
- Purchase new backgrounds and pots
- Sell harvested crops for more seeds

### 🖼️ Animated Widget

- Server-side GIF generation for README widgets
- Real-time plant growth based on contribution level
- Shareable links for easy integration

### 🌐 Multi-language Support

- Available in English and Korean

## 🚀 Usage

### 1. Sign in with GitHub

Visit [Git Plants](https://git-plants.com) and sign in with your GitHub account.

### 2. Customize Your Garden

Choose your background, pot, and arrange your garden in MyPage.

### 3. Add Widget to Your README

Click the **Copy Link** button in MyPage, then paste it into your GitHub profile README.

```markdown
<!-- Garden Mode (400x300) -->

[![Username's Garden](https://git-plants.com/api/mypage/YOUR_USER_ID?format=gif&mode=GARDEN&width=400&height=300&potX=50&potY=80)](https://git-plants.com)

<!-- Mini Mode (267x400) -->

[![Username's Garden](https://git-plants.com/api/mypage/YOUR_USER_ID?format=gif&mode=MINI&width=267&height=400&potX=50&potY=80)](https://git-plants.com)
```

#### Widget Options

| Parameter | Description                     | Default                |
| --------- | ------------------------------- | ---------------------- |
| `format`  | Output format                   | `gif`                  |
| `mode`    | Widget mode (`GARDEN` / `MINI`) | `GARDEN`               |
| `width`   | Widget width (px)               | GARDEN: 400, MINI: 267 |
| `height`  | Widget height (px)              | GARDEN: 300, MINI: 400 |
| `potX`    | Pot X position (%)              | 50                     |
| `potY`    | Pot Y position (%)              | 80                     |

## 🎯 Technical Highlights

- **Hybrid State Management**: TanStack Query for server state + Zustand for UI state
- **API Proxy Middleware**: Next.js middleware rewrites for seamless cookie handling
- **Optimistic UI Updates**: Immediate feedback with rollback on failure
- **Animated Widget Generation**: Server-side GIF compositing with Sharp and @skyra/gifenc

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<a id="korean"></a>

## 🌱 개요

Git Plants는 GitHub 기여 데이터를 자라나는 식물로 변환합니다. 코딩 습관이 아름다운 정원으로 피어나는 것을 지켜보고, GitHub 프로필에 보여주세요.

## 🛠️ 기술 스택

### 프레임워크

<img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/> <img src="https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>

### 언어

<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>

### 스타일링

<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>

### 상태 관리

<img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/> <img src="https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=zustand&logoColor=white"/>

### 국제화

<img src="https://img.shields.io/badge/next--intl-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>

### 패키지 매니저

<img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"/>

## ✨ 주요 기능

### 🌿 식물 성장 시스템

GitHub 기여도에 따라 식물이 성장합니다:

```
🌰 씨앗 → 🌱 새싹 → 🌿 성장 → 🪴 성숙 → 🌻 수확
 (0~9)    (10~29)   (30~49)   (50~69)   (70+)
```

- **70 기여도** 달성 시 식물 수확
- 수확할 때마다 작물과 씨앗 획득
- 한 달에 여러 번 수확 가능 (140 = 2회, 210 = 3회)

### 🔐 인증

- 원활한 로그인을 위한 GitHub OAuth 연동
- 자동 토큰 갱신을 통한 안전한 세션 관리

### 🎨 커스터마이징

- **Garden Mode**: 배경과 화분을 커스터마이징할 수 있는 가로 뷰
- **Mini Mode**: 프로필 사이드바용 컴팩트 세로 위젯
- 조절 가능한 위젯 크기와 화분 위치
- 잠금 해제할 수 있는 배경, 화분, 배지 _(준비중)_ 컬렉션

### 🏪 상점 시스템

- GitHub 기여를 통해 씨앗 획득
- 새로운 배경과 화분 구매
- 수확한 작물을 판매하여 씨앗 획득

### 🖼️ 애니메이션 위젯

- README 위젯용 서버 사이드 GIF 생성
- 기여 레벨에 따른 실시간 식물 성장
- 쉬운 연동을 위한 공유 가능한 링크

### 🌐 다국어 지원

- 영어와 한국어 지원

## 🚀 사용 방법

### 1. GitHub로 로그인

[Git Plants](https://git-plants.com)에 접속하여 GitHub 계정으로 로그인합니다.

### 2. 정원 커스터마이징

마이페이지에서 배경, 화분을 선택하고 정원을 꾸밉니다.

### 3. README에 위젯 추가

마이페이지에서 **링크 복사** 버튼을 클릭한 후, GitHub 프로필 README에 붙여넣습니다.

```markdown
<!-- Garden Mode (400x300) -->

[![Username's Garden](https://git-plants.com/api/mypage/YOUR_USER_ID?format=gif&mode=GARDEN&width=400&height=300&potX=50&potY=80)](https://git-plants.com)

<!-- Mini Mode (267x400) -->

[![Username's Garden](https://git-plants.com/api/mypage/YOUR_USER_ID?format=gif&mode=MINI&width=267&height=400&potX=50&potY=80)](https://git-plants.com)
```

#### 위젯 옵션

| 파라미터 | 설명                          | 기본값                 |
| -------- | ----------------------------- | ---------------------- |
| `format` | 출력 포맷                     | `gif`                  |
| `mode`   | 위젯 모드 (`GARDEN` / `MINI`) | `GARDEN`               |
| `width`  | 위젯 너비 (px)                | GARDEN: 400, MINI: 267 |
| `height` | 위젯 높이 (px)                | GARDEN: 300, MINI: 400 |
| `potX`   | 화분 X 위치 (%)               | 50                     |
| `potY`   | 화분 Y 위치 (%)               | 80                     |

## 🎯 기술적 하이라이트

- **하이브리드 상태 관리**: 서버 상태는 TanStack Query + UI 상태는 Zustand
- **API 프록시 미들웨어**: 원활한 쿠키 처리를 위한 Next.js 미들웨어 리라이트
- **낙관적 UI 업데이트**: 실패 시 롤백과 함께 즉각적인 피드백
- **애니메이션 위젯 생성**: Sharp와 @skyra/gifenc를 사용한 서버 사이드 GIF 합성

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
