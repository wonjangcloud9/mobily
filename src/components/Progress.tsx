'use client';

interface ProgressProps {
  completed: number;
  total: number;
  percent: number;
}

export function Progress({ completed, total, percent }: ProgressProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">오늘 진행률</span>
        <span className="text-sm font-medium text-gray-700">
          {completed}/{total}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-right text-sm text-gray-600 mt-1">{percent}%</p>
    </div>
  );
}
