'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckState, DisabledState, StorageData } from '@/types';
import { STORAGE_KEY, ALL_ITEMS } from '@/lib/constants';
import { getTodayResetDate } from '@/lib/utils';

interface UseChecklistReturn {
  checks: CheckState;
  disabled: DisabledState;
  toggleCheck: (id: string) => void;
  toggleDisabled: (id: string) => void;
  resetAll: () => void;
}

const getInitialState = (): StorageData => ({
  checks: {},
  disabled: {},
  lastReset: getTodayResetDate(),
});

export function useChecklist(): UseChecklistReturn {
  const [checks, setChecks] = useState<CheckState>({});
  const [disabled, setDisabled] = useState<DisabledState>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // localStorage에서 불러오기 + 리셋 체크
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const today = getTodayResetDate();

    if (stored) {
      try {
        const data: StorageData = JSON.parse(stored);
        // 날짜가 바뀌었으면 체크 상태 초기화
        if (data.lastReset !== today) {
          setChecks({});
          setDisabled(data.disabled || {});
        } else {
          setChecks(data.checks || {});
          setDisabled(data.disabled || {});
        }
      } catch {
        setChecks({});
        setDisabled({});
      }
    }
    setIsLoaded(true);
  }, []);

  // 상태 변경 시 localStorage에 저장
  useEffect(() => {
    if (!isLoaded) return;

    const data: StorageData = {
      checks,
      disabled,
      lastReset: getTodayResetDate(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [checks, disabled, isLoaded]);

  const toggleCheck = useCallback((id: string) => {
    setChecks((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const toggleDisabled = useCallback((id: string) => {
    setDisabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const resetAll = useCallback(() => {
    setChecks({});
  }, []);

  return { checks, disabled, toggleCheck, toggleDisabled, resetAll };
}

/**
 * 활성화된 항목 중 완료된 비율 계산
 */
export function getProgress(
  checks: CheckState,
  disabled: DisabledState
): { completed: number; total: number; percent: number } {
  const activeItems = ALL_ITEMS.filter((item) => !disabled[item.id]);
  const total = activeItems.length;
  const completed = activeItems.filter((item) => checks[item.id]).length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percent };
}
