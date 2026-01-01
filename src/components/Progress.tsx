'use client';

interface ProgressProps {
  label: string;
  completed: number;
  total: number;
  percent: number;
  color?: 'blue' | 'purple';
}

const colorClasses = {
  blue: {
    bg: 'from-blue-50 to-blue-100',
    border: 'border-blue-200/50',
    bar: 'from-blue-400 to-blue-600',
    text: 'text-blue-700',
    label: 'text-blue-600',
  },
  purple: {
    bg: 'from-purple-50 to-purple-100',
    border: 'border-purple-200/50',
    bar: 'from-purple-400 to-purple-600',
    text: 'text-purple-700',
    label: 'text-purple-600',
  },
};

export function Progress({
  label,
  completed,
  total,
  percent,
  color = 'blue',
}: ProgressProps) {
  const colors = colorClasses[color];
  const isComplete = percent === 100;

  return (
    <div
      className={`p-3 bg-gradient-to-br ${colors.bg} rounded-xl border ${colors.border}
        shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`text-xs font-semibold ${colors.label} tracking-wide`}>
          {label}
        </span>
        <span className={`text-xs font-bold ${colors.text} tabular-nums`}>
          {completed}/{total}
        </span>
      </div>
      <div className="w-full bg-white/60 rounded-full h-2.5 overflow-hidden shadow-inner">
        <div
          className={`bg-gradient-to-r ${colors.bar} h-full rounded-full
            transition-all duration-500 ease-out relative
            ${isComplete ? 'animate-pulse-soft' : ''}`}
          style={{ width: `${percent}%` }}
        >
          {percent > 0 && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
          )}
        </div>
      </div>
      <div className="flex justify-end mt-1.5">
        <span
          className={`text-sm font-bold ${colors.text} tabular-nums
            ${isComplete ? 'animate-bounce-in' : ''}`}
        >
          {percent}%
        </span>
      </div>
    </div>
  );
}
