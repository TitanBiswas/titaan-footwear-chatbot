import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  CreditCard, 
  QrCode, 
  Building2, 
  Banknote, 
  CheckCircle2, 
  Truck, 
  ArrowRight, 
  Lock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Address, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartOriginalTotal,
    cartSavings,
    couponDiscountAmount,
    cartFinalTotal,
    deliveryFee,
    appliedCoupon,
    placeOrder,
    setIsTrackOrderOpen
  } = useShop();

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Address Form State
  const [address, setAddress] = useState<Address>({
    fullName: 'Rahul Varma',
    mobile: '9820123456',
    pincode: '400050',
    flatHouse: 'Flat 402, Sea Green Apts',
    areaStreet: 'Hill Road, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    addressType: 'Home'
  });

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('rahul@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 8821 9021 3456');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('321');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (!isCheckoutOpen) return null;

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleFinalPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder(address, paymentMethod);
    setCreatedOrder(order);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col scrollbar-thin"
      >
        {/* Top Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white font-black text-lg px-2.5 py-0.5 rounded">
              TITAAN
            </div>
            <div>
              <h2 className="font-black text-neutral-900 text-base sm:text-lg">
                {step === 'success' ? 'Order Confirmed!' : 'Express Secure Checkout'}
              </h2>
              <p className="text-[11px] text-neutral-500 font-medium">
                {step === 'address' && 'Step 1 of 2: Shipping & Delivery Address'}
                {step === 'payment' && 'Step 2 of 2: Payment & Review'}
                {step === 'success' && 'Your footwear is being packed!'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Address Fields */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-200 text-neutral-900 font-bold text-sm">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>Enter Delivery Address</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      placeholder="e.g. Rahul Varma"
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={address.mobile}
                      onChange={(e) => setAddress({ ...address, mobile: e.target.value })}
                      placeholder="10-digit mobile number"
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">Pincode *</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={address.pincode}
                      onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                      placeholder="e.g. 400050"
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={address.city}
                      onChange={(e) => setAddress({ ...address, city: e.target.value })}
                      placeholder="City / District"
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-700 block mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={address.state}
                      onChange={(e) => setAddress({ ...address, state: e.target.value })}
                      placeholder="State"
                      className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Flat, House No., Building Name *</label>
                  <input
                    type="text"
                    required
                    value={address.flatHouse}
                    onChange={(e) => setAddress({ ...address, flatHouse: e.target.value })}
                    placeholder="e.g. Flat 402, Sea Green Apartments"
                    className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Area, Street, Landmark</label>
                  <input
                    type="text"
                    required
                    value={address.areaStreet}
                    onChange={(e) => setAddress({ ...address, areaStreet: e.target.value })}
                    placeholder="e.g. Near National College, Hill Road"
                    className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-red-600"
                  />
                </div>

                {/* Address Type */}
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1.5">Save Address As:</label>
                  <div className="flex gap-3">
                    {['Home', 'Work', 'Other'].map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setAddress({ ...address, addressType: type as any })}
                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                          address.addressType === type
                            ? 'bg-neutral-900 text-white border-neutral-900'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-300'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Mini Cart Summary */}
              <div className="lg:col-span-5 bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-4">
                <h4 className="font-extrabold text-neutral-900 text-xs uppercase tracking-wider">
                  Order Summary ({cart.length} Items)
                </h4>

                <div className="max-h-52 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-neutral-200">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{item.product.title}</p>
                        <p className="text-[11px] text-neutral-500">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                        <p className="text-xs font-extrabold text-neutral-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Details */}
                <div className="pt-3 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex justify-between">
                    <span>Bag Total:</span>
                    <span>₹{cartSubtotal.toLocaleString()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Coupon Discount:</span>
                      <span>-₹{couponDiscountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Fee:</span>
                    <span className="text-emerald-600 font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-200 text-sm font-black text-neutral-900">
                    <span>Payable Amount:</span>
                    <span className="text-red-600 text-base">₹{cartFinalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleFinalPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Payment Methods */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                  <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
                    <Lock className="w-4 h-4 text-emerald-600" />
                    <span>Select Payment Option</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('address')}
                    className="text-xs text-red-600 font-bold hover:underline"
                  >
                    Edit Address
                  </button>
                </div>

                {/* Payment Options Accordion */}
                <div className="space-y-2.5">
                  {/* 1. UPI */}
                  <div
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'UPI' ? 'border-red-600 bg-red-50/20' : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                          <QrCode className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-extrabold text-neutral-900">UPI Instant Payment</p>
                          <p className="text-[11px] text-neutral-500">Google Pay, PhonePe, Paytm, BHIM</p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Fastest
                      </span>
                    </div>

                    {paymentMethod === 'UPI' && (
                      <div className="mt-3 pt-3 border-t border-neutral-200 space-y-2">
                        <label className="text-[11px] font-bold text-neutral-700">Enter UPI ID / VPA</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@okhdfcbank"
                          className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 focus:outline-none focus:border-red-600"
                        />
                        <p className="text-[10px] text-neutral-500">
                          A payment request will be triggered to your UPI app.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 2. Credit/Debit Card */}
                  <div
                    onClick={() => setPaymentMethod('Card')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'Card' ? 'border-red-600 bg-red-50/20' : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-neutral-900">Credit / Debit Card</p>
                        <p className="text-[11px] text-neutral-500">Visa, MasterCard, RuPay, Diners</p>
                      </div>
                    </div>

                    {paymentMethod === 'Card' && (
                      <div className="mt-3 pt-3 border-t border-neutral-200 space-y-3">
                        <div>
                          <label className="text-[11px] font-bold text-neutral-700 block mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4532 8821 9021 3456"
                            className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="text-[11px] font-bold text-neutral-700 block mb-1">Valid Thru</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 font-mono"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-neutral-700 block mb-1">CVV</label>
                            <input
                              type="password"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="123"
                              className="w-full text-xs bg-white border border-neutral-300 rounded-xl px-3 py-2 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. NetBanking */}
                  <div
                    onClick={() => setPaymentMethod('NetBanking')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'NetBanking' ? 'border-red-600 bg-red-50/20' : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-neutral-900">Net Banking</p>
                        <p className="text-[11px] text-neutral-500">All Major Indian Banks Supported</p>
                      </div>
                    </div>

                    {paymentMethod === 'NetBanking' && (
                      <div className="mt-3 pt-3 border-t border-neutral-200">
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full text-xs bg-white border border-neutral-300 rounded-xl p-2.5 font-bold"
                        >
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="State Bank of India">State Bank of India</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* 4. Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'COD' ? 'border-red-600 bg-red-50/20' : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                        <Banknote className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-neutral-900">Cash on Delivery (COD)</p>
                        <p className="text-[11px] text-neutral-500">Pay cash or UPI to delivery agent</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span>PAY ₹{cartFinalTotal.toLocaleString()} & PLACE ORDER</span>
                </button>
              </div>

              {/* Delivery Address & Price Overview */}
              <div className="lg:col-span-5 space-y-4">
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-200 text-xs">
                  <div className="flex items-center justify-between font-bold text-neutral-900 mb-1">
                    <span>Delivering To:</span>
                    <span className="bg-neutral-200 px-2 py-0.5 rounded text-[10px]">{address.addressType}</span>
                  </div>
                  <p className="font-bold text-neutral-900">{address.fullName}</p>
                  <p className="text-neutral-600 mt-0.5">{address.flatHouse}, {address.areaStreet}</p>
                  <p className="text-neutral-600">{address.city}, {address.state} - {address.pincode}</p>
                  <p className="text-neutral-600 mt-1">Mobile: +91 {address.mobile}</p>
                </div>

                <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3">
                  <h4 className="font-extrabold text-xs text-neutral-900 uppercase">Price Summary</h4>
                  <div className="space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Total MRP:</span>
                      <span className="line-through text-neutral-400">₹{cartOriginalTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 font-bold">
                      <span>Total Savings:</span>
                      <span>-₹{cartSavings.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Coupon Discount:</span>
                        <span>-₹{couponDiscountAmount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Delivery:</span>
                      <span className="text-emerald-600 font-bold">{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-neutral-200 text-base font-black text-neutral-900">
                      <span>Total Payable:</span>
                      <span className="text-red-600">₹{cartFinalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}

          {step === 'success' && createdOrder && (
            <div className="text-center py-6 space-y-6 max-w-lg mx-auto">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md animate-scaleIn">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-neutral-900">Order Confirmed!</h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Thank you for shopping at Titaan Footwear. Your order <strong>{createdOrder.id}</strong> has been successfully placed.
                </p>
              </div>

              <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200 text-xs text-left space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-neutral-500">Tracking AWB:</span>
                  <span className="font-mono font-bold text-neutral-900">{createdOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-neutral-500">Courier Partner:</span>
                  <span className="font-bold text-neutral-900">{createdOrder.courierPartner}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-neutral-500">Estimated Delivery:</span>
                  <span className="font-bold text-emerald-700">{createdOrder.estimatedDeliveryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Payment Status:</span>
                  <span className="font-bold text-neutral-900">{createdOrder.paymentMethod} (Confirmed)</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false);
                    setIsTrackOrderOpen(true);
                  }}
                  className="flex-1 py-3 bg-neutral-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-colors flex items-center justify-center gap-2"
                >
                  <Truck className="w-4 h-4" /> Track This Order
                </button>

                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold text-xs hover:bg-red-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
