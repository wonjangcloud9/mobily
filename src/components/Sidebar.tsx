'use client';

import { useState } from 'react';
import { CheckItem, DisabledState, Subcategory } from '@/types';
import { SUBCATEGORY_NAMES, DAILY_ITEMS, WEEKLY_ITEMS } from '@/lib/constants';

interface SidebarProps {
  disabled: DisabledState;
  onToggleDisabled: (id: string) => void;
  onReset: () => void;
}

export function Sidebar({ disabled, onToggleDisabled, onReset }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const groupBySubcategory = (items: CheckItem[]) => {
    return items.reduce(
      (acc, item) => {
        if (!acc[item.subcategory]) acc[item.subcategory] = [];
        acc[item.subcategory].push(item);
        return acc;
      },
      {} as Record<Subcategory, CheckItem[]>
    );
  };

  const dailyGrouped = groupBySubcategory(DAILY_ITEMS);
  const weeklyGrouped = groupBySubcategory(WEEKLY_ITEMS);

  return (
    <>
      {/* 토글 버튼 - 고정 */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 z-40 w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer
          flex items-center justify-center text-gray-600 hover:text-gray-900
          hover:shadow-xl transition-all duration-200 border border-gray-200
          hover:scale-110 hover:rotate-45 active:scale-95"
        aria-label="설정 열기"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 transition-opacity cursor-pointer animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 사이드바 */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50
          transform transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
          <h2 className="font-semibold text-gray-800">콘텐츠 설정</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer
              hover:bg-gray-100 text-gray-500 transition-all duration-200
              hover:scale-110 hover:rotate-90 active:scale-90"
          >
            ✕
          </button>
        </div>

        {/* 콘텐츠 */}
        <div className="overflow-y-auto h-[calc(100%-120px)] p-4 space-y-6">
          {/* 일일 콘텐츠 */}
          <div>
            <h3 className="text-sm font-medium text-blue-600 mb-3">
              일일 콘텐츠
            </h3>
            {Object.entries(dailyGrouped).map(([subcat, items]) => (
              <div key={subcat} className="mb-4">
                <p className="text-xs text-gray-400 mb-2">
                  {SUBCATEGORY_NAMES[subcat as Subcategory]}
                </p>
                <div className="space-y-1">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between py-1.5 px-2 rounded
                        hover:bg-blue-50/50 cursor-pointer group transition-colors duration-150"
                    >
                      <span
                        className={`text-sm transition-colors duration-200 ${
                          disabled[item.id] ? 'text-gray-400' : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </span>
                      <button
                        onClick={() => onToggleDisabled(item.id)}
                        className={`w-10 h-6 rounded-full transition-all duration-200 relative cursor-pointer
                          hover:shadow-md active:scale-95
                          ${disabled[item.id] ? 'bg-gray-300' : 'bg-gradient-to-r from-blue-400 to-blue-500'}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md
                            transition-all duration-200 ease-out
                            ${disabled[item.id] ? 'left-1' : 'left-5'}`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 주간 콘텐츠 */}
          <div>
            <h3 className="text-sm font-medium text-purple-600 mb-3">
              주간 콘텐츠
            </h3>
            {Object.entries(weeklyGrouped).map(([subcat, items]) => (
              <div key={subcat} className="mb-4">
                <p className="text-xs text-gray-400 mb-2">
                  {SUBCATEGORY_NAMES[subcat as Subcategory]}
                </p>
                <div className="space-y-1">
                  {items.map((item) => (
                    <label
                      key={item.id}
                      className="flex items-center justify-between py-1.5 px-2 rounded
                        hover:bg-purple-50/50 cursor-pointer group transition-colors duration-150"
                    >
                      <span
                        className={`text-sm transition-colors duration-200 ${
                          disabled[item.id] ? 'text-gray-400' : 'text-gray-700'
                        }`}
                      >
                        {item.label}
                      </span>
                      <button
                        onClick={() => onToggleDisabled(item.id)}
                        className={`w-10 h-6 rounded-full transition-all duration-200 relative cursor-pointer
                          hover:shadow-md active:scale-95
                          ${disabled[item.id] ? 'bg-gray-300' : 'bg-gradient-to-r from-purple-400 to-purple-500'}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md
                            transition-all duration-200 ease-out
                            ${disabled[item.id] ? 'left-1' : 'left-5'}`}
                        />
                      </button>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 푸터 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-gradient-to-t from-white to-gray-50/50">
          <button
            onClick={() => {
              if (confirm('모든 체크를 초기화하시겠습니까?')) {
                onReset();
              }
            }}
            className="w-full py-2.5 text-sm text-red-500 hover:text-white cursor-pointer
              border border-red-200 rounded-lg hover:bg-red-500 transition-all duration-200
              hover:border-red-500 hover:shadow-lg hover:shadow-red-200/50 active:scale-[0.98]"
          >
            모든 체크 초기화
          </button>
        </div>
      </div>
    </>
  );
}
