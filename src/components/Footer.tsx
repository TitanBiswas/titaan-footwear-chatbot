import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { Gender, MainCategory } from '../types';

export const Footer: React.FC = () => {
  const {
    setIsStoreLocatorOpen,
    setIsTrackOrderOpen,
    setIsSizeGuideOpen,
    updateFilter,
    resetFilters,
    addToast
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      addToast(`🎉 Coupon code TITAANNEW500 sent to ${newsletterEmail}!`, 'success');
      setNewsletterEmail('');
    }
  };

  const handleNavCategory = (gender?: Gender, category?: MainCategory) => {
    resetFilters();
    if (gender) updateFilter('gender', [gender]);
    if (category) updateFilter('category', [category]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="titaan-footer" className="bg-neutral-950 text-white border-t border-neutral-800">
      {/* 1. Value Badges Ribbon */}
      <div className="border-b border-neutral-800 bg-neutral-900/60 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-neutral-100">100% Genuine Shoes</h4>
              <p className="text-xs text-neutral-400">Direct from Titaan Footwear</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-neutral-100">Free Express Shipping</h4>
              <p className="text-xs text-neutral-400">On all orders above ₹999</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-neutral-100">15-Day Free Returns</h4>
              <p className="text-xs text-neutral-400">Hassle-free doorstep pickup</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center sm:justify-start">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-neutral-100">Secure Payments</h4>
              <p className="text-xs text-neutral-400">UPI, Cards & Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Newsletter Signup Bar */}
      <div className="border-b border-neutral-800 py-10 bg-gradient-to-r from-neutral-950 via-neutral-900 to-red-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Exclusive Member Voucher
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              GET ₹500 OFF ON YOUR FIRST ORDER
            </h3>
            <p className="text-xs text-neutral-400">
              Subscribe to Titaan VIP notifications for flash clearance drops and private festive sales.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="flex-1 text-xs bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-colors shrink-0 flex items-center gap-1.5"
            >
              <span>CLAIM ₹500</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8 text-xs text-neutral-400">
        {/* Brand Story */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white font-black text-2xl px-3 py-0.5 rounded">
              TITAAN
            </div>
            <span className="text-xs font-bold tracking-widest text-neutral-300 uppercase">
              AWESOME FOOTWEAR
            </span>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
            Titaan Footwear is India’s youth footwear fashion destination. From trendsetting sneakers and handcrafted leather loafers to bridal stilettos and ethnic juttis, we bring supreme comfort and style.
          </p>

          <div className="space-y-1 text-neutral-300 text-xs font-semibold">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span>Customer Care: 1800-266-6244 (10 AM - 7 PM)</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-red-500" />
              <span>Email: customercare@titaanfootwear.com</span>
            </p>
          </div>
        </div>

        {/* Men's Links */}
        <div>
          <h4 className="font-extrabold text-neutral-100 text-sm uppercase tracking-wider mb-3">
            Men's Shoes
          </h4>
          <ul className="space-y-2">
            <li><button onClick={() => handleNavCategory('Men', 'Loafers & Moccasins')} className="hover:text-white transition-colors">Leather Loafers</button></li>
            <li><button onClick={() => handleNavCategory('Men', 'Formal Shoes')} className="hover:text-white transition-colors">Formal Oxford Shoes</button></li>
            <li><button onClick={() => handleNavCategory('Men', 'Sneakers')} className="hover:text-white transition-colors">Urban Sneakers</button></li>
            <li><button onClick={() => handleNavCategory('Men', 'Ethnic & Kolhapuris')} className="hover:text-white transition-colors">Royal Kolhapuris</button></li>
            <li><button onClick={() => handleNavCategory('Men', 'Sandals & Floaters')} className="hover:text-white transition-colors">Outdoor Sandals</button></li>
            <li><button onClick={() => handleNavCategory('Men', 'Wallets & Belts')} className="hover:text-white transition-colors">Leather Belts & Wallets</button></li>
          </ul>
        </div>

        {/* Women's Links */}
        <div>
          <h4 className="font-extrabold text-neutral-100 text-sm uppercase tracking-wider mb-3">
            Women's Shoes
          </h4>
          <ul className="space-y-2">
            <li><button onClick={() => handleNavCategory('Women', 'Heels & Pumps')} className="hover:text-white transition-colors">Stiletto Party Heels</button></li>
            <li><button onClick={() => handleNavCategory('Women', 'Wedges')} className="hover:text-white transition-colors">Comfort Wedges</button></li>
            <li><button onClick={() => handleNavCategory('Women', 'Flats & Ballerinas')} className="hover:text-white transition-colors">Ballerinas & Flats</button></li>
            <li><button onClick={() => handleNavCategory('Women', 'Ethnic & Kolhapuris')} className="hover:text-white transition-colors">Silk Embroidered Juttis</button></li>
            <li><button onClick={() => handleNavCategory('Women', 'Bags & Handbags')} className="hover:text-white transition-colors">Quilted Handbags</button></li>
            <li><button onClick={() => handleNavCategory('Women', 'Slippers & Flip Flops')} className="hover:text-white transition-colors">Biofoot Orthopedic Slides</button></li>
          </ul>
        </div>

        {/* Customer Help */}
        <div>
          <h4 className="font-extrabold text-neutral-100 text-sm uppercase tracking-wider mb-3">
            Quick Assistance
          </h4>
          <ul className="space-y-2">
            <li><button onClick={() => setIsTrackOrderOpen(true)} className="hover:text-white transition-colors">Track Order Status</button></li>
            <li><button onClick={() => setIsStoreLocatorOpen(true)} className="hover:text-white transition-colors">100+ Store Locations</button></li>
            <li><button onClick={() => setIsSizeGuideOpen(true)} className="hover:text-white transition-colors">Size Guide & Chart</button></li>
            <li><button onClick={() => addToast('15-Day Free Returns policy: Unworn items with tags can be exchanged easily.', 'info')} className="hover:text-white transition-colors">15-Day Return Policy</button></li>
            <li><button onClick={() => addToast('Metro Brands Heritage: Founded in 1955 in Colaba, Mumbai.', 'info')} className="hover:text-white transition-colors">About Metro Brands</button></li>
          </ul>
        </div>
      </div>

      {/* 4. Bottom Copyright & Trust */}
      <div className="border-t border-neutral-800 py-6 bg-black text-[11px] text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Titaan Footwear. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms & Conditions</span>
            <span>•</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
