import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search or start new chat',
}) => {
  return (
    <div className="p-3 border-b border-[#504254] bg-[#131313] shrink-0">
      <div className="relative w-full focus-within:ring-1 focus-within:ring-[#ebb2ff] rounded-lg transition-all duration-150">
        <span
          className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#d4c0d7] text-[20px]"
          data-icon="search"
        >
          search
        </span>
        <input
          value={value}
          onChange={onChange}
          className="w-full bg-[#2a2a2a] text-[#e2e2e2] font-['Plus_Jakarta_Sans'] pl-10 pr-8 py-2 rounded-lg border-none focus:outline-none focus:ring-0 placeholder:text-[#d4c0d7] text-sm"
          placeholder={placeholder}
          type="text"
        />
        {value && (
          <button
            onClick={() => onChange({ target: { value: '' } } as any)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#d4c0d7] hover:text-[#ebb2ff]"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>
    </div>
  );
};
