import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  RefreshCw, 
  ShieldCheck, 
  Tag, 
  Ruler, 
  Share2, 
  Check, 
  MapPin,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProductDetailModal: React.FC = () => {
  const {
    activeProductDetail,
    setActiveProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsSizeGuideOpen,
    products,
    addToast
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  if (!activeProductDetail) return null;

  const product = activeProductDetail;
  const isFavorited = isInWishlist(product.id);
  const currentColor = selectedColor || product.colors[0]?.name || 'Standard';
  const currentSize = selectedSize || product.sizes[0];

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus('valid');
    } else {
      setPincodeStatus('invalid');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Check out ${product.title} on Titaan Footwear Sale for ₹${product.price}!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const similarProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col scrollbar-thin"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveProductDetail(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 z-20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8">
            {/* Left Column: Image Gallery */}
            <div className="lg:col-span-6 space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-neutral-200">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-xs uppercase">
                    {product.discountPercentage}% OFF
                  </span>
                  {product.isBestseller && (
                    <span className="bg-neutral-900 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded uppercase">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-white/90 text-neutral-700 hover:text-neutral-900 hover:bg-white shadow-md transition-all"
                    title="Share"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-2.5 rounded-full shadow-md transition-all ${
                      isFavorited
                        ? 'bg-red-50 text-red-600'
                        : 'bg-white/90 text-neutral-700 hover:text-red-600 hover:bg-white'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                        activeImageIndex === idx
                          ? 'border-red-600 ring-2 ring-red-100'
                          : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Details & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                {/* Brand & SKU */}
                <div className="flex items-center justify-between text-xs text-neutral-400 font-bold uppercase tracking-wider mb-1">
                  <span className="text-red-600">{product.brand}</span>
                  <span>SKU: {product.sku}</span>
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 leading-snug">
                  {product.title}
                </h1>

                {/* Rating review row */}
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center gap-1 bg-emerald-700 text-white text-xs font-bold px-2 py-0.5 rounded">
                    <span>{product.rating}</span>
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                  <span className="text-xs text-neutral-500 font-medium">
                    {product.reviewsCount} Ratings & {product.reviews.length || 12} Verified Reviews
                  </span>
                </div>

                {/* Price Section */}
                <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-neutral-900">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <span className="text-base text-neutral-400 line-through font-semibold">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  </div>
                  <p className="text-xs text-emerald-600 font-bold mt-1">
                    You save ₹{(product.originalPrice - product.price).toLocaleString()} (Inclusive of all taxes)
                  </p>
                </div>

                {/* Color Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
                        Color: <span className="text-red-600 capitalize">{currentColor}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {product.colors.map((c, idx) => (
                        <button
                          key={c.name}
                          onClick={() => {
                            setSelectedColor(c.name);
                            if (c.imageIndex !== undefined && product.images[c.imageIndex]) {
                              setActiveImageIndex(c.imageIndex);
                            }
                          }}
                          className={`w-9 h-9 rounded-full border-2 p-0.5 transition-all flex items-center justify-center ${
                            currentColor === c.name ? 'border-red-600 ring-2 ring-red-100 scale-110' : 'border-neutral-300'
                          }`}
                          title={c.name}
                        >
                          <span
                            className="w-full h-full rounded-full border border-black/10"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector with Size Chart */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-extrabold text-neutral-800 uppercase tracking-wider">
                      Select Size (UK/IND): <span className="text-red-600">{currentSize}</span>
                    </span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 hover:underline"
                    >
                      <Ruler className="w-3.5 h-3.5" /> Size Guide
                    </button>
                  </div>

                  <div className="grid grid-cols-6 gap-2">
                    {product.sizes.map((size) => {
                      const isSelected = currentSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`py-2.5 rounded-xl font-bold text-sm border transition-all text-center ${
                            isSelected
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                              : 'bg-white text-neutral-800 border-neutral-200 hover:border-red-500'
                          }`}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" /> ADD TO BAG
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm border transition-all flex items-center justify-center gap-2 ${
                      isFavorited
                        ? 'bg-red-50 border-red-200 text-red-600'
                        : 'bg-white border-neutral-300 text-neutral-800 hover:bg-neutral-50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                    {isFavorited ? 'WISHLISTED' : 'SAVE TO WISHLIST'}
                  </button>
                </div>

                {/* Delivery & Pincode Checker */}
                <div className="mt-6 p-4 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                    <Truck className="w-4 h-4 text-red-600" />
                    <span>Check Delivery & Cash on Delivery</span>
                  </div>

                  <form onSubmit={handleCheckPincode} className="flex gap-2">
                    <input
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      placeholder="Enter 6-digit Pincode (e.g. 400050)"
                      className="flex-1 text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:border-red-600 font-semibold"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 hover:bg-black text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors"
                    >
                      Check
                    </button>
                  </form>

                  {pincodeStatus === 'valid' && (
                    <div className="text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 space-y-1">
                      <div className="font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Delivery Available for {pincode}!
                      </div>
                      <p className="text-neutral-600">
                        • Express Delivery in <strong>2-3 Business Days</strong>
                      </p>
                      <p className="text-neutral-600">• Cash on Delivery Available</p>
                      <p className="text-neutral-600">• 15-Day Free Doorstep Return & Exchange</p>
                    </div>
                  )}

                  {pincodeStatus === 'invalid' && (
                    <p className="text-xs text-red-600 font-semibold">
                      Please enter a valid 6-digit postal pincode.
                    </p>
                  )}
                </div>

                {/* Promotional Offers Box */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
                    <Tag className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">Bank Offer:</span> 10% Instant Discount on HDFC & ICICI Credit Cards up to ₹750.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs">
                    <Tag className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-neutral-900">Special Coupon:</span> Use code <strong>TITAAN50</strong> on cart for flat 50% discount.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tabs: Description, Specs, Reviews */}
          <div className="border-t border-neutral-200 p-6 sm:p-8 bg-neutral-50/50">
            <div className="flex items-center gap-4 border-b border-neutral-200 pb-3 text-sm font-bold">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'details' ? 'border-red-600 text-red-600' : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-colors ${
                  activeTab === 'specs' ? 'border-red-600 text-red-600' : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                Specifications & Care
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-colors flex items-center gap-1 ${
                  activeTab === 'reviews' ? 'border-red-600 text-red-600' : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <span>Reviews</span>
                <span className="bg-neutral-200 text-neutral-700 text-xs px-1.5 py-0.2 rounded-full">
                  {product.reviews.length || 2}
                </span>
              </button>
            </div>

            <div className="py-4">
              {activeTab === 'details' && (
                <div className="space-y-4 text-sm text-neutral-700">
                  <p className="leading-relaxed">{product.description}</p>
                  <div>
                    <h4 className="font-bold text-neutral-900 mb-2">Key Highlights:</h4>
                    <ul className="list-disc list-inside space-y-1 text-xs text-neutral-600">
                      {product.features.map((feat, idx) => (
                        <li key={idx}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-neutral-400 block font-bold">Material</span>
                    <span className="font-bold text-neutral-900">{product.material}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-neutral-400 block font-bold">Sole Material</span>
                    <span className="font-bold text-neutral-900">{product.soleMaterial}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-neutral-400 block font-bold">Occasion</span>
                    <span className="font-bold text-neutral-900">{product.occasion}</span>
                  </div>
                  <div className="bg-white p-3 rounded-xl border">
                    <span className="text-neutral-400 block font-bold">Warranty</span>
                    <span className="font-bold text-neutral-900">1 Month Manufacturing Warranty</span>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  {product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div key={rev.id} className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-neutral-900">{rev.userName}</span>
                            {rev.verifiedPurchase && (
                              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
                                Verified Buyer
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-neutral-400">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-neutral-700 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-neutral-500 text-xs">
                      <p>Be the first verified customer to write a review for this footwear!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Similar Products */}
            {similarProducts.length > 0 && (
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h4 className="font-black text-neutral-900 text-sm mb-4">YOU MAY ALSO LIKE</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {similarProducts.map((sim) => (
                    <div
                      key={sim.id}
                      onClick={() => {
                        setActiveProductDetail(sim);
                        setActiveImageIndex(0);
                      }}
                      className="flex items-center gap-3 p-2 bg-white rounded-xl border border-neutral-200 cursor-pointer hover:border-red-600 transition-all"
                    >
                      <img src={sim.images[0]} alt={sim.title} className="w-14 h-14 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{sim.title}</p>
                        <p className="text-xs font-extrabold text-red-600 mt-0.5">₹{sim.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
