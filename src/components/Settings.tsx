'use client';

import { useState } from 'react';
import { CheckItem, DisabledState } from '@/types';

interface SettingsProps {
  items: CheckItem[];
  disabled: DisabledState;
  onToggleDisabled: (id: string) => void;
  onReset: () => void;
}

export function Settings({
  items,
  disabled,
  onToggleDisabled,
  onReset,
}: SettingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
      >
        <span>{isOpen ? '설정 닫기' : '설정 열기'}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              표시할 항목 선택
            </h3>
            <div className="space-y-2">
              {items.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!disabled[item.id]}
                    onChange={() => onToggleDisabled(item.id)}
                    className="w-4 h-4 text-blue-500 rounded border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={onReset}
            className="w-full py-2 text-sm text-red-500 hover:text-red-600 border border-red-200 rounded hover:bg-red-50"
          >
            모든 체크 초기화
          </button>
        </div>
      )}
    </div>
  );
}
