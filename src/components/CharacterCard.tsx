'use client';

import { useState, useRef, useEffect } from 'react';
import { Character } from '@/types';

interface CharacterCardProps {
  characters: Character[];
  activeCharacter: Character | null;
  canAddCharacter: boolean;
  onSelect: (id: string) => void;
  onAdd: (name: string) => boolean;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
  dailyProgress: { completed: number; total: number; percent: number };
  weeklyProgress: { completed: number; total: number; percent: number };
}

export function CharacterCard({
  characters,
  activeCharacter,
  canAddCharacter,
  onSelect,
  onAdd,
  onRemove,
  onRename,
  dailyProgress,
  weeklyProgress,
}: CharacterCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const currentIndex = characters.findIndex((c) => c.id === activeCharacter?.id);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onSelect(characters[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < characters.length - 1) {
      onSelect(characters[currentIndex + 1].id);
    }
  };

  const handleDoubleClick = () => {
    if (activeCharacter) {
      setEditName(activeCharacter.name);
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (activeCharacter && editName.trim()) {
      onRename(activeCharacter.id, editName.trim().slice(0, 10));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setIsEditing(false);
  };

  const initial = activeCharacter?.name?.charAt(0) || '?';

  return (
    <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-4 text-white shadow-lg">
      {/* 상단: 캐릭터 선택 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {/* 아바타 */}
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {initial}
          </div>

          {/* 이름 */}
          <div>
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={handleSave}
                onKeyDown={handleKeyDown}
                className="bg-white/20 rounded px-2 py-1 text-white placeholder-white/50 outline-none text-lg font-semibold w-32"
                maxLength={10}
              />
            ) : (
              <div
                className="text-lg font-semibold cursor-pointer"
                onDoubleClick={handleDoubleClick}
              >
                {activeCharacter?.name || '캐릭터'}
              </div>
            )}
            <div className="text-xs text-white/70">
              {currentIndex + 1} / {characters.length}
            </div>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="flex items-center gap-1">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= characters.length - 1}
            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/30 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          {canAddCharacter && (
            <button
              onClick={() => onAdd(`캐릭터 ${characters.length + 1}`)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors ml-1 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          )}
          {characters.length > 1 && (
            <button
              onClick={() => activeCharacter && onRemove(activeCharacter.id)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-400 transition-colors ml-1 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="space-y-2">
        {/* 일일 */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>일일 달성률</span>
            <span>{dailyProgress.completed}/{dailyProgress.total}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${dailyProgress.percent}%` }}
            />
          </div>
        </div>

        {/* 주간 */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>주간 달성률</span>
            <span>{weeklyProgress.completed}/{weeklyProgress.total}</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${weeklyProgress.percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
