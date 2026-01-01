'use client';

import { useState } from 'react';
import { Timer } from '@/components/Timer';
import { Checklist } from '@/components/Checklist';
import { Sidebar } from '@/components/Sidebar';
import { CharacterCard } from '@/components/CharacterCard';
import { TabBar } from '@/components/TabBar';
import {
  useChecklist,
  getDailyProgress,
  getWeeklyProgress,
} from '@/hooks/useChecklist';
import { Category } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Category>('daily');

  const {
    characters,
    activeCharacter,
    canAddCharacter,
    addCharacter,
    removeCharacter,
    renameCharacter,
    setActiveCharacter,
    checks,
    disabled,
    toggleCheck,
    toggleDisabled,
    resetAll,
  } = useChecklist();

  const dailyProgress = getDailyProgress(checks, disabled);
  const weeklyProgress = getWeeklyProgress(checks, disabled);

  return (
    <>
      <Sidebar
        disabled={disabled}
        onToggleDisabled={toggleDisabled}
        onReset={resetAll}
      />

      <main className="min-h-screen py-6 px-4">
        <div className="max-w-md mx-auto space-y-4">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">모빌리</h1>
            <p className="text-sm text-gray-500 mt-1">
              마비노기 모바일 일일 숙제 체커
            </p>
          </header>

          {/* 캐릭터 카드 */}
          <CharacterCard
            characters={characters}
            activeCharacter={activeCharacter}
            canAddCharacter={canAddCharacter}
            onSelect={setActiveCharacter}
            onAdd={addCharacter}
            onRemove={removeCharacter}
            onRename={renameCharacter}
            dailyProgress={dailyProgress}
            weeklyProgress={weeklyProgress}
          />

          {/* 타이머 */}
          <Timer />

          {/* 탭바 */}
          <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* 체크리스트 */}
          <div className="animate-slide-up" key={`${activeCharacter?.id}-${activeTab}`}>
            <Checklist
              activeTab={activeTab}
              checks={checks}
              disabled={disabled}
              onToggle={toggleCheck}
            />
          </div>
        </div>
      </main>
    </>
  );
}
