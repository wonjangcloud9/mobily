'use client';

import { Timer } from '@/components/Timer';
import { Progress } from '@/components/Progress';
import { Checklist } from '@/components/Checklist';
import { Settings } from '@/components/Settings';
import { useChecklist, getProgress } from '@/hooks/useChecklist';
import { DAILY_ITEMS, WEEKLY_ITEMS, ALL_ITEMS } from '@/lib/constants';

export default function Home() {
  const { checks, disabled, toggleCheck, toggleDisabled, resetAll } =
    useChecklist();
  const progress = getProgress(checks, disabled);

  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            데일리 체크 도우미
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            오늘 할 것만 딱! 10초 안에 확인
          </p>
        </header>

        <Timer />

        <Progress
          completed={progress.completed}
          total={progress.total}
          percent={progress.percent}
        />

        <div className="space-y-4">
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

        <Settings
          items={ALL_ITEMS}
          disabled={disabled}
          onToggleDisabled={toggleDisabled}
          onReset={resetAll}
        />

        <footer className="text-center text-xs text-gray-400 pt-4">
          <p>이 서비스는 특정 게임 또는 회사와 관련이 없습니다.</p>
        </footer>
      </div>
    </main>
  );
}
