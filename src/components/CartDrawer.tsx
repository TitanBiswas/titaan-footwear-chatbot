import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  Check,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AVAILABLE_COUPONS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartOriginalTotal,
    cartSavings,
    couponDiscountAmount,
    cartFinalTotal,
    deliveryFee,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    resetFilters
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (code: string) => {
    const res = applyCoupon(code);
    if (res.success) {
      setCouponMsg({ text: res.message, isError: false });
      setCouponCodeInput('');
    } else {
      setCouponMsg({ text: res.message, isError: true });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="w-full max-w-md bg-white h-full flex flex-col justify-between shadow-2xl relative"
      >
        {/* Top Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-red-600" />
            <h2 className="font-extrabold text-neutral-900 text-lg">
              SHOPPING BAG ({cart.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="bg-amber-50 p-3.5 border-b border-amber-200">
          {amountNeededForFreeShipping > 0 ? (
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-700" /> Add ₹{amountNeededForFreeShipping} more for FREE Delivery!
                </span>
                <span>{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Congratulations! You have unlocked <strong>FREE Express Delivery</strong>.</span>
            </div>
          )}
        </div>

        {/* Middle: Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 rounded-2xl border border-neutral-200 bg-white shadow-2xs relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-20 h-20 object-cover rounded-xl border border-neutral-100 shrink-0"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase text-neutral-400">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h4 className="font-bold text-xs text-neutral-900 leading-snug line-clamp-1">
                      {item.product.title}
                    </h4>

                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                      <span className="bg-neutral-100 px-1.5 py-0.5 rounded font-semibold text-neutral-700">
                        Size: {item.selectedSize}
                      </span>
                      <span>Color: {item.selectedColor}</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                    <div className="flex items-center border border-neutral-200 rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-neutral-100 text-neutral-600 rounded-l-lg"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold text-neutral-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-neutral-100 text-neutral-600 rounded-r-lg"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-black text-neutral-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                      <span className="text-[11px] text-neutral-400 line-through block">
                        ₹{(item.product.originalPrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-neutral-800 text-base">Your shopping bag is empty</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Explore our big clearance sale with flat 50% discount on 2,000+ shoes and bags!
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  resetFilters();
                }}
                className="bg-red-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-red-700 transition-colors inline-block"
              >
                Explore Sale Footwear
              </button>
            </div>
          )}

          {/* Coupon Code Section */}
          {cart.length > 0 && (
            <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                <Tag className="w-3.5 h-3.5 text-red-600" />
                <span>Apply Promo Coupon</span>
              </div>

              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div>
                    <span className="font-mono font-black text-emerald-800">{appliedCoupon.code}</span>
                    <span className="text-emerald-700 block text-[11px] font-medium">
                      {appliedCoupon.description} (-₹{couponDiscountAmount.toLocaleString()})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (couponCodeInput) handleApplyCoupon(couponCodeInput);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={couponCodeInput}
                      onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                      placeholder="Enter code (e.g. TITAAN50)"
                      className="flex-1 text-xs uppercase bg-white border border-neutral-300 rounded-xl px-3 py-2 font-mono font-bold focus:outline-none focus:border-red-600"
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-black transition-colors"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Quick Coupon Chips */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {AVAILABLE_COUPONS.slice(0, 3).map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleApplyCoupon(c.code)}
                        className="text-[10px] font-mono font-bold bg-white text-neutral-700 border border-neutral-300 hover:border-red-600 hover:text-red-600 px-2 py-1 rounded-md transition-colors"
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>

                  {couponMsg && (
                    <p className={`text-xs mt-2 font-semibold ${couponMsg.isError ? 'text-red-600' : 'text-emerald-600'}`}>
                      {couponMsg.text}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Checkout Action Box */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3">
            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex items-center justify-between">
                <span>Total MRP:</span>
                <span className="line-through text-neutral-400">₹{cartOriginalTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Bag Discount:</span>
                <span className="text-emerald-600 font-bold">-₹{(cartOriginalTotal - cartSubtotal).toLocaleString()}</span>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount ({appliedCoupon.code}):</span>
                  <span>-₹{couponDiscountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span>Delivery Fee:</span>
                <span className={deliveryFee === 0 ? 'text-emerald-600 font-bold' : 'font-bold'}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-sm font-black text-neutral-900">
                <span>Total Amount:</span>
                <span className="text-base text-red-600">₹{cartFinalTotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Secure Checkout with 256-bit Encryption</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
