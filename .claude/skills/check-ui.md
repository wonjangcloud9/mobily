# UI 규칙 검사

컴포넌트의 UI/UX 규칙 준수 여부를 검사합니다.

## 검사 항목

### 필수
- [ ] 클릭 가능한 요소에 `cursor-pointer` 있는지
- [ ] disabled 상태에 `cursor-not-allowed` 있는지
- [ ] 인터랙션에 `transition-*` 애니메이션 있는지

### 권장
- [ ] hover 상태 스타일 정의
- [ ] active 상태 피드백 (scale-95 등)
- [ ] focus 상태 outline 처리

## 사용법
```
/check-ui <파일경로>
```

## 예시
```
/check-ui src/components/TabBar.tsx
```
