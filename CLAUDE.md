# 모빌리 프로젝트 가이드

마비노기 모바일 일일 숙제 체커

## 기술 스택
- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- localStorage (상태 영속성)

## 핵심 규칙

### UI/UX
- 클릭 가능한 요소는 반드시 `cursor-pointer` 추가
- disabled 상태는 `cursor-not-allowed` 추가
- 모든 인터랙션에 `transition-*` 애니메이션 적용

### 컴포넌트
- `src/components/` - 프레젠테이션 컴포넌트
- `src/hooks/` - 상태 관리 로직
- `src/lib/constants.ts` - 게임 데이터 (아이템, 카테고리)
- `src/types/` - 타입 정의

### 데이터 구조
- `CheckItem`: 체크리스트 아이템 (maxCount로 다중 체크 지원)
- `Category`: daily | weekly | exchange | shop
- `CheckState`: boolean | number (다중 체크는 숫자)

### 리셋 타이밍
- 일일: 매일 오전 6시 KST
- 주간: 월요일 오전 6시 KST

## 명령어
```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
```
