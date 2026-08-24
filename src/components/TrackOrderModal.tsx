import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Truck, PackageCheck, Clock, MapPin, CheckCircle2, Search, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export const TrackOrderModal: React.FC = () => {
  const { isTrackOrderOpen, setIsTrackOrderOpen, orders } = useShop();
  const [searchAwb, setSearchAwb] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  if (!isTrackOrderOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.id.toLowerCase().includes(searchAwb.trim().toLowerCase()) ||
        o.trackingNumber.toLowerCase().includes(searchAwb.trim().toLowerCase())
    );
    if (found) {
      setSelectedOrder(found);
    }
  };

  const steps = [
    { title: 'Order Placed', desc: 'Verified & Confirmed', completed: true },
    { title: 'Packed at Warehouse', desc: 'Quality Inspected', completed: true },
    { title: 'In Transit', desc: 'Dispatched with Courier', completed: selectedOrder?.status === 'Shipped' || selectedOrder?.status === 'Out for Delivery' || selectedOrder?.status === 'Delivered' },
    { title: 'Out for Delivery', desc: 'Arriving Today', completed: selectedOrder?.status === 'Out for Delivery' || selectedOrder?.status === 'Delivered' },
    { title: 'Delivered', desc: 'Package Handed Over', completed: selectedOrder?.status === 'Delivered' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-lg">Track Your Shipment</h3>
              <p className="text-xs text-neutral-500">Live order status & courier dispatch details</p>
            </div>
          </div>
          <button
            onClick={() => setIsTrackOrderOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchAwb}
                onChange={(e) => setSearchAwb(e.target.value)}
                placeholder="Enter Order ID (e.g. TITN-ORD-98214) or AWB Tracking No"
                className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-red-600 focus:bg-white"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <button
              type="submit"
              className="bg-neutral-900 hover:bg-black text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors"
            >
              Track
            </button>
          </form>

          {selectedOrder ? (
            <div className="space-y-6">
              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-neutral-900 border-b pb-2">
                  <span>Order: {selectedOrder.id}</span>
                  <span className="text-red-600 font-extrabold">{selectedOrder.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-neutral-600">
                  <div>
                    <span className="text-neutral-400 block">Courier Partner</span>
                    <span className="font-bold text-neutral-900">{selectedOrder.courierPartner}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Tracking AWB</span>
                    <span className="font-mono font-bold text-neutral-900">{selectedOrder.trackingNumber}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Order Date</span>
                    <span className="font-bold text-neutral-900">{selectedOrder.orderDate}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Estimated Delivery</span>
                    <span className="font-bold text-emerald-700">{selectedOrder.estimatedDeliveryDate}</span>
                  </div>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="px-2">
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
                  Shipment Progress
                </h4>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
                  {steps.map((st, idx) => (
                    <div key={idx} className="relative flex items-start gap-3">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          st.completed
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-neutral-300 text-neutral-300'
                        }`}
                      >
                        {st.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <h5 className={`text-xs font-bold ${st.completed ? 'text-neutral-900' : 'text-neutral-400'}`}>
                          {st.title}
                        </h5>
                        <p className="text-[11px] text-neutral-500">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ordered Items Preview */}
              <div>
                <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                  Items in this package ({selectedOrder.items.length})
                </h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 bg-neutral-50 rounded-xl border border-neutral-200">
                      <img src={item.product.images[0]} alt={item.product.title} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-neutral-900 truncate">{item.product.title}</p>
                        <p className="text-[11px] text-neutral-500">Size: {item.selectedSize} • Qty: {item.quantity}</p>
                      </div>
                      <span className="text-xs font-extrabold text-neutral-900">
                        ₹{(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No recent orders found.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
