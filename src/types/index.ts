export type Category = 'daily' | 'weekly';

export interface CheckItem {
  id: string;
  label: string;
  category: Category;
}

export interface CheckState {
  [itemId: string]: boolean;
}

export interface DisabledState {
  [itemId: string]: boolean;
}

export interface StorageData {
  checks: CheckState;
  disabled: DisabledState;
  lastReset: string; // ISO date string
}
