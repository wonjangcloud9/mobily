'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CheckState,
  DisabledState,
  StorageData,
  Character,
  CharacterData,
  MAX_CHARACTERS,
} from '@/types';
import {
  STORAGE_KEY,
  ALL_ITEMS,
  DAILY_ITEMS,
  WEEKLY_ITEMS,
  EXCHANGE_ITEMS,
} from '@/lib/constants';
import { getTodayResetDate, getWeeklyResetDate } from '@/lib/utils';

interface UseChecklistReturn {
  // 캐릭터 관리
  characters: Character[];
  activeCharacter: Character | null;
  addCharacter: (name: string) => boolean;
  removeCharacter: (id: string) => void;
  renameCharacter: (id: string, name: string) => void;
  setActiveCharacter: (id: string) => void;
  canAddCharacter: boolean;

  // 체크리스트
  checks: CheckState;
  disabled: DisabledState;
  toggleCheck: (id: string, index?: number) => void; // index: 다중 체크용
  toggleDisabled: (id: string) => void;
  resetAll: () => void;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

function createEmptyCharacterData(): CharacterData {
  return {
    checks: {},
    disabled: {},
    lastReset: getTodayResetDate(),
    lastWeeklyReset: getWeeklyResetDate(),
  };
}

function applyResets(data: CharacterData): CharacterData {
  const today = getTodayResetDate();
  const thisWeek = getWeeklyResetDate();
  let newChecks = { ...(data.checks || {}) };

  // 일일 리셋 (일일 + 물물교환)
  if (data.lastReset !== today) {
    DAILY_ITEMS.forEach((item) => {
      delete newChecks[item.id];
    });
    EXCHANGE_ITEMS.forEach((item) => {
      delete newChecks[item.id];
    });
  }

  // 주간 리셋
  if (data.lastWeeklyReset !== thisWeek) {
    WEEKLY_ITEMS.forEach((item) => {
      delete newChecks[item.id];
    });
  }

  return {
    ...data,
    checks: newChecks,
    lastReset: today,
    lastWeeklyReset: thisWeek,
  };
}

export function useChecklist(): UseChecklistReturn {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [activeCharacterId, setActiveCharacterId] = useState<string>('');
  const [characterData, setCharacterData] = useState<{
    [id: string]: CharacterData;
  }>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 불러오기
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const data: StorageData = JSON.parse(stored);

        // 기존 데이터 마이그레이션 (캐릭터 없는 경우)
        if (!data.characters || data.characters.length === 0) {
          const defaultChar: Character = { id: generateId(), name: '캐릭터 1' };
          const migratedData: CharacterData = {
            checks: (data as any).checks || {},
            disabled: (data as any).disabled || {},
            lastReset: (data as any).lastReset || getTodayResetDate(),
            lastWeeklyReset:
              (data as any).lastWeeklyReset || getWeeklyResetDate(),
          };

          setCharacters([defaultChar]);
          setActiveCharacterId(defaultChar.id);
          setCharacterData({ [defaultChar.id]: applyResets(migratedData) });
        } else {
          // 각 캐릭터 데이터에 리셋 적용
          const resetData: { [id: string]: CharacterData } = {};
          Object.keys(data.characterData || {}).forEach((id) => {
            resetData[id] = applyResets(data.characterData[id]);
          });

          setCharacters(data.characters);
          setActiveCharacterId(data.activeCharacterId || data.characters[0]?.id);
          setCharacterData(resetData);
        }
      } catch {
        // 초기화
        const defaultChar: Character = { id: generateId(), name: '캐릭터 1' };
        setCharacters([defaultChar]);
        setActiveCharacterId(defaultChar.id);
        setCharacterData({ [defaultChar.id]: createEmptyCharacterData() });
      }
    } else {
      // 새로운 사용자
      const defaultChar: Character = { id: generateId(), name: '캐릭터 1' };
      setCharacters([defaultChar]);
      setActiveCharacterId(defaultChar.id);
      setCharacterData({ [defaultChar.id]: createEmptyCharacterData() });
    }

    setIsLoaded(true);
  }, []);

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    if (!isLoaded) return;

    const data: StorageData = {
      characters,
      activeCharacterId,
      characterData,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [characters, activeCharacterId, characterData, isLoaded]);

  // 현재 활성 캐릭터
  const activeCharacter = characters.find((c) => c.id === activeCharacterId) || null;
  const currentData = characterData[activeCharacterId] || createEmptyCharacterData();

  // 캐릭터 추가
  const addCharacter = useCallback(
    (name: string): boolean => {
      if (characters.length >= MAX_CHARACTERS) return false;
      if (!name.trim()) return false;

      const newChar: Character = { id: generateId(), name: name.trim() };
      setCharacters((prev) => [...prev, newChar]);
      setCharacterData((prev) => ({
        ...prev,
        [newChar.id]: createEmptyCharacterData(),
      }));
      setActiveCharacterId(newChar.id);
      return true;
    },
    [characters.length]
  );

  // 캐릭터 삭제
  const removeCharacter = useCallback(
    (id: string) => {
      if (characters.length <= 1) return; // 최소 1개 유지

      setCharacters((prev) => prev.filter((c) => c.id !== id));
      setCharacterData((prev) => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });

      // 삭제된 캐릭터가 활성이면 다른 캐릭터로 전환
      if (activeCharacterId === id) {
        const remaining = characters.filter((c) => c.id !== id);
        if (remaining.length > 0) {
          setActiveCharacterId(remaining[0].id);
        }
      }
    },
    [characters, activeCharacterId]
  );

  // 캐릭터 이름 변경
  const renameCharacter = useCallback((id: string, name: string) => {
    if (!name.trim()) return;
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: name.trim() } : c))
    );
  }, []);

  // 활성 캐릭터 변경
  const setActiveCharacter = useCallback((id: string) => {
    setActiveCharacterId(id);
  }, []);

  // 체크 토글 (index: 다중 체크용)
  const toggleCheck = useCallback(
    (itemId: string, index?: number) => {
      setCharacterData((prev) => {
        const currentChecks = prev[activeCharacterId]?.checks || {};
        const currentValue = currentChecks[itemId];

        let newValue: boolean | number;

        if (index !== undefined) {
          // 다중 체크: 해당 인덱스까지 완료 (0부터 시작)
          const currentCount = typeof currentValue === 'number' ? currentValue : 0;
          // 이미 해당 인덱스가 체크되어 있으면 그 인덱스까지만, 아니면 인덱스+1까지
          newValue = currentCount > index ? index : index + 1;
          if (newValue === 0) newValue = 0; // 모두 해제 시 0
        } else {
          // 단일 체크
          newValue = !currentValue;
        }

        return {
          ...prev,
          [activeCharacterId]: {
            ...prev[activeCharacterId],
            checks: {
              ...currentChecks,
              [itemId]: newValue,
            },
          },
        };
      });
    },
    [activeCharacterId]
  );

  // 비활성화 토글
  const toggleDisabled = useCallback(
    (itemId: string) => {
      setCharacterData((prev) => ({
        ...prev,
        [activeCharacterId]: {
          ...prev[activeCharacterId],
          disabled: {
            ...prev[activeCharacterId]?.disabled,
            [itemId]: !prev[activeCharacterId]?.disabled?.[itemId],
          },
        },
      }));
    },
    [activeCharacterId]
  );

  // 전체 초기화
  const resetAll = useCallback(() => {
    setCharacterData((prev) => ({
      ...prev,
      [activeCharacterId]: {
        ...prev[activeCharacterId],
        checks: {},
      },
    }));
  }, [activeCharacterId]);

  return {
    characters,
    activeCharacter,
    addCharacter,
    removeCharacter,
    renameCharacter,
    setActiveCharacter,
    canAddCharacter: characters.length < MAX_CHARACTERS,

    checks: currentData.checks,
    disabled: currentData.disabled,
    toggleCheck,
    toggleDisabled,
    resetAll,
  };
}

/**
 * 아이템의 완료 여부 체크 (maxCount 고려)
 */
function isItemComplete(
  item: { id: string; maxCount?: number },
  checks: CheckState
): boolean {
  const value = checks[item.id];
  if (item.maxCount) {
    return typeof value === 'number' && value >= item.maxCount;
  }
  return !!value;
}

/**
 * 일일/주간/물물교환 별도 진행률 계산
 */
export function getDailyProgress(
  checks: CheckState,
  disabled: DisabledState
): { completed: number; total: number; percent: number } {
  const activeItems = DAILY_ITEMS.filter((item) => !disabled[item.id]);
  const total = activeItems.length;
  const completed = activeItems.filter((item) => isItemComplete(item, checks)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent };
}

export function getWeeklyProgress(
  checks: CheckState,
  disabled: DisabledState
): { completed: number; total: number; percent: number } {
  const activeItems = WEEKLY_ITEMS.filter((item) => !disabled[item.id]);
  const total = activeItems.length;
  const completed = activeItems.filter((item) => isItemComplete(item, checks)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent };
}

export function getExchangeProgress(
  checks: CheckState,
  disabled: DisabledState
): { completed: number; total: number; percent: number } {
  const activeItems = EXCHANGE_ITEMS.filter((item) => !disabled[item.id]);
  const total = activeItems.length;
  const completed = activeItems.filter((item) => isItemComplete(item, checks)).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent };
}
