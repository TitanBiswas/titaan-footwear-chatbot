import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    isInWishlist,
    toggleWishlist,
    addToCart,
    setActiveProductDetail,
    setIsCartOpen
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number | string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const currentImage = isHovered && product.images.length > 1 ? product.images[1] : product.images[0];

  const handleQuickAdd = (size: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedSize(size);
    const color = product.colors[0]?.name || 'Standard';
    addToCart(product, size, color, 1);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setActiveProductDetail(product)}
      className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full bg-neutral-50 overflow-hidden">
        <img
          src={currentImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Discount & Deal Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          <span className="bg-red-600 text-white text-[11px] font-black px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
            {product.discountPercentage}% OFF
          </span>
          {product.isBestseller && (
            <span className="bg-neutral-900 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {product.isLimitedStock && (
            <span className="bg-amber-500 text-neutral-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
              Only Few Left
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-transform duration-200 z-10 active:scale-90 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-white/80 text-neutral-600 hover:text-red-600 hover:bg-white'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-600 stroke-red-600' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveProductDetail(product);
            }}
            className="bg-white/95 hover:bg-white text-neutral-900 text-xs font-bold py-1.5 px-3 rounded-lg shadow-md flex items-center gap-1.5 backdrop-blur-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>

        {/* Floating Quick Size Selector on Card Hover */}
        <div className="absolute inset-x-2 bottom-2 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-neutral-200 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <p className="text-[10px] uppercase font-bold text-neutral-500 mb-1.5 text-center">
            {justAdded ? 'Added to Bag!' : 'Select Size for Quick Add'}
          </p>
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                onClick={(e) => handleQuickAdd(size, e)}
                className="w-7 h-7 rounded-lg border border-neutral-300 hover:border-red-600 hover:bg-red-600 hover:text-white text-neutral-800 text-[11px] font-bold transition-colors flex items-center justify-center"
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] uppercase tracking-widest font-black text-neutral-400">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[11px] font-bold px-1.5 py-0.5 rounded border border-emerald-200">
              <span>{product.rating}</span>
              <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
              <span className="text-neutral-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-neutral-900 text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
            {product.title}
          </h3>

          {/* Material & Occasion Tag */}
          <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-1">
            <span>{product.material}</span>
            <span>•</span>
            <span>{product.occasion}</span>
          </div>
        </div>

        {/* Price & Cart Action */}
        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-black text-neutral-900">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold">
              Save ₹{(product.originalPrice - product.price).toLocaleString()}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const defaultSize = product.sizes[0];
              const defaultColor = product.colors[0]?.name || 'Standard';
              addToCart(product, defaultSize, defaultColor, 1);
            }}
            className="p-2 rounded-xl bg-neutral-100 hover:bg-red-600 hover:text-white text-neutral-800 transition-colors"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
