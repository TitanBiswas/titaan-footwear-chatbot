import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, WishlistItem, FilterState, Coupon, Order, Gender, MainCategory, Brand, Occasion, Material } from '../types';
import { INITIAL_PRODUCTS, AVAILABLE_COUPONS } from '../data/products';
import confetti from 'canvas-confetti';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: WishlistItem[];
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  quickDealFilter: string | null;
  setQuickDealFilter: (deal: string | null) => void;
  addToCart: (product: Product, selectedSize: number | string, selectedColor: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (product: Product, size: number | string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isStoreLocatorOpen: boolean;
  setIsStoreLocatorOpen: (open: boolean) => void;
  isTrackOrderOpen: boolean;
  setIsTrackOrderOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  orders: Order[];
  placeOrder: (shippingDetails: any, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD') => Order;
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  gridColumns: 2 | 3 | 4;
  setGridColumns: (cols: 2 | 3 | 4) => void;
  filteredProducts: Product[];
  cartSubtotal: number;
  cartOriginalTotal: number;
  cartSavings: number;
  couponDiscountAmount: number;
  cartFinalTotal: number;
  cartCount: number;
  deliveryFee: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  gender: [],
  category: [],
  brand: [],
  priceRange: [499, 7999],
  minDiscount: 0,
  sizes: [],
  colors: [],
  occasion: [],
  material: [],
  inStockOnly: false,
  sortBy: 'popularity'
};

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [quickDealFilter, setQuickDealFilter] = useState<string | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState<boolean>(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(4);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persistent Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('titaan_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Wishlist state
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('titaan_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('titaan_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'TITN-ORD-98214',
          orderDate: '21 Aug 2026',
          items: [
            {
              id: 'sample-1',
              productId: 'titaan-men-01',
              product: INITIAL_PRODUCTS[0],
              selectedSize: 8,
              selectedColor: 'Tan Brown',
              quantity: 1
            }
          ],
          shippingAddress: {
            fullName: 'Rahul Varma',
            mobile: '+91 98201 23456',
            pincode: '400050',
            flatHouse: 'Flat 402, Sea Green Apts',
            areaStreet: 'Hill Road, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            addressType: 'Home'
          },
          paymentMethod: 'UPI',
          totalAmount: 2490,
          savingsAmount: 2500,
          status: 'Shipped',
          estimatedDeliveryDate: '25 Aug 2026',
          trackingNumber: 'TITN-883921944IN',
          courierPartner: 'BlueDart Express'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('titaan_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('titaan_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('titaan_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilterState((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
    setQuickDealFilter(null);
    addToast('Filters reset to default', 'info');
  };

  const addToCart = (product: Product, selectedSize: number | string, selectedColor: string, quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
          productId: product.id,
          product,
          selectedSize,
          selectedColor,
          quantity
        };
        return [...prev, newItem];
      }
    });

    addToast(`Added ${product.title.slice(0, 30)}... (Size ${selectedSize}) to Bag`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    addToast('Item removed from shopping bag', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.productId === product.id);
      if (exists) {
        addToast(`Removed from Wishlist`, 'info');
        return prev.filter((item) => item.productId !== product.id);
      } else {
        addToast(`Saved to Wishlist!`, 'success');
        return [...prev, { productId: product.id, product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const moveToCartFromWishlist = (product: Product, size: number | string) => {
    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, size, defaultColor, 1);
    setWishlist((prev) => prev.filter((item) => item.productId !== product.id));
  };

  const applyCoupon = (code: string) => {
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try TITAAN50, EXTRA10, or METRO200.' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return { success: false, message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}. Add more items!` };
    }

    setAppliedCoupon(found);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
    addToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: `Coupon applied: ${found.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Filter computation
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.occasion.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Gender
      if (filterState.gender.length > 0 && !filterState.gender.includes(p.gender) && p.gender !== 'Unisex') {
        return false;
      }

      // Category
      if (filterState.category.length > 0 && !filterState.category.includes(p.category)) {
        return false;
      }

      // Brand
      if (filterState.brand.length > 0 && !filterState.brand.includes(p.brand)) {
        return false;
      }

      // Price Range
      if (p.price < filterState.priceRange[0] || p.price > filterState.priceRange[1]) {
        return false;
      }

      // Discount
      if (filterState.minDiscount > 0 && p.discountPercentage < filterState.minDiscount) {
        return false;
      }

      // Sizes
      if (filterState.sizes.length > 0) {
        const hasMatchingSize = p.sizes.some((s) => filterState.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }

      // Occasion
      if (filterState.occasion.length > 0 && !filterState.occasion.includes(p.occasion)) {
        return false;
      }

      // Material
      if (filterState.material.length > 0 && !filterState.material.includes(p.material)) {
        return false;
      }

      // In stock
      if (filterState.inStockOnly && !p.inStock) {
        return false;
      }

      // Quick Deal filters
      if (quickDealFilter) {
        if (quickDealFilter === 'flat50' && p.discountPercentage < 50) return false;
        if (quickDealFilter === 'under1499' && p.price > 1499) return false;
        if (quickDealFilter === 'under1999' && p.price > 1999) return false;
        if (quickDealFilter === 'bestseller' && !p.isBestseller) return false;
        if (quickDealFilter === 'leather' && p.material !== 'Genuine Leather') return false;
        if (quickDealFilter === 'heels' && p.category !== 'Heels & Pumps' && p.category !== 'Wedges') return false;
        if (quickDealFilter === 'sneakers' && p.category !== 'Sneakers') return false;
      }

      return true;
    }).sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'discount-desc':
          return b.discountPercentage - a.discountPercentage;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return b.id.localeCompare(a.id);
        case 'popularity':
        default:
          return b.reviewsCount - a.reviewsCount;
      }
    });
  }, [products, filterState, quickDealFilter]);

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [cart]);

  const cartOriginalTotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.originalPrice * item.quantity, 0);
  }, [cart]);

  const freeShippingThreshold = 999;
  const deliveryFee = cartSubtotal >= freeShippingThreshold || cartSubtotal === 0 ? 0 : 99;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const couponDiscountAmount = useMemo(() => {
    if (!appliedCoupon || cartSubtotal === 0) return 0;
    if (appliedCoupon.discountType === 'flat') {
      return appliedCoupon.discountValue;
    }
    if (appliedCoupon.discountType === 'percentage') {
      const calc = (cartSubtotal * appliedCoupon.discountValue) / 100;
      return appliedCoupon.maxDiscount ? Math.min(calc, appliedCoupon.maxDiscount) : calc;
    }
    return 0;
  }, [appliedCoupon, cartSubtotal]);

  const cartFinalTotal = Math.max(0, cartSubtotal - couponDiscountAmount + deliveryFee);
  const cartSavings = cartOriginalTotal - cartFinalTotal;
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const placeOrder = (shippingDetails: any, paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD'): Order => {
    const newOrder: Order = {
      id: `TITN-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      orderDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      shippingAddress: shippingDetails,
      paymentMethod,
      totalAmount: cartFinalTotal,
      savingsAmount: cartSavings,
      status: 'Order Placed',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      trackingNumber: `TITN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      courierPartner: 'BlueDart Express / Delhivery Air'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setIsCheckoutOpen(false);

    try {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch {}

    addToast(`🎉 Order ${newOrder.id} Placed Successfully!`, 'success');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        filterState,
        setFilterState,
        updateFilter,
        resetFilters,
        quickDealFilter,
        setQuickDealFilter,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        activeProductDetail,
        setActiveProductDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStoreLocatorOpen,
        setIsStoreLocatorOpen,
        isTrackOrderOpen,
        setIsTrackOrderOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        orders,
        placeOrder,
        toasts,
        addToast,
        removeToast,
        gridColumns,
        setGridColumns,
        filteredProducts,
        cartSubtotal,
        cartOriginalTotal,
        cartSavings,
        couponDiscountAmount,
        cartFinalTotal,
        cartCount,
        deliveryFee,
        freeShippingThreshold,
        amountNeededForFreeShipping
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
