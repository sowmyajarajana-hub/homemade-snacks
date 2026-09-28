import { CategoryId } from '../types';
import { CATEGORIES } from '../data/products';
import { Search, X, Flame, Sparkles, Filter } from 'lucide-react';

interface CategoryFilterBarProps {
  selectedCategory: CategoryId;
  onSelectCategory: (cat: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterType: 'all' | 'bestsellers' | 'new';
  onFilterTypeChange: (type: 'all' | 'bestsellers' | 'new') => void;
  totalProductsCount: number;
}

export function CategoryFilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  totalProductsCount,
}: CategoryFilterBarProps) {
  return (
    <div id="explore" className="space-y-4 pt-4 pb-2">
      {/* Top Row: Search and Secondary Tag Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search homemade snacks, cookies, murukku, cakes..."
            className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#D6CEBE] focus:border-[#C25E2E] focus:ring-2 focus:ring-[#C25E2E]/20 rounded-xl text-sm placeholder:text-[#A8A29E] text-[#292524] transition-all outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] hover:text-[#292524] p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Toggles: All / Best Sellers / New Arrivals */}
        <div className="flex items-center gap-1.5 p-1 bg-[#EFECE6] rounded-xl self-start md:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => onFilterTypeChange('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'all'
                ? 'bg-white text-[#292524] shadow-xs'
                : 'text-[#57534E] hover:text-[#292524]'
            }`}
          >
            All Products
          </button>
          <button
            onClick={() => onFilterTypeChange('bestsellers')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'bestsellers'
                ? 'bg-[#C25E2E] text-white shadow-xs'
                : 'text-[#57534E] hover:text-[#292524]'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Best Sellers</span>
          </button>
          <button
            onClick={() => onFilterTypeChange('new')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filterType === 'new'
                ? 'bg-[#166534] text-white shadow-xs'
                : 'text-[#57534E] hover:text-[#292524]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>New Arrivals</span>
          </button>
        </div>
      </div>

      {/* Categories Segmented Scroll Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none pt-1">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id as CategoryId)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-[#292524] text-white border-[#292524] shadow-sm'
                  : 'bg-white text-[#44403C] border-[#E5E0D8] hover:border-[#D6CEBE] hover:bg-[#FAF7F2]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Results summary (Quiet text metadata) */}
      <div className="flex items-center justify-between text-xs text-[#78716C] pt-1 px-1">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5" />
          <span>Showing <strong className="text-[#292524] tabular-nums">{totalProductsCount}</strong> homemade snack varieties</span>
        </div>
        {searchQuery && (
          <span>Filtering for: <strong className="text-[#292524]">"{searchQuery}"</strong></span>
        )}
      </div>
    </div>
  );
}
