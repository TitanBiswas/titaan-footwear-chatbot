import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { FilterSidebar } from './FilterSidebar';
import { 
  SlidersHorizontal, 
  ArrowUpDown, 
  LayoutGrid, 
  Grid2X2, 
  Grid3X3,
  X, 
  RotateCcw,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductList: React.FC = () => {
  const {
    filteredProducts,
    filterState,
    updateFilter,
    resetFilters,
    gridColumns,
    setGridColumns,
    quickDealFilter,
    setQuickDealFilter
  } = useShop();

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filter tags for quick removal
  const activeTags: { label: string; onRemove: () => void }[] = [];

  if (quickDealFilter) {
    activeTags.push({
      label: `Deal: ${quickDealFilter}`,
      onRemove: () => setQuickDealFilter(null)
    });
  }

  filterState.gender.forEach((g) => {
    activeTags.push({
      label: g,
      onRemove: () => updateFilter('gender', filterState.gender.filter((x) => x !== g))
    });
  });

  filterState.category.forEach((c) => {
    activeTags.push({
      label: c,
      onRemove: () => updateFilter('category', filterState.category.filter((x) => x !== c))
    });
  });

  filterState.brand.forEach((b) => {
    activeTags.push({
      label: b,
      onRemove: () => updateFilter('brand', filterState.brand.filter((x) => x !== b))
    });
  });

  if (filterState.minDiscount > 0) {
    activeTags.push({
      label: `${filterState.minDiscount}%+ Off`,
      onRemove: () => updateFilter('minDiscount', 0)
    });
  }

  filterState.sizes.forEach((s) => {
    activeTags.push({
      label: `Size ${s}`,
      onRemove: () => updateFilter('sizes', filterState.sizes.filter((x) => x !== s))
    });
  });

  if (filterState.priceRange[0] > 499 || filterState.priceRange[1] < 7999) {
    activeTags.push({
      label: `₹${filterState.priceRange[0]} - ₹${filterState.priceRange[1]}`,
      onRemove: () => updateFilter('priceRange', [499, 7999])
    });
  }

  return (
    <div id="product-catalogue-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <nav className="text-xs text-neutral-400 mb-1">
            <span className="hover:text-neutral-700 cursor-pointer" onClick={resetFilters}>Home</span> / 
            <span className="text-red-600 font-bold ml-1">Sale & Clearance Footwear</span>
          </nav>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              CLEARANCE CATALOGUE
            </h2>
            <span className="bg-red-100 text-red-700 text-xs font-extrabold px-2.5 py-1 rounded-full">
              {filteredProducts.length} Items Found
            </span>
          </div>
        </div>

        {/* Sort & View Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto flex-wrap">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-neutral-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({activeTags.length})</span>
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs font-semibold shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-neutral-500 hidden sm:inline">Sort By:</span>
            <select
              value={filterState.sortBy}
              onChange={(e: any) => updateFilter('sortBy', e.target.value)}
              className="bg-transparent font-bold text-neutral-900 focus:outline-none cursor-pointer text-xs"
            >
              <option value="popularity">Popularity / Rating</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount-desc">Discount: Highest First</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* Grid Layout Toggle (Desktop) */}
          <div className="hidden md:flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200">
            <button
              onClick={() => setGridColumns(2)}
              className={`p-1.5 rounded-lg transition-colors ${
                gridColumns === 2 ? 'bg-white shadow-xs text-red-600' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="2 Columns"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(3)}
              className={`p-1.5 rounded-lg transition-colors ${
                gridColumns === 3 ? 'bg-white shadow-xs text-red-600' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="3 Columns"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setGridColumns(4)}
              className={`p-1.5 rounded-lg transition-colors ${
                gridColumns === 4 ? 'bg-white shadow-xs text-red-600' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="4 Columns"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeTags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap py-4">
          <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Active Filters:
          </span>
          {activeTags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-800 text-xs font-semibold px-2.5 py-1 rounded-lg border border-neutral-200"
            >
              <span>{tag.label}</span>
              <button
                onClick={tag.onRemove}
                className="hover:text-red-600 hover:bg-neutral-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <button
            onClick={resetFilters}
            className="text-xs font-bold text-red-600 hover:text-red-700 ml-2 underline"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Main Layout: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Desktop Filter Sidebar */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-28">
            <FilterSidebar />
          </div>
        </div>

        {/* Product Catalog Grid */}
        <div className="lg:col-span-9">
          {filteredProducts.length > 0 ? (
            <div
              className={`grid gap-5 ${
                gridColumns === 2
                  ? 'grid-cols-1 sm:grid-cols-2'
                  : gridColumns === 3
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-neutral-200 p-12 text-center shadow-xs">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-neutral-900 mb-2">No Matching Shoes Found</h3>
              <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6">
                We couldn't find any footwear matching your exact filter criteria. Try adjusting price range, discounts, or clearing category selections.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      <AnimatePresence>
        {mobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-md bg-white h-full overflow-y-auto"
            >
              <FilterSidebar
                isMobileDrawer={true}
                onCloseMobile={() => setMobileFilterOpen(false)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
