import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, Flame, ShieldCheck, Truck, RefreshCw, CreditCard, ChevronRight } from 'lucide-react';
import { Gender, MainCategory } from '../types';

export const SaleHeroBanner: React.FC = () => {
  const {
    quickDealFilter,
    setQuickDealFilter,
    resetFilters,
    updateFilter,
    filterState
  } = useShop();

  const handleCategoryShortcut = (gender?: Gender, category?: MainCategory) => {
    resetFilters();
    if (gender) updateFilter('gender', [gender]);
    if (category) updateFilter('category', [category]);
  };

  const dealTabs = [
    { id: 'all', label: 'All Sale Deals', isAll: true },
    { id: 'flat50', label: '🔥 Flat 50% Off', count: '1000+ Styles' },
    { id: 'under1499', label: '💰 Under ₹1,499', count: 'Budget Steals' },
    { id: 'under1999', label: '🏷️ Under ₹1,999', count: 'Value Picks' },
    { id: 'bestseller', label: '⭐ Bestsellers', count: 'Top Rated' },
    { id: 'leather', label: '👞 Pure Leather', count: 'Premium' },
    { id: 'heels', label: '👠 Party & Heels', count: 'Glamour' },
    { id: 'sneakers', label: '👟 Urban Sneakers', count: 'Streetwear' },
  ];

  return (
    <div id="sale-hero-section" className="bg-neutral-100 border-b border-neutral-200">
      {/* 1. Main Hero Graphic Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950 text-white border border-neutral-800">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-red-600/90 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
                <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span>End Of Season Clearance</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                UP TO <span className="text-red-500 underline decoration-amber-400">60% OFF</span> ON TITAAN & METRO
              </h1>

              <p className="text-sm sm:text-base text-neutral-300 max-w-xl">
                Explore handpicked leather loafers, party heels, casual sneakers, festive juttis and luxury bags at clearance prices.
              </p>

              {/* Coupon Highlight Box */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl flex items-center gap-3">
                  <span className="text-xs text-neutral-300">Use Code:</span>
                  <span className="font-mono font-black text-sm text-amber-400 tracking-wider">
                    TITAAN50
                  </span>
                  <span className="text-[11px] bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                    FLAT 50%
                  </span>
                </div>

                <div className="text-xs text-neutral-300 flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Extra 10% on Prepaid with <strong>EXTRA10</strong></span>
                </div>
              </div>
            </div>

            {/* Visual preview grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              <div
                onClick={() => handleCategoryShortcut('Men', 'Loafers & Moccasins')}
                className="group relative rounded-2xl overflow-hidden h-36 sm:h-40 border border-white/10 cursor-pointer shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop&q=80"
                  alt="Men's Loafers"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-amber-400">Men's Edition</span>
                  <span className="text-sm font-extrabold text-white flex items-center justify-between">
                    Leather Loafers <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleCategoryShortcut('Women', 'Heels & Pumps')}
                className="group relative rounded-2xl overflow-hidden h-36 sm:h-40 border border-white/10 cursor-pointer shadow-md"
              >
                <img
                  src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop&q=80"
                  alt="Women's Heels"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 flex flex-col justify-end">
                  <span className="text-[10px] uppercase font-bold text-rose-400">Women's Edition</span>
                  <span className="text-sm font-extrabold text-white flex items-center justify-between">
                    Party Heels <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Value props ribbon */}
          <div className="border-t border-white/10 bg-black/40 px-6 py-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-neutral-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Titaan Footwear</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-sky-400" />
              <span>Free Delivery Above ₹999</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-amber-400" />
              <span>15-Day Easy Size Exchanges</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-400" />
              <span>Cash on Delivery Available</span>
            </div>
          </div>
        </div>

        {/* 2. Interactive Deal Pills Navigation */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-neutral-900 text-sm uppercase tracking-wider">
                Shop By Clearance Offer
              </span>
              <span className="text-xs text-neutral-500 font-medium hidden sm:inline">
                (Click to instantly filter catalogue)
              </span>
            </div>

            {(quickDealFilter || filterState.gender.length > 0 || filterState.category.length > 0 || filterState.brand.length > 0 || filterState.minDiscount > 0) && (
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-red-600 hover:text-red-700 underline"
              >
                Clear All Filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {dealTabs.map((tab) => {
              const isSelected = tab.isAll ? !quickDealFilter : quickDealFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.isAll) {
                      setQuickDealFilter(null);
                    } else {
                      setQuickDealFilter(quickDealFilter === tab.id ? null : tab.id);
                    }
                  }}
                  className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-md ring-2 ring-red-300'
                      : 'bg-white text-neutral-700 border border-neutral-200 hover:border-red-500 hover:bg-red-50/50'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                        isSelected ? 'bg-red-800 text-white' : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
