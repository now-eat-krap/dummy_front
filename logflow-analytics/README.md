# LogFlow - AI-Powered Analytics Platform

LogFlow는 사용자 행동 패턴을 분석하는 차세대 웹 애널리틱스 플랫폼입니다. 구글 애널리틱스보다 쉽고 직관적이며, AI 기반 인사이트를 제공합니다.

## 🌟 주요 기능

### 📊 실시간 대시보드
- 사용자 이벤트 추적 및 시각화
- 세션 기반 분석
- 주요 지표 모니터링

### 🛣️ 사용자 여정 분석
- 전환 퍼널 시각화
- 성공/이탈 경로 분석
- 단계별 전환율 추적

### 🔥 히트맵
- 클릭 히트맵
- 스크롤 맵
- 어텐션 맵

### ✨ AI 기반 차별화 기능

#### 1. 자동 리포트 생성
- 수집된 데이터를 AI가 자동으로 분석
- 실행 가능한 인사이트 제공
- 개선 추천사항 자동 생성
- 한국어로 이해하기 쉬운 리포트

#### 2. 버튼 자동 라벨링
- DOM 구조와 컨텍스트 분석
- 의미있는 라벨 자동 생성
- 일관된 네이밍 규칙 적용
- 분석하기 쉬운 형태로 변환

#### 3. 패턴 인식
- 사용자 행동 패턴 자동 감지
- 이상 징후 식별
- 개선 기회 발견

## 🚀 시작하기

### 설치

\`\`\`bash
npm install
\`\`\`

### 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📖 사용 방법

### 1. 이벤트 추적

\`\`\`tsx
import { TrackedButton } from "@/components/tracked-button"

<TrackedButton 
  trackingId="btn_signup" 
  trackingName="Sign Up Button"
>
  Sign Up
</TrackedButton>
\`\`\`

### 2. AI 자동 라벨링

\`\`\`tsx
import { AutoLabelButton } from "@/components/auto-label-button"

<AutoLabelButton
  elementId="btn_unknown"
  elementType="button"
  context={{ section: "hero", purpose: "action" }}
  onLabelGenerated={(label) => console.log(label)}
/>
\`\`\`

### 3. AI 리포트 생성

AI Insights 페이지에서 "리포트 생성" 버튼을 클릭하면 자동으로 분석 리포트가 생성됩니다.

## 🎯 구글 애널리틱스와의 차이점

| 기능 | LogFlow | Google Analytics |
|------|---------|------------------|
| 설정 복잡도 | ⭐ 매우 쉬움 | ⭐⭐⭐⭐ 복잡함 |
| AI 리포트 | ✅ 자동 생성 | ❌ 없음 |
| 자동 라벨링 | ✅ AI 기반 | ❌ 수동 설정 |
| 한국어 지원 | ✅ 완벽 지원 | ⚠️ 제한적 |
| 학습 곡선 | ⭐ 낮음 | ⭐⭐⭐⭐⭐ 높음 |

## 🛠️ 기술 스택

- **Framework**: Next.js 15
- **AI**: Vercel AI SDK
- **UI**: shadcn/ui + Tailwind CSS
- **Charts**: Recharts
- **Storage**: LocalStorage (데모용)

## 📝 라이선스

MIT
