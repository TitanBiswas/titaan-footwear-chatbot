import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, User, Phone, CheckCircle2, ShieldCheck, ShoppingBag, Heart, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    orders,
    wishlist,
    cart,
    setIsTrackOrderOpen,
    setIsWishlistOpen,
    setIsCartOpen,
    addToast
  } = useShop();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length === 10) {
      setOtpSent(true);
      addToast('OTP sent to +91 ' + mobile + ': 1234', 'info');
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '1234' || otp.length === 4) {
      setIsLoggedIn(true);
      addToast('Logged in successfully as +91 ' + mobile, 'success');
    } else {
      addToast('Invalid OTP. Use demo OTP: 1234', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-200"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-lg">
                {isLoggedIn ? 'My Titaan Profile' : 'Sign In / Register'}
              </h3>
              <p className="text-xs text-neutral-500">
                {isLoggedIn ? 'Manage orders, wishlist & account' : 'Unlock member offers & fast checkout'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!isLoggedIn ? (
            <div>
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">
                      Enter Mobile Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        required
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                        placeholder="98201 23456"
                        className="w-full text-xs font-bold bg-neutral-50 border border-neutral-300 rounded-xl pl-12 pr-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                  >
                    SEND OTP
                  </button>

                  <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1.5 pt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Safe & Secure Login via SMS verification</span>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-neutral-700">Enter 4-Digit OTP</label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(false)}
                        className="text-[11px] text-red-600 font-bold hover:underline"
                      >
                        Change Number
                      </button>
                    </div>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 1234"
                      className="w-full text-center text-lg font-mono font-bold tracking-widest bg-neutral-50 border border-neutral-300 rounded-xl py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                    />
                    <p className="text-[11px] text-neutral-400 mt-1 text-center">
                      Demo OTP: <strong>1234</strong>
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                  >
                    VERIFY & SIGN IN
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
                <p className="font-bold text-neutral-900 text-sm">Rahul Varma</p>
                <p className="text-neutral-500 mt-0.5">+91 {mobile || '9820123456'} • Titaan Club VIP Member</p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setIsTrackOrderOpen(true);
                  }}
                  className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 font-bold text-neutral-800 space-y-1"
                >
                  <ShoppingBag className="w-4 h-4 text-red-600 mx-auto" />
                  <span>Orders ({orders.length})</span>
                </button>

                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setIsWishlistOpen(true);
                  }}
                  className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 font-bold text-neutral-800 space-y-1"
                >
                  <Heart className="w-4 h-4 text-red-600 mx-auto" />
                  <span>Wishlist ({wishlist.length})</span>
                </button>

                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl border border-neutral-200 font-bold text-neutral-800 space-y-1"
                >
                  <ShoppingBag className="w-4 h-4 text-emerald-600 mx-auto" />
                  <span>Bag ({cart.length})</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setOtpSent(false);
                  setMobile('');
                  setOtp('');
                  addToast('Signed out', 'info');
                }}
                className="w-full py-2.5 border border-neutral-300 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-50"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
