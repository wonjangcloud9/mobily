'use client';

import { useState, useEffect } from 'react';
import {
  getTimeUntilReset,
  getTimeUntilWeeklyReset,
  formatTime,
  formatTimeWithDays,
} from '@/lib/utils';

export function Timer() {
  const [dailyTime, setDailyTime] = useState<string>('--:--:--');
  const [weeklyDays, setWeeklyDays] = useState<number>(0);
  const [weeklyTime, setWeeklyTime] = useState<string>('--:--:--');
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const update = () => {
      const dailyMs = getTimeUntilReset();
      const weeklyMs = getTimeUntilWeeklyReset();

      setDailyTime(formatTime(dailyMs));

      const weekly = formatTimeWithDays(weeklyMs);
      setWeeklyDays(weekly.days);
      setWeeklyTime(weekly.time);

      // 1시간 미만이면 펄스 애니메이션
      if (dailyMs < 3600000) {
        setPulse(true);
      } else {
        setPulse(false);
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* 일일 리셋 */}
      <div
        className={`relative overflow-hidden text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100
          rounded-xl border border-blue-200/50 shadow-sm
          transition-all duration-300 hover:shadow-md hover:scale-[1.02]
          ${pulse ? 'animate-pulse-soft' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
          -translate-x-full animate-shimmer" />
        <p className="text-xs font-medium text-blue-600 mb-1.5 tracking-wide">
          일일 리셋
        </p>
        <p className="text-2xl font-mono font-bold text-blue-700 tabular-nums">
          {dailyTime}
        </p>
      </div>

      {/* 주간 리셋 */}
      <div
        className="relative overflow-hidden text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100
          rounded-xl border border-purple-200/50 shadow-sm
          transition-all duration-300 hover:shadow-md hover:scale-[1.02]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
          -translate-x-full animate-shimmer" />
        <p className="text-xs font-medium text-purple-600 mb-1.5 tracking-wide">
          주간 리셋
        </p>
        <div className="flex items-baseline justify-center gap-1">
          {weeklyDays > 0 && (
            <span className="text-lg font-bold text-purple-700">
              {weeklyDays}
              <span className="text-sm font-medium">일</span>
            </span>
          )}
          <p className="text-2xl font-mono font-bold text-purple-700 tabular-nums">
            {weeklyTime}
          </p>
        </div>
      </div>
    </div>
  );
}
