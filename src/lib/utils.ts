import { RESET_HOUR_KST } from './constants';

/**
 * 다음 리셋 시간(오전 6시 KST)까지 남은 밀리초
 */
export function getTimeUntilReset(): number {
  const now = new Date();
  const kstOffset = 9 * 60; // KST = UTC+9
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const kstMinutes = utcMinutes + kstOffset;
  const kstHour = Math.floor((kstMinutes % 1440) / 60);

  // 다음 리셋까지 시간 계산
  let hoursUntilReset = RESET_HOUR_KST - kstHour;
  if (hoursUntilReset <= 0) {
    hoursUntilReset += 24;
  }

  const nextReset = new Date(now);
  nextReset.setHours(nextReset.getHours() + hoursUntilReset);
  nextReset.setMinutes(0, 0, 0);

  return nextReset.getTime() - now.getTime();
}

/**
 * 밀리초를 HH:MM:SS 형식으로 변환
 */
export function formatTime(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((n) => n.toString().padStart(2, '0'))
    .join(':');
}

/**
 * 오늘 리셋 기준 날짜 문자열 (YYYY-MM-DD)
 * 오전 6시 이전이면 어제 날짜 반환
 */
export function getTodayResetDate(): string {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  const kst = new Date(now.getTime() + kstOffset);

  // 오전 6시 이전이면 하루 빼기
  if (kst.getUTCHours() < RESET_HOUR_KST) {
    kst.setUTCDate(kst.getUTCDate() - 1);
  }

  return kst.toISOString().split('T')[0];
}
