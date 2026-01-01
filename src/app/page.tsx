'use client';

import { Timer } from '@/components/Timer';
import { Progress } from '@/components/Progress';
import { Checklist } from '@/components/Checklist';
import { Sidebar } from '@/components/Sidebar';
import { CharacterTabs } from '@/components/CharacterTabs';
import {
  useChecklist,
  getDailyProgress,
  getWeeklyProgress,
} from '@/hooks/useChecklist';
import { DAILY_ITEMS, WEEKLY_ITEMS } from '@/lib/constants';

export default function Home() {
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
        <div className="max-w-md mx-auto space-y-5">
          <header className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              모비노기 숙제 체커
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              오늘 할 것만 딱! 10초 안에 확인
            </p>
          </header>

          {/* 캐릭터 탭 */}
          <CharacterTabs
            characters={characters}
            activeCharacter={activeCharacter}
            canAddCharacter={canAddCharacter}
            onSelect={setActiveCharacter}
            onAdd={addCharacter}
            onRemove={removeCharacter}
            onRename={renameCharacter}
          />

          <Timer />

          <div className="grid grid-cols-2 gap-3">
            <Progress
              label="일일"
              completed={dailyProgress.completed}
              total={dailyProgress.total}
              percent={dailyProgress.percent}
              color="blue"
            />
            <Progress
              label="주간"
              completed={weeklyProgress.completed}
              total={weeklyProgress.total}
              percent={weeklyProgress.percent}
              color="purple"
            />
          </div>

          <div className="space-y-4 animate-slide-up" key={activeCharacter?.id}>
            <Checklist
              title="일일 콘텐츠"
              items={DAILY_ITEMS}
              checks={checks}
              disabled={disabled}
              onToggle={toggleCheck}
            />

            <Checklist
              title="주간 콘텐츠"
              items={WEEKLY_ITEMS}
              checks={checks}
              disabled={disabled}
              onToggle={toggleCheck}
            />
          </div>

          <footer className="text-center text-xs text-gray-400 pt-8 pb-4">
            <p>이 서비스는 특정 게임 또는 회사와 관련이 없습니다.</p>
          </footer>
        </div>
      </main>
    </>
  );
}
