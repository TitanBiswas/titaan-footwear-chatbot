import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { MegaMenu } from './MegaMenu';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  MapPin, 
  Truck, 
  Phone, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles,
  Flame,
  ArrowRight
} from 'lucide-react';
import { Gender, MainCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsStoreLocatorOpen,
    setIsTrackOrderOpen,
    setIsAuthModalOpen,
    filterState,
    updateFilter,
    products,
    setActiveProductDetail,
    cartSubtotal,
    resetFilters
  } = useShop();

  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchSuggestions = products
    .filter((p) => {
      if (!filterState.searchQuery.trim()) return false;
      const q = filterState.searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    })
    .slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFocused(false);
  };

  const handleMobileNavCategory = (gender?: Gender, category?: MainCategory) => {
    resetFilters();
    if (gender) updateFilter('gender', [gender]);
    if (category) updateFilter('category', [category]);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* 1. TOP PROMOTIONAL ANNOUNCEMENT BAR */}
      <div id="top-announcement-bar" className="bg-neutral-900 text-white text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-red-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3 h-3 fill-current" /> Sale Live
            </span>
            <span className="font-semibold tracking-wide text-neutral-200">
              FLAT 50% OFF | Extra 10% Off On Prepaid Orders | CODE: <strong className="text-amber-400">TITAAN50</strong>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-neutral-300 font-medium text-[11px]">
            <button
              onClick={() => setIsStoreLocatorOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-red-500" />
              <span>Find a Store (100+ Outlets)</span>
            </button>

            <button
              onClick={() => setIsTrackOrderOpen(true)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>Track Order</span>
            </button>

            <div className="flex items-center gap-1 text-neutral-400">
              <Phone className="w-3.5 h-3.5" />
              <span>Helpline: 1800-266-6244</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile menu toggle & Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100"
              aria-label="Toggle mobile navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Titaan Official Brand Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                resetFilters();
              }}
              className="flex items-center gap-2 group select-none"
            >
              <div className="bg-red-600 text-white font-black text-2xl tracking-tighter px-3 py-1 rounded shadow-md group-hover:bg-red-700 transition-colors">
                TITAAN
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-[10px] uppercase font-extrabold tracking-widest text-neutral-900 leading-none">
                  AWESOME
                </span>
                <span className="text-[9px] uppercase font-bold tracking-widest text-red-600 leading-tight">
                  FOOTWEAR
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-bold text-sm text-neutral-800">
            {['Men', 'Women', 'Kids', 'Brands', 'Sale'].map((menu) => {
              const isSale = menu === 'Sale';
              return (
                <button
                  key={menu}
                  onMouseEnter={() => setActiveMenu(menu)}
                  onClick={() => {
                    if (isSale) {
                      updateFilter('minDiscount', 40);
                    } else if (menu === 'Men' || menu === 'Women' || menu === 'Kids') {
                      resetFilters();
                      updateFilter('gender', [menu as Gender]);
                    }
                  }}
                  className={`px-3.5 py-2 rounded-lg transition-colors relative flex items-center gap-1 ${
                    isSale
                      ? 'text-red-600 hover:bg-red-50 font-extrabold'
                      : activeMenu === menu
                      ? 'text-red-600 bg-neutral-50'
                      : 'hover:text-red-600 hover:bg-neutral-50'
                  }`}
                >
                  {isSale && <Flame className="w-3.5 h-3.5 fill-red-600 text-red-600 inline" />}
                  <span>{menu}</span>
                  {isSale && (
                    <span className="bg-red-600 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase ml-1 animate-pulse">
                      50% OFF
                    </span>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
                </button>
              );
            })}
          </nav>

          {/* Search bar with instant autocomplete */}
          <div ref={searchContainerRef} className="flex-1 max-w-md relative hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={filterState.searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => updateFilter('searchQuery', e.target.value)}
                placeholder="Search for shoes, loafers, heels, brands, bags..."
                className="w-full bg-neutral-100 border border-neutral-200 hover:border-neutral-300 focus:border-red-600 focus:bg-white text-neutral-900 text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-red-100"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {filterState.searchQuery && (
                <button
                  type="button"
                  onClick={() => updateFilter('searchQuery', '')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Predictive Search Dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-neutral-200 shadow-2xl p-4 z-50 animate-fadeIn">
                {filterState.searchQuery.trim() ? (
                  <div>
                    <div className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
                      Matching Products ({searchSuggestions.length})
                    </div>
                    {searchSuggestions.length > 0 ? (
                      <div className="space-y-2">
                        {searchSuggestions.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => {
                              setActiveProductDetail(prod);
                              setSearchFocused(false);
                            }}
                            className="flex items-center gap-3 p-2 hover:bg-neutral-50 rounded-xl cursor-pointer transition-colors"
                          >
                            <img
                              src={prod.images[0]}
                              alt={prod.title}
                              className="w-12 h-12 object-cover rounded-lg border"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-neutral-900 truncate">{prod.title}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-xs font-extrabold text-red-600">₹{prod.price.toLocaleString()}</span>
                                <span className="text-[11px] text-neutral-400 line-through">₹{prod.originalPrice.toLocaleString()}</span>
                                <span className="text-[10px] bg-red-100 text-red-700 px-1 rounded font-bold">{prod.discountPercentage}% OFF</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500 py-3 text-center">
                        No products found for "{filterState.searchQuery}". Try "Loafers", "Heels", or "Sneakers".
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="text-[11px] uppercase font-bold text-neutral-400 tracking-wider mb-2">
                      Popular Searches in Sale
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {['Men Leather Loafers', 'Party Stiletto Heels', 'White Chunky Sneakers', 'Kolhapuri Mojaris', 'Davinci Block Heels', 'Reversible Belts'].map(
                        (term) => (
                          <button
                            key={term}
                            onClick={() => {
                              updateFilter('searchQuery', term);
                              setSearchFocused(false);
                            }}
                            className="text-xs bg-neutral-100 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 rounded-full text-neutral-700 transition-colors font-medium"
                          >
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Store locator on tablet */}
            <button
              onClick={() => setIsStoreLocatorOpen(true)}
              className="hidden md:flex p-2 text-neutral-700 hover:text-red-600 hover:bg-neutral-100 rounded-full transition-colors"
              title="Store Locator"
            >
              <MapPin className="w-5 h-5" />
            </button>

            {/* Profile / Account */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1 p-2 text-neutral-700 hover:text-red-600 hover:bg-neutral-100 rounded-full transition-colors"
              title="My Account"
            >
              <User className="w-5 h-5" />
              <span className="hidden xl:inline text-xs font-bold">Profile</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 text-neutral-700 hover:text-red-600 hover:bg-neutral-100 rounded-full transition-colors relative"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-red-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-scaleIn">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-neutral-900 hover:bg-red-600 text-white px-3 sm:px-4 py-2.5 rounded-full transition-all shadow-sm font-bold text-xs sm:text-sm"
              title="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-neutral-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartCount > 0 ? `₹${cartSubtotal.toLocaleString()}` : 'Bag'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={filterState.searchQuery}
              onChange={(e) => updateFilter('searchQuery', e.target.value)}
              placeholder="Search shoes, heels, brands..."
              className="w-full bg-neutral-100 text-neutral-900 text-xs pl-9 pr-8 py-2 rounded-full border border-neutral-200 focus:outline-none focus:border-red-600"
            />
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* MegaMenu Dropdown for Desktop */}
      <MegaMenu activeMenu={activeMenu} onClose={() => setActiveMenu(null)} />

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex">
          <div className="w-4/5 max-w-sm bg-white h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b">
                <div className="bg-red-600 text-white font-black text-xl px-2.5 py-0.5 rounded">
                  TITAAN
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-6 space-y-4 font-bold text-neutral-800">
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-bold">Categories</div>
                
                <button
                  onClick={() => handleMobileNavCategory('Men')}
                  className="w-full flex items-center justify-between text-base py-2 hover:text-red-600 border-b border-neutral-100"
                >
                  <span>Men's Footwear</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleMobileNavCategory('Women')}
                  className="w-full flex items-center justify-between text-base py-2 hover:text-red-600 border-b border-neutral-100"
                >
                  <span>Women's Collection</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>

                <button
                  onClick={() => handleMobileNavCategory('Kids')}
                  className="w-full flex items-center justify-between text-base py-2 hover:text-red-600 border-b border-neutral-100"
                >
                  <span>Kids & Junior</span>
                  <ArrowRight className="w-4 h-4 text-neutral-400" />
                </button>

                <button
                  onClick={() => {
                    resetFilters();
                    updateFilter('minDiscount', 50);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between text-base py-2 text-red-600 font-extrabold border-b border-neutral-100"
                >
                  <span className="flex items-center gap-1.5">
                    <Flame className="w-4 h-4 fill-red-600 text-red-600" /> Clearance Sale (50% Off)
                  </span>
                  <ArrowRight className="w-4 h-4 text-red-600" />
                </button>
              </div>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    setIsStoreLocatorOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 text-sm font-medium text-neutral-600 p-2.5 bg-neutral-50 rounded-xl hover:bg-neutral-100"
                >
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Find a Titaan Store</span>
                </button>

                <button
                  onClick={() => {
                    setIsTrackOrderOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 text-sm font-medium text-neutral-600 p-2.5 bg-neutral-50 rounded-xl hover:bg-neutral-100"
                >
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span>Track My Orders</span>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t text-xs text-neutral-500">
              <p className="font-bold text-neutral-800">Titaan Footwear Customer Support</p>
              <p className="mt-0.5">Toll Free: 1800-266-6244 (10 AM - 7 PM)</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
