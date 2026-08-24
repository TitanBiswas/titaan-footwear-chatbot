import React from 'react';
import { useShop } from '../context/ShopContext';
import { Gender, MainCategory, Brand } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MegaMenuProps {
  activeMenu: string | null;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeMenu, onClose }) => {
  const { updateFilter, resetFilters, setQuickDealFilter } = useShop();

  if (!activeMenu) return null;

  const handleCategoryClick = (gender?: Gender, category?: MainCategory, brand?: Brand) => {
    resetFilters();
    if (gender) updateFilter('gender', [gender]);
    if (category) updateFilter('category', [category]);
    if (brand) updateFilter('brand', [brand]);
    onClose();
  };

  const handleSaleQuickClick = (filterCode: string) => {
    resetFilters();
    setQuickDealFilter(filterCode);
    onClose();
  };

  return (
    <div
      id="mega-menu-dropdown"
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full bg-white border-b border-neutral-200 shadow-2xl z-40 py-8 px-8 transition-all animate-fadeIn"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-5 gap-8 text-sm">
        {activeMenu === 'Men' && (
          <>
            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Casual Footwear
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Sneakers')} className="hover:text-red-600 transition-colors text-left">
                    Sneakers & Chunky Kicks
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Loafers & Moccasins')} className="hover:text-red-600 transition-colors text-left">
                    Handcrafted Loafers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Casual Shoes')} className="hover:text-red-600 transition-colors text-left">
                    Slip-Ons & Canvas
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Boots')} className="hover:text-red-600 transition-colors text-left">
                    Chelsea & Ankle Boots
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Formal & Work
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Formal Shoes')} className="hover:text-red-600 transition-colors text-left">
                    Oxfords & Derbys
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Formal Shoes')} className="hover:text-red-600 transition-colors text-left">
                    Monk Straps & Brogues
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Loafers & Moccasins')} className="hover:text-red-600 transition-colors text-left">
                    Dress Loafers
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Ethnic & Sandals
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Ethnic & Kolhapuris')} className="hover:text-red-600 transition-colors text-left">
                    Royal Kolhapuris & Juttis
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Sandals & Floaters')} className="hover:text-red-600 transition-colors text-left">
                    Outdoor Leather Sandals
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Slippers & Flip Flops')} className="hover:text-red-600 transition-colors text-left">
                    Comfort Slippers & Slides
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Accessories
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Wallets & Belts')} className="hover:text-red-600 transition-colors text-left">
                    Reversible Leather Belts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Wallets & Belts')} className="hover:text-red-600 transition-colors text-left">
                    RFID Shield Wallets
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Men', 'Shoe Care & Accessories')} className="hover:text-red-600 transition-colors text-left">
                    Shoe Polish & Brushes
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                  Special Offer
                </span>
                <h5 className="font-bold text-neutral-900 text-base leading-tight mb-1">
                  Men's Leather Collection
                </h5>
                <p className="text-xs text-neutral-600 mb-3">
                  Flat 50% Off on pure leather styles for limited time.
                </p>
              </div>
              <button
                onClick={() => handleSaleQuickClick('leather')}
                className="inline-flex items-center text-xs font-bold text-red-600 hover:text-red-700 gap-1"
              >
                Shop Leather Sale <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}

        {activeMenu === 'Women' && (
          <>
            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Heels & Occasion
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Heels & Pumps')} className="hover:text-red-600 transition-colors text-left">
                    Stiletto Party Pumps
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Heels & Pumps')} className="hover:text-red-600 transition-colors text-left">
                    Comfort Block Heels
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Heels & Pumps')} className="hover:text-red-600 transition-colors text-left">
                    Kitten Heels & Slingbacks
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Flats & Daily Wear
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Flats & Ballerinas')} className="hover:text-red-600 transition-colors text-left">
                    Ballerinas & Loafers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Wedges')} className="hover:text-red-600 transition-colors text-left">
                    Comfort Platform Wedges
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Slippers & Flip Flops')} className="hover:text-red-600 transition-colors text-left">
                    Orthopedic Biofoot Slides
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Ethnic & Festive
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Ethnic & Kolhapuris')} className="hover:text-red-600 transition-colors text-left">
                    Zari Embroidered Mojaris
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Ethnic & Kolhapuris')} className="hover:text-red-600 transition-colors text-left">
                    Festive Kolhapuri Flats
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Heels & Pumps')} className="hover:text-red-600 transition-colors text-left">
                    Bridal Shimmer Sandals
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Bags & Clutches
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Bags & Handbags')} className="hover:text-red-600 transition-colors text-left">
                    Quilted Satchel Handbags
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Women', 'Bags & Handbags')} className="hover:text-red-600 transition-colors text-left">
                    Crossbody Slings & Totes
                  </button>
                </li>
              </ul>
            </div>

            <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
                  Trending
                </span>
                <h5 className="font-bold text-neutral-900 text-base leading-tight mb-1">
                  Wedding & Party Gala
                </h5>
                <p className="text-xs text-neutral-600 mb-3">
                  Glitter stilettos & handcrafted silk juttis starting at ₹1,190.
                </p>
              </div>
              <button
                onClick={() => handleSaleQuickClick('heels')}
                className="inline-flex items-center text-xs font-bold text-rose-600 hover:text-rose-700 gap-1"
              >
                Explore Heels <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}

        {activeMenu === 'Kids' && (
          <>
            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Boys' Footwear
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Kids', 'Sneakers')} className="hover:text-red-600 transition-colors text-left">
                    Light-Up LED Sneakers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Kids', 'Sandals & Floaters')} className="hover:text-red-600 transition-colors text-left">
                    Velcro School & Sport Sandals
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                Girls' Footwear
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li>
                  <button onClick={() => handleCategoryClick('Kids', 'Flats & Ballerinas')} className="hover:text-red-600 transition-colors text-left">
                    Princess Bow Ballerinas
                  </button>
                </li>
                <li>
                  <button onClick={() => handleCategoryClick('Kids', 'Ethnic & Kolhapuris')} className="hover:text-red-600 transition-colors text-left">
                    Festive Cute Juttis
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-neutral-900 mb-3 uppercase tracking-wider text-xs border-b pb-2 text-red-600">
                By Age Group
              </h4>
              <ul className="space-y-2 text-neutral-600">
                <li><button onClick={() => handleCategoryClick('Kids')} className="hover:text-red-600 transition-colors text-left">Toddlers (2 - 4 Yrs)</button></li>
                <li><button onClick={() => handleCategoryClick('Kids')} className="hover:text-red-600 transition-colors text-left">Junior (5 - 8 Yrs)</button></li>
                <li><button onClick={() => handleCategoryClick('Kids')} className="hover:text-red-600 transition-colors text-left">Teens (9 - 14 Yrs)</button></li>
              </ul>
            </div>

            <div className="col-span-2 bg-amber-50 p-4 rounded-xl border border-amber-100 flex items-center justify-between">
              <div>
                <span className="bg-amber-600 text-white text-[11px] font-bold px-2 py-0.5 rounded uppercase">Kids Flash Sale</span>
                <h5 className="font-bold text-neutral-900 text-lg mt-2">Flat 50% Off on Junior Shoes</h5>
                <p className="text-xs text-neutral-600 mt-1">Lightweight, non-skid, and child-safe materials.</p>
                <button
                  onClick={() => handleCategoryClick('Kids')}
                  className="mt-3 inline-flex items-center text-xs font-bold bg-neutral-900 text-white px-3 py-2 rounded-lg hover:bg-black transition-colors gap-1"
                >
                  Shop Kids Collection <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=300&auto=format&fit=crop&q=80"
                alt="Kids shoes"
                className="w-28 h-28 object-cover rounded-lg border shadow-sm"
              />
            </div>
          </>
        )}

        {activeMenu === 'Brands' && (
          <div className="col-span-5 grid grid-cols-6 gap-4">
            {[
              { name: 'Titaan', desc: 'Bold & Awesome Footwear', tag: 'Core Brand' },
              { name: 'Metro', desc: 'Heritage Indian Elegance', tag: 'Bestseller' },
              { name: 'J.Fontini', desc: 'Handmade Italian Craftsmanship', tag: 'Luxury' },
              { name: 'Davinci', desc: 'Modern European Aesthetics', tag: 'Premium' },
              { name: 'Crocs', desc: 'Iconic All-Terrain Comfort', tag: 'Official Partner' },
              { name: 'Biofoot', desc: 'Doctor-Recommended Orthopedics', tag: 'Wellness' }
            ].map((brand) => (
              <button
                key={brand.name}
                onClick={() => handleCategoryClick(undefined, undefined, brand.name as Brand)}
                className="text-left p-4 rounded-xl border border-neutral-200 hover:border-red-600 hover:shadow-md transition-all group bg-neutral-50 hover:bg-white"
              >
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-600 block mb-1">
                  {brand.tag}
                </span>
                <h4 className="font-extrabold text-neutral-900 text-lg group-hover:text-red-600 transition-colors">
                  {brand.name}
                </h4>
                <p className="text-xs text-neutral-500 mt-1">{brand.desc}</p>
              </button>
            ))}
          </div>
        )}

        {activeMenu === 'Sale' && (
          <div className="col-span-5 grid grid-cols-4 gap-6">
            <div className="bg-red-600 text-white p-5 rounded-2xl flex flex-col justify-between shadow-lg">
              <div>
                <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold tracking-widest uppercase mb-1">
                  <Sparkles className="w-4 h-4" /> End of Season Sale
                </div>
                <h4 className="text-2xl font-black tracking-tight">FLAT 50% OFF</h4>
                <p className="text-xs text-red-100 mt-1">On 2,000+ shoes, heels, loafers, and bags.</p>
              </div>
              <button
                onClick={() => handleSaleQuickClick('flat50')}
                className="mt-4 bg-white text-red-600 font-bold px-4 py-2 rounded-lg text-xs hover:bg-neutral-100 transition-colors w-fit"
              >
                Explore Flat 50% Off
              </button>
            </div>

            <div className="bg-neutral-900 text-white p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Budget Deals</span>
                <h4 className="text-xl font-bold mt-1">Under ₹1,499 Store</h4>
                <p className="text-xs text-neutral-400 mt-1">Everyday loafers, flats, and comfort slippers.</p>
              </div>
              <button
                onClick={() => handleSaleQuickClick('under1499')}
                className="mt-4 bg-red-600 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-red-700 transition-colors w-fit"
              >
                Shop Under ₹1,499
              </button>
            </div>

            <div className="bg-amber-500 text-neutral-950 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="bg-neutral-950 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Prepaid Offer</span>
                <h4 className="text-xl font-extrabold mt-2">Extra 10% Off</h4>
                <p className="text-xs text-neutral-900 mt-1">Use Code: <strong>EXTRA10</strong> on checkout.</p>
              </div>
              <button
                onClick={() => {
                  resetFilters();
                  onClose();
                }}
                className="mt-4 bg-neutral-950 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-neutral-800 transition-colors w-fit"
              >
                Apply On Cart
              </button>
            </div>

            <div className="bg-neutral-100 p-5 rounded-2xl flex flex-col justify-between border border-neutral-200">
              <div>
                <span className="text-red-600 text-xs font-bold uppercase">Bestselling Steals</span>
                <h4 className="text-xl font-bold text-neutral-900 mt-1">Most Loved Picks</h4>
                <p className="text-xs text-neutral-600 mt-1">Top-rated footwear by over 50,000+ happy buyers.</p>
              </div>
              <button
                onClick={() => handleSaleQuickClick('bestseller')}
                className="mt-4 bg-neutral-900 text-white font-bold px-4 py-2 rounded-lg text-xs hover:bg-black transition-colors w-fit"
              >
                View Bestsellers
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
