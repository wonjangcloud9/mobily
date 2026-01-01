import { RESET_HOUR_KST } from './constants';

/**
 * 현재 KST 시간 구하기
 */
function getKSTDate(): Date {
  const now = new Date();
  const kstOffset = 9 * 60 * 60 * 1000;
  return new Date(now.getTime() + kstOffset);
}

/**
 * 다음 일일 리셋 시간(오전 6시 KST)까지 남은 밀리초
 */
export function getTimeUntilReset(): number {
  const now = new Date();
  const kst = getKSTDate();
  const kstHour = kst.getUTCHours();

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
 * 밀리초를 D일 HH:MM:SS 형식으로 변환 (24시간 이상일 때)
 */
export function formatTimeWithDays(ms: number): { days: number; time: string } {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const time = [hours, minutes, seconds]
    .map((n) => n.toString().padStart(2, '0'))
    .join(':');

  return { days, time };
}

/**
 * 오늘 리셋 기준 날짜 문자열 (YYYY-MM-DD)
 * 오전 6시 이전이면 어제 날짜 반환
 */
export function getTodayResetDate(): string {
  const kst = getKSTDate();

  if (kst.getUTCHours() < RESET_HOUR_KST) {
    kst.setUTCDate(kst.getUTCDate() - 1);
  }

  return kst.toISOString().split('T')[0];
}

/**
 * 이번 주 리셋 기준 날짜 문자열 (YYYY-MM-DD)
 * 월요일 오전 6시 기준
 */
export function getWeeklyResetDate(): string {
  const kst = getKSTDate();

  // 오전 6시 이전이면 하루 빼기
  if (kst.getUTCHours() < RESET_HOUR_KST) {
    kst.setUTCDate(kst.getUTCDate() - 1);
  }

  // 월요일(1)을 기준으로 해당 주의 월요일 찾기
  const dayOfWeek = kst.getUTCDay(); // 0=일, 1=월, ..., 6=토
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  kst.setUTCDate(kst.getUTCDate() - daysFromMonday);

  return kst.toISOString().split('T')[0];
}

/**
 * 다음 주간 리셋(월요일 오전 6시 KST)까지 남은 밀리초
 */
export function getTimeUntilWeeklyReset(): number {
  const now = new Date();
  const kst = getKSTDate();

  // 현재 요일 (0=일, 1=월, ..., 6=토)
  const dayOfWeek = kst.getUTCDay();
  const kstHour = kst.getUTCHours();

  // 다음 월요일까지 일수 계산
  let daysUntilMonday = (8 - dayOfWeek) % 7; // 다음 월요일
  if (daysUntilMonday === 0 && kstHour >= RESET_HOUR_KST) {
    daysUntilMonday = 7; // 이미 이번 주 월요일 리셋 지남
  }

  // 월요일 오전 6시까지 시간
  let hoursUntilReset = RESET_HOUR_KST - kstHour + daysUntilMonday * 24;
  if (hoursUntilReset <= 0) {
    hoursUntilReset += 7 * 24;
  }

  const nextReset = new Date(now);
  nextReset.setHours(nextReset.getHours() + hoursUntilReset);
  nextReset.setMinutes(0, 0, 0);

  return nextReset.getTime() - now.getTime();
}
