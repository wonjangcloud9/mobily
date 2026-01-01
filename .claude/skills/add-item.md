# 새 체크리스트 아이템 추가

새 일일/주간/물물교환 아이템을 추가합니다.

## 사용법
```
/add-item <카테고리> <라벨> [옵션]
```

## 카테고리
- `daily` - 일일 콘텐츠
- `weekly` - 주간 콘텐츠
- `exchange` - 물물교환
- `shop` - 주간상점

## 옵션
- `--sub=<서브카테고리>` - shop, dungeon, field, mission, boss, abyss, raid, guild, exchange
- `--note=<메모>` - 추가 정보 (예: "7회")
- `--max=<숫자>` - 다중 체크 (주간 전용)

## 예시
```
/add-item daily 심층 던전 --sub=dungeon --note=1회
/add-item weekly 새 보스 --sub=boss --max=3
```

## 수정 파일
- `src/lib/constants.ts`
