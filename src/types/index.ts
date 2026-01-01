export type Category = 'daily' | 'weekly' | 'exchange' | 'shop';

export type Subcategory =
  | 'shop'
  | 'dungeon'
  | 'field'
  | 'mission'
  | 'boss'
  | 'abyss'
  | 'raid'
  | 'guild'
  | 'exchange'
  | 'weekly-shop';

export interface CheckItem {
  id: string;
  label: string;
  category: Category;
  subcategory: Subcategory;
  note?: string;
  maxCount?: number; // 다중 체크용 (주간 콘텐츠)
}

export interface CheckState {
  [itemId: string]: boolean | number; // number: 다중 체크 완료 횟수
}

export interface DisabledState {
  [itemId: string]: boolean;
}

export interface Character {
  id: string;
  name: string;
}

export interface CharacterData {
  checks: CheckState;
  disabled: DisabledState;
  lastReset: string;
  lastWeeklyReset: string;
}

export interface StorageData {
  characters: Character[];
  activeCharacterId: string;
  characterData: {
    [characterId: string]: CharacterData;
  };
}

export const MAX_CHARACTERS = 5;
