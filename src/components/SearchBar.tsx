import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types';

interface SearchBarProps {
  products: Product[];
  onSearchSubmit: (query: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  products,
  onSearchSubmit,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const handleSearch = () => {
    if (query.trim()) {
      onSearchSubmit(query.trim());
      setSuggestionsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-[#F1F6FF] border-b border-blue-100/60 py-1 sm:py-1.5 px-3 sm:px-4 transition-colors">
      <div ref={containerRef} className="w-full max-w-[720px] mx-auto relative">
        {/* Slim Pill-shaped search bar container */}
        <div className="relative flex items-center w-full h-[38px] sm:h-[36px] bg-white rounded-full border-[1.5px] border-[#2563EB] shadow-[0_1px_6px_rgba(37,99,235,0.12)] transition-all duration-200 focus-within:border-[#1D4ED8] focus-within:ring-2 focus-within:ring-[#2563EB]/20 focus-within:shadow-[0_2px_10px_rgba(37,99,235,0.18)]">
          {/* Subtle inside left search icon */}
          <div className="pl-3 sm:pl-3.5 pr-1 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4 text-slate-400" />
          </div>

          {/* Text Input Field */}
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSuggestionsOpen(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim()) setSuggestionsOpen(true);
            }}
            placeholder="পণ্য সার্চ করুন (Search products)..."
            className="w-full h-full bg-transparent text-gray-900 text-base sm:text-[13px] pl-1 pr-22 sm:pr-24 rounded-full focus:outline-none placeholder:text-gray-400 font-normal"
          />

          {/* Slim Embedded Right Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Search"
            className="absolute right-0.5 sm:right-1 top-0.5 bottom-0.5 px-3 sm:px-3.5 rounded-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex items-center justify-center gap-1 font-bold text-[11px] tracking-wider uppercase transition-all duration-150 cursor-pointer shadow-2xs active:scale-97 select-none"
          >
            <span>SEARCH</span>
            <Search className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>

        {/* Live Search Suggestions Dropdown */}
        {suggestionsOpen && query.trim() && filtered.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-blue-100 z-50 overflow-hidden divide-y divide-gray-100 animate-in fade-in zoom-in-95 duration-150">
            {filtered.map((prod, idx) => (
              <div
                key={`${prod.id}-${idx}`}
                onClick={() => {
                  onSelectProduct(prod);
                  setQuery('');
                  setSuggestionsOpen(false);
                }}
                className="p-2.5 sm:p-3 hover:bg-blue-50/70 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 object-cover rounded-xl bg-gray-50 border border-gray-100"
                  />
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                      {prod.name}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-[#2563EB] font-semibold">
                      {prod.category}
                    </div>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-black text-[#0a192f] shrink-0">
                  ৳{prod.price}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
