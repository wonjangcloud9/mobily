'use client';

import { useState, useEffect } from 'react';
import { getTimeUntilReset, formatTime } from '@/lib/utils';

export function Timer() {
  const [timeLeft, setTimeLeft] = useState<string>('--:--:--');

  useEffect(() => {
    const update = () => {
      setTimeLeft(formatTime(getTimeUntilReset()));
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-500 mb-1">리셋까지 남은 시간</p>
      <p className="text-3xl font-mono font-bold text-gray-800">{timeLeft}</p>
    </div>
  );
}
