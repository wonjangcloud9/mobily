'use client';

import { Category } from '@/types';

interface TabBarProps {
  activeTab: Category;
  onTabChange: (tab: Category) => void;
}

const TABS: { key: Category; label: string }[] = [
  { key: 'daily', label: '일일' },
  { key: 'weekly', label: '주간' },
  { key: 'exchange', label: '물물교환' },
  { key: 'shop', label: '주간상점' },
];

export function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex border-b border-gray-200">
      {TABS.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`
            flex-1 py-3 text-sm font-medium transition-colors relative cursor-pointer
            ${
              activeTab === tab.key
                ? 'text-orange-600'
                : 'text-gray-500 hover:text-gray-700'
            }
          `}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
          )}
        </button>
      ))}
    </div>
  );
}
