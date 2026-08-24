import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    toggleWishlist,
    moveToCartFromWishlist,
    setActiveProductDetail,
    resetFilters
  } = useShop();

  const [selectedSizes, setSelectedSizes] = useState<Record<string, number | string>>({});

  if (!isWishlistOpen) return null;

  const handleSizeChange = (productId: string, size: number | string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleMoveToBag = (product: Product) => {
    const size = selectedSizes[product.id] || product.sizes[0];
    moveToCartFromWishlist(product, size);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-600 fill-red-600" />
            <h2 className="font-extrabold text-neutral-900 text-lg">
              MY WISHLIST ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          {wishlist.length > 0 ? (
            wishlist.map(({ product }) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl border border-neutral-200 bg-white shadow-2xs space-y-3"
              >
                <div className="flex gap-3.5">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    onClick={() => {
                      setActiveProductDetail(product);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-20 object-cover rounded-xl border border-neutral-100 shrink-0 cursor-pointer"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <span className="text-[10px] font-black uppercase text-neutral-400">
                          {product.brand}
                        </span>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <h4
                        onClick={() => {
                          setActiveProductDetail(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-bold text-xs text-neutral-900 leading-snug line-clamp-1 cursor-pointer hover:text-red-600"
                      >
                        {product.title}
                      </h4>
                    </div>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-sm font-black text-neutral-900">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1 rounded">
                        {product.discountPercentage}% OFF
                      </span>
                    </div>
                  </div>
                </div>

                {/* Size Choice & Move to Bag Button */}
                <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                  <select
                    value={selectedSizes[product.id] || product.sizes[0]}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    className="text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-neutral-800 focus:outline-none focus:border-red-600"
                  >
                    {product.sizes.map((s) => (
                      <option key={s} value={s}>
                        Size {s}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleMoveToBag(product)}
                    className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-red-50 text-red-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-neutral-800 text-base">Your Wishlist is Empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Save your favorite footwear and bags to purchase them during the clearance sale!
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  resetFilters();
                }}
                className="bg-neutral-900 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-black transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          )}
        </div>

        {wishlist.length > 0 && (
          <div className="p-4 border-t border-neutral-200 bg-neutral-50">
            <button
              onClick={() => {
                wishlist.forEach(({ product }) => {
                  const size = selectedSizes[product.id] || product.sizes[0];
                  moveToCartFromWishlist(product, size);
                });
              }}
              className="w-full py-3 bg-neutral-900 hover:bg-black text-white font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>MOVE ALL TO BAG</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
