import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ChevronDown, 
  ChevronUp, 
  RotateCcw, 
  Filter, 
  Check, 
  X,
  Sparkles
} from 'lucide-react';
import { Gender, MainCategory, Brand, Occasion, Material } from '../types';

const GENDERS: Gender[] = ['Men', 'Women', 'Kids', 'Unisex'];

const CATEGORIES: MainCategory[] = [
  'Loafers & Moccasins',
  'Formal Shoes',
  'Sneakers',
  'Heels & Pumps',
  'Wedges',
  'Flats & Ballerinas',
  'Ethnic & Kolhapuris',
  'Sandals & Floaters',
  'Slippers & Flip Flops',
  'Boots',
  'Bags & Handbags',
  'Wallets & Belts'
];

const BRANDS: Brand[] = [
  'Titaan',
  'Metro',
  'J.Fontini',
  'Davinci',
  'Fila',
  'Crocs',
  'Biofoot',
  'Zeemo'
];

const OCCASIONS: Occasion[] = ['Casual', 'Formal', 'Party', 'Ethnic', 'Sports', 'Work'];

const MATERIALS: Material[] = [
  'Genuine Leather',
  'Synthetic Leather',
  'Fabric / Mesh',
  'Croslite / EVA'
];

const SIZES = [6, 7, 8, 9, 10, 11, 36, 37, 38, 39, 40, 41];

const DISCOUNT_OPTIONS = [
  { label: '50% & above', value: 50 },
  { label: '40% & above', value: 40 },
  { label: '30% & above', value: 30 },
  { label: '20% & above', value: 20 },
  { label: '10% & above', value: 10 }
];

export const FilterSidebar: React.FC<{ isMobileDrawer?: boolean; onCloseMobile?: () => void }> = ({
  isMobileDrawer = false,
  onCloseMobile
}) => {
  const { filterState, updateFilter, resetFilters, products } = useShop();

  const [openSections, setOpenSections] = useState({
    gender: true,
    category: true,
    price: true,
    discount: true,
    brand: true,
    size: true,
    occasion: false,
    material: false
  });

  const [categorySearch, setCategorySearch] = useState('');
  const [brandSearch, setBrandSearch] = useState('');

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleGenderToggle = (g: Gender) => {
    const exists = filterState.gender.includes(g);
    const updated = exists ? filterState.gender.filter((x) => x !== g) : [...filterState.gender, g];
    updateFilter('gender', updated);
  };

  const handleCategoryToggle = (c: MainCategory) => {
    const exists = filterState.category.includes(c);
    const updated = exists ? filterState.category.filter((x) => x !== c) : [...filterState.category, c];
    updateFilter('category', updated);
  };

  const handleBrandToggle = (b: Brand) => {
    const exists = filterState.brand.includes(b);
    const updated = exists ? filterState.brand.filter((x) => x !== b) : [...filterState.brand, b];
    updateFilter('brand', updated);
  };

  const handleSizeToggle = (s: number | string) => {
    const exists = filterState.sizes.includes(s);
    const updated = exists ? filterState.sizes.filter((x) => x !== s) : [...filterState.sizes, s];
    updateFilter('sizes', updated);
  };

  const handleOccasionToggle = (o: Occasion) => {
    const exists = filterState.occasion.includes(o);
    const updated = exists ? filterState.occasion.filter((x) => x !== o) : [...filterState.occasion, o];
    updateFilter('occasion', updated);
  };

  const handleMaterialToggle = (m: Material) => {
    const exists = filterState.material.includes(m);
    const updated = exists ? filterState.material.filter((x) => x !== m) : [...filterState.material, m];
    updateFilter('material', updated);
  };

  const getProductCountForCategory = (cat: MainCategory) => {
    return products.filter((p) => p.category === cat).length;
  };

  const getProductCountForBrand = (br: Brand) => {
    return products.filter((p) => p.brand === br).length;
  };

  const filteredCategories = CATEGORIES.filter((c) =>
    c.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredBrands = BRANDS.filter((b) =>
    b.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const hasActiveFilters =
    filterState.gender.length > 0 ||
    filterState.category.length > 0 ||
    filterState.brand.length > 0 ||
    filterState.minDiscount > 0 ||
    filterState.sizes.length > 0 ||
    filterState.occasion.length > 0 ||
    filterState.material.length > 0 ||
    filterState.priceRange[0] > 499 ||
    filterState.priceRange[1] < 7999;

  return (
    <div className={`bg-white ${isMobileDrawer ? 'p-6' : 'rounded-2xl border border-neutral-200 p-5 shadow-xs'}`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-red-600" />
          <h3 className="font-extrabold text-neutral-900 text-base">FILTERS</h3>
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
            >
              <RotateCcw className="w-3 h-3" /> Clear All
            </button>
          )}
          {isMobileDrawer && onCloseMobile && (
            <button onClick={onCloseMobile} className="p-1 text-neutral-500 hover:bg-neutral-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="divide-y divide-neutral-100 space-y-4">
        {/* 1. GENDER */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('gender')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Gender ({filterState.gender.length > 0 ? filterState.gender.length : 'All'})</span>
            {openSections.gender ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.gender && (
            <div className="grid grid-cols-2 gap-2">
              {GENDERS.map((g) => {
                const isSelected = filterState.gender.includes(g);
                return (
                  <button
                    key={g}
                    onClick={() => handleGenderToggle(g)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold text-center border transition-all ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-600 shadow-xs'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {g}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. DISCOUNT PERCENTAGE */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('discount')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span className="flex items-center gap-1.5 text-red-600">
              <Sparkles className="w-3.5 h-3.5" /> Discount
            </span>
            {openSections.discount ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.discount && (
            <div className="space-y-2">
              {DISCOUNT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer hover:text-red-600 group"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="discount"
                      checked={filterState.minDiscount === opt.value}
                      onChange={() => updateFilter('minDiscount', opt.value)}
                      className="accent-red-600 w-3.5 h-3.5 cursor-pointer"
                    />
                    <span className="font-semibold">{opt.label}</span>
                  </div>
                  {opt.value >= 50 && (
                    <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">
                      HOT
                    </span>
                  )}
                </label>
              ))}
              {filterState.minDiscount > 0 && (
                <button
                  onClick={() => updateFilter('minDiscount', 0)}
                  className="text-[11px] text-neutral-500 underline hover:text-red-600 mt-1 block"
                >
                  Show all discounts
                </button>
              )}
            </div>
          )}
        </div>

        {/* 3. CATEGORIES */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Category ({filterState.category.length})</span>
            {openSections.category ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.category && (
            <div className="space-y-3">
              <input
                type="text"
                value={categorySearch}
                onChange={(e) => setCategorySearch(e.target.value)}
                placeholder="Search categories..."
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-600"
              />

              <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {filteredCategories.map((cat) => {
                  const isChecked = filterState.category.includes(cat);
                  const count = getProductCountForCategory(cat);
                  return (
                    <label
                      key={cat}
                      className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer hover:text-neutral-900 group select-none"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => handleCategoryToggle(cat)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-300 group-hover:border-neutral-400'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={isChecked ? 'font-bold text-neutral-900' : 'text-neutral-600'}>
                          {cat}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 4. PRICE RANGE SLIDER */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Price (₹{filterState.priceRange[0]} - ₹{filterState.priceRange[1]})</span>
            {openSections.price ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.price && (
            <div className="space-y-3">
              <input
                type="range"
                min="499"
                max="7999"
                step="100"
                value={filterState.priceRange[1]}
                onChange={(e) => updateFilter('priceRange', [filterState.priceRange[0], Number(e.target.value)])}
                className="w-full accent-red-600 cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-neutral-500 font-semibold">
                <span>₹{filterState.priceRange[0]}</span>
                <span>Max: ₹{filterState.priceRange[1]}</span>
              </div>

              {/* Quick price pills */}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {[
                  { label: 'Under ₹999', range: [499, 999] },
                  { label: '₹1k - ₹2k', range: [1000, 1999] },
                  { label: '₹2k - ₹3.5k', range: [2000, 3499] },
                  { label: '₹3.5k+', range: [3500, 7999] }
                ].map((pill) => (
                  <button
                    key={pill.label}
                    onClick={() => updateFilter('priceRange', pill.range as [number, number])}
                    className="text-[11px] font-bold py-1 px-2 rounded-lg border border-neutral-200 hover:border-red-600 hover:text-red-600 text-neutral-600 bg-neutral-50 text-center transition-colors"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 5. BRANDS */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('brand')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Brand ({filterState.brand.length})</span>
            {openSections.brand ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.brand && (
            <div className="space-y-3">
              <input
                type="text"
                value={brandSearch}
                onChange={(e) => setBrandSearch(e.target.value)}
                placeholder="Search brands..."
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-red-600"
              />

              <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
                {filteredBrands.map((b) => {
                  const isChecked = filterState.brand.includes(b);
                  const count = getProductCountForBrand(b);
                  return (
                    <label
                      key={b}
                      className="flex items-center justify-between text-xs text-neutral-700 cursor-pointer hover:text-neutral-900 group select-none"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          onClick={() => handleBrandToggle(b)}
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                            isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-300 group-hover:border-neutral-400'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={isChecked ? 'font-bold text-neutral-900' : 'text-neutral-600'}>
                          {b}
                        </span>
                      </div>
                      <span className="text-[11px] text-neutral-400">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 6. SIZES */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('size')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Size UK / IND</span>
            {openSections.size ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.size && (
            <div className="grid grid-cols-4 gap-1.5">
              {SIZES.map((size) => {
                const isSelected = filterState.sizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => handleSizeToggle(size)}
                    className={`py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 7. OCCASION */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('occasion')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Occasion</span>
            {openSections.occasion ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.occasion && (
            <div className="flex flex-wrap gap-1.5">
              {OCCASIONS.map((occ) => {
                const isSelected = filterState.occasion.includes(occ);
                return (
                  <button
                    key={occ}
                    onClick={() => handleOccasionToggle(occ)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      isSelected
                        ? 'bg-red-600 text-white border-red-600 font-bold'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:bg-neutral-100'
                    }`}
                  >
                    {occ}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 8. MATERIAL */}
        <div className="pt-4">
          <button
            onClick={() => toggleSection('material')}
            className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider text-neutral-800 mb-3"
          >
            <span>Material</span>
            {openSections.material ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openSections.material && (
            <div className="space-y-1.5">
              {MATERIALS.map((mat) => {
                const isChecked = filterState.material.includes(mat);
                return (
                  <label
                    key={mat}
                    className="flex items-center gap-2 text-xs text-neutral-700 cursor-pointer hover:text-neutral-900 group"
                  >
                    <div
                      onClick={() => handleMaterialToggle(mat)}
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                        isChecked ? 'bg-red-600 border-red-600 text-white' : 'border-neutral-300'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <span className={isChecked ? 'font-bold' : ''}>{mat}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {isMobileDrawer && (
        <div className="sticky bottom-0 pt-4 bg-white border-t border-neutral-200 mt-6 flex gap-3">
          <button
            onClick={resetFilters}
            className="flex-1 py-3 border border-neutral-300 rounded-xl font-bold text-sm text-neutral-700"
          >
            Reset
          </button>
          <button
            onClick={onCloseMobile}
            className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-sm shadow-md"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};
