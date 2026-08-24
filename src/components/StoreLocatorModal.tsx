import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { STORE_LOCATIONS } from '../data/products';
import { X, MapPin, Phone, Clock, Navigation, Search, Building } from 'lucide-react';
import { motion } from 'motion/react';

export const StoreLocatorModal: React.FC = () => {
  const { isStoreLocatorOpen, setIsStoreLocatorOpen } = useShop();
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isStoreLocatorOpen) return null;

  const cities = ['All', 'Mumbai', 'New Delhi', 'Bengaluru', 'Kolkata', 'Chennai', 'Hyderabad'];

  const filteredStores = STORE_LOCATIONS.filter((st) => {
    if (selectedCity !== 'All' && st.city !== selectedCity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        st.name.toLowerCase().includes(q) ||
        st.address.toLowerCase().includes(q) ||
        st.city.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-neutral-200 flex flex-col"
      >
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50 sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-red-100 text-red-600 rounded-xl">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-neutral-900 text-lg">Titaan Store Locator</h3>
              <p className="text-xs text-neutral-500">Visit our 100+ stores across major Indian cities</p>
            </div>
          </div>
          <button
            onClick={() => setIsStoreLocatorOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-neutral-100 space-y-3 bg-white">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by city, locality, or mall name..."
              className="w-full text-xs bg-neutral-50 border border-neutral-300 rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-red-600 focus:bg-white"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                  selectedCity === city
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Stores List */}
        <div className="p-6 space-y-4 overflow-y-auto flex-1">
          {filteredStores.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="p-4 rounded-2xl border border-neutral-200 hover:border-red-600 hover:shadow-md transition-all bg-white flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <h4 className="font-extrabold text-sm text-neutral-900">{store.name}</h4>
                      {store.isMallStore && (
                        <span className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shrink-0">
                          <Building className="w-3 h-3" /> Mall
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-600 leading-relaxed mb-3">{store.address}</p>
                    
                    <div className="space-y-1 text-xs text-neutral-500">
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{store.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{store.timings}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-600">● Open Now</span>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.name + ' ' + store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5" /> Get Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500 text-xs">
              No stores found matching your search.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
