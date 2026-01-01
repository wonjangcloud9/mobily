'use client';

import { Category, CheckState, DisabledState, Subcategory } from '@/types';
import { CheckItemCard } from './CheckItemCard';
import {
  DAILY_ITEMS,
  WEEKLY_ITEMS,
  EXCHANGE_ITEMS,
  SHOP_ITEMS,
  SUBCATEGORY_NAMES,
} from '@/lib/constants';

interface ChecklistProps {
  activeTab: Category;
  checks: CheckState;
  disabled: DisabledState;
  onToggle: (id: string, index?: number) => void;
}

export function Checklist({
  activeTab,
  checks,
  disabled,
  onToggle,
}: ChecklistProps) {
  // 탭에 따른 아이템 선택
  const items = (() => {
    switch (activeTab) {
      case 'daily':
        return DAILY_ITEMS;
      case 'weekly':
        return WEEKLY_ITEMS;
      case 'exchange':
        return EXCHANGE_ITEMS;
      case 'shop':
        return SHOP_ITEMS;
      default:
        return [];
    }
  })();

  const activeItems = items.filter((item) => !disabled[item.id]);

  if (activeItems.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        {activeTab === 'shop' ? (
          <p>주간상점 콘텐츠가 곧 추가됩니다</p>
        ) : (
          <p>표시할 항목이 없습니다</p>
        )}
      </div>
    );
  }

  // subcategory별로 그룹화
  const grouped = activeItems.reduce(
    (acc, item) => {
      const key = item.subcategory;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<Subcategory, typeof activeItems>
  );

  const subcategories = Object.keys(grouped) as Subcategory[];

  return (
    <div className="space-y-4">
      {subcategories.map((subcat) => (
        <div key={subcat}>
          {/* 섹션 헤더 */}
          <div className="text-sm font-semibold text-gray-500 mb-2 px-1">
            {SUBCATEGORY_NAMES[subcat]}
          </div>

          {/* 아이템 목록 */}
          <div className="space-y-2">
            {grouped[subcat].map((item) => (
              <CheckItemCard
                key={item.id}
                item={item}
                checks={checks}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
