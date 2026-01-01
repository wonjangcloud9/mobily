import { CheckItem, Subcategory } from '@/types';

// ===== 일일 콘텐츠 (매일 오전 6시 초기화) =====

export const DAILY_ITEMS: CheckItem[] = [
  // 캐시샵
  {
    id: 'd-shop-1',
    label: '추천픽 무료 상품',
    category: 'daily',
    subcategory: 'shop',
  },
  {
    id: 'd-shop-2',
    label: '은동전 상자 (데카샵)',
    category: 'daily',
    subcategory: 'shop',
  },
  {
    id: 'd-shop-3',
    label: '보석 상자 10개 (골드샵)',
    category: 'daily',
    subcategory: 'shop',
  },

  // 던전
  {
    id: 'd-dun-1',
    label: '검은 구멍 (일일)',
    category: 'daily',
    subcategory: 'dungeon',
    note: '1회',
  },
  {
    id: 'd-dun-2',
    label: '망령의 탑',
    category: 'daily',
    subcategory: 'dungeon',
    note: '20회',
  },
  {
    id: 'd-dun-3',
    label: '요일 던전',
    category: 'daily',
    subcategory: 'dungeon',
    note: '1회',
  },

  // 사냥터 보스 (일일)
  {
    id: 'd-field-1',
    label: '늑대의 숲 보스',
    category: 'daily',
    subcategory: 'field',
    note: '난도별',
  },
  {
    id: 'd-field-2',
    label: '여신의 뜰 보스',
    category: 'daily',
    subcategory: 'field',
    note: '난도별',
  },
  {
    id: 'd-field-3',
    label: '얼음 협곡 보스',
    category: 'daily',
    subcategory: 'field',
    note: '난도별',
  },
  {
    id: 'd-field-4',
    label: '구름 황야 보스',
    category: 'daily',
    subcategory: 'field',
    note: '난도별',
  },
  {
    id: 'd-field-5',
    label: '센마이 평원 보스',
    category: 'daily',
    subcategory: 'field',
    note: '난도별',
  },
  {
    id: 'd-field-6',
    label: '어비스 구멍',
    category: 'daily',
    subcategory: 'field',
    note: '4곳',
  },

  // 미션
  {
    id: 'd-mission-1',
    label: '일일 미션',
    category: 'daily',
    subcategory: 'mission',
  },
  {
    id: 'd-mission-2',
    label: '아르바이트',
    category: 'daily',
    subcategory: 'mission',
  },
];

// ===== 주간 콘텐츠 (월요일 오전 6시 초기화) =====

export const WEEKLY_ITEMS: CheckItem[] = [
  // 던전 (주간)
  {
    id: 'w-dun-1',
    label: '검은 구멍 (초과)',
    category: 'weekly',
    subcategory: 'dungeon',
    note: '7회',
  },
  {
    id: 'w-dun-2',
    label: '소환의 결계',
    category: 'weekly',
    subcategory: 'dungeon',
    note: '7회',
  },

  // 필드 보스
  {
    id: 'w-boss-1',
    label: '페리 & 보로',
    category: 'weekly',
    subcategory: 'boss',
  },
  {
    id: 'w-boss-2',
    label: '크라브바흐',
    category: 'weekly',
    subcategory: 'boss',
  },
  {
    id: 'w-boss-3',
    label: '크라마',
    category: 'weekly',
    subcategory: 'boss',
  },
  {
    id: 'w-boss-4',
    label: '드로흐에넴',
    category: 'weekly',
    subcategory: 'boss',
  },
  {
    id: 'w-boss-5',
    label: '토르모그',
    category: 'weekly',
    subcategory: 'boss',
  },

  // 어비스 (바리)
  {
    id: 'w-abyss-1',
    label: '지하 대공동',
    category: 'weekly',
    subcategory: 'abyss',
  },
  {
    id: 'w-abyss-2',
    label: '혼돈의 신전',
    category: 'weekly',
    subcategory: 'abyss',
  },
  {
    id: 'w-abyss-3',
    label: '부활의 신단',
    category: 'weekly',
    subcategory: 'abyss',
  },
  {
    id: 'w-abyss-4',
    label: '오염된 폐기장',
    category: 'weekly',
    subcategory: 'abyss',
  },

  // 레이드
  {
    id: 'w-raid-1',
    label: '글라스기브넨',
    category: 'weekly',
    subcategory: 'raid',
    note: '4인',
  },
  {
    id: 'w-raid-2',
    label: '화이트 서큐버스',
    category: 'weekly',
    subcategory: 'raid',
    note: '4인',
  },
  {
    id: 'w-raid-3',
    label: '타바르타스',
    category: 'weekly',
    subcategory: 'raid',
    note: '8인',
  },
  {
    id: 'w-raid-4',
    label: '에이렐',
    category: 'weekly',
    subcategory: 'raid',
    note: '8인',
  },

  // 길드/의뢰
  {
    id: 'w-guild-1',
    label: '모험가 길드 정기 의뢰',
    category: 'weekly',
    subcategory: 'guild',
  },
  {
    id: 'w-guild-2',
    label: '채집 스크롤 3종',
    category: 'weekly',
    subcategory: 'guild',
    note: '임무 게시판',
  },
  {
    id: 'w-guild-3',
    label: '마물 퇴치 증표 교환',
    category: 'weekly',
    subcategory: 'guild',
  },

  // 미션
  {
    id: 'w-mission-1',
    label: '주간 미션',
    category: 'weekly',
    subcategory: 'mission',
  },
];

export const ALL_ITEMS: CheckItem[] = [...DAILY_ITEMS, ...WEEKLY_ITEMS];

export const STORAGE_KEY = 'mobily-checklist';

// 리셋 시간: 오전 6시 (KST)
export const RESET_HOUR_KST = 6;

// 서브카테고리 한글 이름
export const SUBCATEGORY_NAMES: Record<Subcategory, string> = {
  shop: '캐시샵',
  dungeon: '던전',
  field: '사냥터',
  mission: '미션',
  boss: '필드 보스',
  abyss: '어비스 (바리)',
  raid: '레이드',
  guild: '길드/의뢰',
};
