export type Category = 'daily' | 'weekly';

export type Subcategory =
  | 'shop'
  | 'dungeon'
  | 'field'
  | 'mission'
  | 'boss'
  | 'abyss'
  | 'raid'
  | 'guild';

export interface CheckItem {
  id: string;
  label: string;
  category: Category;
  subcategory: Subcategory;
  note?: string;
}

export interface CheckState {
  [itemId: string]: boolean;
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
