'use client';

import { useState } from 'react';
import { CheckItem, CheckState, DisabledState, Subcategory } from '@/types';
import { SUBCATEGORY_NAMES } from '@/lib/constants';

interface ChecklistProps {
  title: string;
  items: CheckItem[];
  checks: CheckState;
  disabled: DisabledState;
  onToggle: (id: string) => void;
}

export function Checklist({
  title,
  items,
  checks,
  disabled,
  onToggle,
}: ChecklistProps) {
  const [justChecked, setJustChecked] = useState<string | null>(null);
  const activeItems = items.filter((item) => !disabled[item.id]);

  if (activeItems.length === 0) {
    return null;
  }

  const handleToggle = (id: string) => {
    onToggle(id);
    if (!checks[id]) {
      setJustChecked(id);
      setTimeout(() => setJustChecked(null), 300);
    }
  };

  // subcategory별로 그룹화
  const grouped = activeItems.reduce(
    (acc, item) => {
      const key = item.subcategory;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<Subcategory, CheckItem[]>
  );

  const subcategories = Object.keys(grouped) as Subcategory[];
  const completedCount = activeItems.filter((item) => checks[item.id]).length;
  const isAllComplete = completedCount === activeItems.length;

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm overflow-hidden
        transition-all duration-300 hover:shadow-md
        ${isAllComplete ? 'border-green-200 bg-green-50/30' : 'border-gray-200'}`}
    >
      {/* 헤더 */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between
          ${isAllComplete ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
      >
        <h2
          className={`font-semibold ${isAllComplete ? 'text-green-700' : 'text-gray-700'}`}
        >
          {title}
        </h2>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full
            ${
              isAllComplete
                ? 'bg-green-200 text-green-700'
                : 'bg-gray-200 text-gray-600'
            }`}
        >
          {completedCount}/{activeItems.length}
        </span>
      </div>

      {/* 콘텐츠 */}
      {subcategories.map((subcat, subcatIndex) => (
        <div key={subcat}>
          <div
            className="px-4 py-2 bg-gradient-to-r from-gray-50 to-transparent
              text-xs font-semibold text-gray-500 uppercase tracking-wider"
          >
            {SUBCATEGORY_NAMES[subcat]}
          </div>
          <ul>
            {grouped[subcat].map((item, itemIndex) => {
              const isChecked = checks[item.id] || false;
              const isJustChecked = justChecked === item.id;

              return (
                <li
                  key={item.id}
                  className="border-b border-gray-100 last:border-0"
                  style={{
                    animationDelay: `${(subcatIndex * 3 + itemIndex) * 30}ms`,
                  }}
                >
                  <label
                    className={`flex items-center px-4 py-3.5 cursor-pointer
                      transition-all duration-200 select-none
                      ${isChecked ? 'bg-gray-50/50' : 'hover:bg-blue-50/50'}
                      active:scale-[0.99]`}
                  >
                    <div
                      className={`shrink-0 transition-transform duration-200
                        ${isJustChecked ? 'animate-check-pop' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggle(item.id)}
                        className="cursor-pointer"
                      />
                    </div>
                    <span
                      className={`ml-3 flex-1 transition-all duration-200 ${
                        isChecked
                          ? 'line-through text-gray-400'
                          : 'text-gray-700'
                      }`}
                    >
                      {item.label}
                    </span>
                    {item.note && (
                      <span
                        className={`ml-2 text-xs px-2 py-0.5 rounded-full shrink-0
                          transition-colors duration-200
                          ${
                            isChecked
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-blue-100 text-blue-600'
                          }`}
                      >
                        {item.note}
                      </span>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
