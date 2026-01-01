'use client';

import { CheckItem, CheckState, Subcategory } from '@/types';
import { SUBCATEGORY_NAMES } from '@/lib/constants';

interface CheckItemCardProps {
  item: CheckItem;
  checks: CheckState;
  onToggle: (id: string, index?: number) => void;
}

// 서브카테고리별 태그 색상
const TAG_COLORS: Record<Subcategory, string> = {
  shop: 'bg-pink-100 text-pink-600',
  dungeon: 'bg-purple-100 text-purple-600',
  field: 'bg-green-100 text-green-600',
  mission: 'bg-blue-100 text-blue-600',
  boss: 'bg-red-100 text-red-600',
  abyss: 'bg-indigo-100 text-indigo-600',
  raid: 'bg-amber-100 text-amber-600',
  guild: 'bg-teal-100 text-teal-600',
  exchange: 'bg-cyan-100 text-cyan-600',
  'weekly-shop': 'bg-gray-100 text-gray-600',
};

export function CheckItemCard({ item, checks, onToggle }: CheckItemCardProps) {
  const value = checks[item.id];
  const isMulti = !!item.maxCount;
  const currentCount = typeof value === 'number' ? value : 0;
  const isComplete = isMulti
    ? currentCount >= (item.maxCount || 0)
    : !!value;

  return (
    <div
      className={`
        bg-white rounded-xl p-3 shadow-sm border transition-all duration-200
        ${isComplete ? 'border-green-200 bg-green-50' : 'border-gray-100 hover:border-gray-200'}
      `}
    >
      <div className="flex items-center gap-3">
        {/* 원형 플레이스홀더 아이콘 */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />

        {/* 콘텐츠 */}
        <div className="flex-1 min-w-0">
          <div className={`font-medium ${isComplete ? 'text-gray-400' : 'text-gray-800'}`}>
            {item.label}
          </div>
          <div className="flex flex-wrap gap-1 mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${TAG_COLORS[item.subcategory]}`}>
              {SUBCATEGORY_NAMES[item.subcategory]}
            </span>
            {item.note && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                {item.note}
              </span>
            )}
            {isMulti && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                {currentCount}/{item.maxCount}
              </span>
            )}
          </div>
        </div>

        {/* 체크박스 */}
        {isMulti ? (
          <div className="flex gap-1 flex-shrink-0">
            {Array.from({ length: item.maxCount || 0 }).map((_, index) => (
              <button
                key={index}
                onClick={() => onToggle(item.id, index)}
                className={`
                  w-6 h-6 rounded-full border-2 transition-all duration-150
                  flex items-center justify-center cursor-pointer
                  ${
                    index < currentCount
                      ? 'bg-orange-500 border-orange-500 text-white'
                      : 'border-gray-300 hover:border-orange-300'
                  }
                `}
              >
                {index < currentCount && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => onToggle(item.id)}
            className={`
              w-8 h-8 rounded-full border-2 transition-all duration-150
              flex items-center justify-center flex-shrink-0 cursor-pointer
              ${
                isComplete
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-300'
              }
            `}
          >
            {isComplete && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
