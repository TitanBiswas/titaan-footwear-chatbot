/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { SaleHeroBanner } from './components/SaleHeroBanner';
import { ProductList } from './components/ProductList';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreLocatorModal } from './components/StoreLocatorModal';
import { TrackOrderModal } from './components/TrackOrderModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AuthModal } from './components/AuthModal';
import { Chatbot } from './components/Chatbot';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <ShopProvider>
      <div className="min-h-screen bg-neutral-100 text-neutral-900 font-sans flex flex-col selection:bg-red-600 selection:text-white">
        {/* Navigation & Header */}
        <Navbar />

        {/* Hero Clearance Banner & Deal Tabs */}
        <main className="flex-1">
          <SaleHeroBanner />
          <ProductList />
        </main>

        {/* Modals, Drawers and Concierge Chatbot */}
        <ProductDetailModal />
        <CartDrawer />
        <WishlistDrawer />
        <CheckoutModal />
        <StoreLocatorModal />
        <TrackOrderModal />
        <SizeGuideModal />
        <AuthModal />
        <Chatbot />
        <ToastContainer />

        {/* Global Footer */}
        <Footer />
      </div>
    </ShopProvider>
  );
}
