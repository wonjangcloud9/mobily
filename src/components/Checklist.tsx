'use client';

import { CheckItem, CheckState, DisabledState } from '@/types';

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
  const activeItems = items.filter((item) => !disabled[item.id]);

  if (activeItems.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <h2 className="px-4 py-3 bg-gray-50 font-semibold text-gray-700 border-b border-gray-200">
        {title}
      </h2>
      <ul>
        {activeItems.map((item) => (
          <li key={item.id} className="border-b border-gray-100 last:border-0">
            <label className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={checks[item.id] || false}
                onChange={() => onToggle(item.id)}
                className="w-5 h-5 text-blue-500 rounded border-gray-300 focus:ring-blue-500"
              />
              <span
                className={`ml-3 ${
                  checks[item.id] ? 'line-through text-gray-400' : 'text-gray-700'
                }`}
              >
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
