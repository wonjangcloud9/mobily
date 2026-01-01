import { CheckItem } from '@/types';

export const DAILY_ITEMS: CheckItem[] = [
  { id: 'd1', label: '일일 던전', category: 'daily' },
  { id: 'd2', label: '일일 퀘스트', category: 'daily' },
  { id: 'd3', label: '무료 상점', category: 'daily' },
  { id: 'd4', label: '일일 보상', category: 'daily' },
  { id: 'd5', label: '요일 던전', category: 'daily' },
  { id: 'd6', label: '아르바이트', category: 'daily' },
];

export const WEEKLY_ITEMS: CheckItem[] = [
  { id: 'w1', label: '주간 교환', category: 'weekly' },
  { id: 'w2', label: '주간 보스', category: 'weekly' },
  { id: 'w3', label: '주간 미션', category: 'weekly' },
];

export const ALL_ITEMS: CheckItem[] = [...DAILY_ITEMS, ...WEEKLY_ITEMS];

export const STORAGE_KEY = 'mobily-checklist';

// 리셋 시간: 오전 6시 (KST)
export const RESET_HOUR_KST = 6;
