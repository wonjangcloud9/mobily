'use client';

import { useState, useRef, useEffect } from 'react';
import { Character, MAX_CHARACTERS } from '@/types';

interface CharacterTabsProps {
  characters: Character[];
  activeCharacter: Character | null;
  canAddCharacter: boolean;
  onSelect: (id: string) => void;
  onAdd: (name: string) => boolean;
  onRemove: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function CharacterTabs({
  characters,
  activeCharacter,
  canAddCharacter,
  onSelect,
  onAdd,
  onRemove,
  onRename,
}: CharacterTabsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingId]);

  const handleAdd = () => {
    if (newName.trim()) {
      const success = onAdd(newName.trim());
      if (success) {
        setNewName('');
        setIsAdding(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewName('');
    }
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      if (editName.trim()) {
        onRename(id, editName.trim());
      }
      setEditingId(null);
    } else if (e.key === 'Escape') {
      setEditingId(null);
    }
  };

  const startEditing = (char: Character) => {
    setEditingId(char.id);
    setEditName(char.name);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {characters.map((char) => (
          <div
            key={char.id}
            className="relative group flex-shrink-0"
          >
            {editingId === char.id ? (
              <input
                ref={editInputRef}
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => handleEditKeyDown(e, char.id)}
                onBlur={() => {
                  if (editName.trim()) {
                    onRename(char.id, editName.trim());
                  }
                  setEditingId(null);
                }}
                className="px-4 py-2 text-sm rounded-full border-2 border-blue-500 bg-white outline-none w-24"
                maxLength={10}
              />
            ) : (
              <button
                onClick={() => onSelect(char.id)}
                onDoubleClick={() => startEditing(char)}
                className={`
                  px-4 py-2 text-sm rounded-full font-medium cursor-pointer
                  transition-all duration-200 ease-out select-none
                  active:scale-95
                  ${
                    activeCharacter?.id === char.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-200/50 scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-md'
                  }
                `}
              >
                {char.name}
              </button>
            )}

            {/* 삭제 버튼 (활성 탭이고, 캐릭터가 2개 이상일 때만) */}
            {activeCharacter?.id === char.id &&
              characters.length > 1 &&
              editingId !== char.id && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`'${char.name}'을(를) 삭제하시겠습니까?`)) {
                      onRemove(char.id);
                    }
                  }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs
                    opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer
                    flex items-center justify-center hover:bg-red-600 hover:scale-110 active:scale-90"
                >
                  ×
                </button>
              )}
          </div>
        ))}

        {/* 추가 버튼 */}
        {canAddCharacter && !isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-100 text-gray-500 cursor-pointer
              hover:bg-blue-100 hover:text-blue-500 transition-all duration-200
              flex items-center justify-center text-xl font-light
              hover:scale-110 hover:rotate-90 active:scale-95 shadow-sm hover:shadow-md"
          >
            +
          </button>
        )}

        {/* 새 캐릭터 입력 */}
        {isAdding && (
          <div className="flex-shrink-0 flex items-center gap-1 animate-fade-in">
            <input
              ref={inputRef}
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="캐릭터명"
              className="px-3 py-2 text-sm rounded-full border-2 border-blue-500 bg-white outline-none w-24"
              maxLength={10}
            />
            <button
              onClick={handleAdd}
              disabled={!newName.trim()}
              className="w-8 h-8 rounded-full bg-blue-500 text-white text-sm cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:bg-blue-600 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ✓
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewName('');
              }}
              className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 text-sm cursor-pointer
                hover:bg-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* 힌트 */}
      <p className="text-xs text-gray-400 mt-1 text-center">
        더블클릭으로 이름 수정 · 최대 {MAX_CHARACTERS}캐릭
      </p>
    </div>
  );
}
