export type Gender = 'Men' | 'Women' | 'Kids' | 'Unisex';

export type MainCategory = 
  | 'Casual Shoes'
  | 'Formal Shoes'
  | 'Sneakers'
  | 'Loafers & Moccasins'
  | 'Sandals & Floaters'
  | 'Slippers & Flip Flops'
  | 'Boots'
  | 'Heels & Pumps'
  | 'Wedges'
  | 'Flats & Ballerinas'
  | 'Ethnic & Kolhapuris'
  | 'Bags & Handbags'
  | 'Wallets & Belts'
  | 'Shoe Care & Accessories';

export type Brand = 
  | 'Titaan'
  | 'Titaan Footwear'
  | 'Metro'
  | 'J.Fontini'
  | 'Davinci'
  | 'Fila'
  | 'Crocs'
  | 'Biofoot'
  | 'Zeemo'
  | 'Clarks'
  | 'Skechers';

export type Occasion = 'Casual' | 'Formal' | 'Party' | 'Ethnic' | 'Sports' | 'Work';

export type Material = 'Genuine Leather' | 'Synthetic Leather' | 'Suede' | 'Fabric / Mesh' | 'Croslite / EVA' | 'Canvas';

export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  userCity?: string;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  brand: Brand;
  gender: Gender;
  category: MainCategory;
  price: number; // Sale price
  originalPrice: number; // MRP
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colors: { name: string; hex: string; imageIndex?: number }[];
  sizes: (number | string)[]; // e.g. [6, 7, 8, 9, 10, 11]
  inStock: boolean;
  isBestseller?: boolean;
  isLimitedStock?: boolean;
  isNewArrival?: boolean;
  isSpecialDeal?: boolean;
  description: string;
  features: string[];
  material: Material;
  soleMaterial: string;
  occasion: Occasion;
  heelHeight?: string;
  sku: string;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedSize: number | string;
  selectedColor: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  product: Product;
  addedAt: string;
}

export interface FilterState {
  searchQuery: string;
  gender: Gender[];
  category: MainCategory[];
  brand: Brand[];
  priceRange: [number, number];
  minDiscount: number;
  sizes: (number | string)[];
  colors: string[];
  occasion: Occasion[];
  material: Material[];
  inStockOnly: boolean;
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'discount-desc' | 'rating' | 'newest';
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
}

export interface Address {
  fullName: string;
  mobile: string;
  pincode: string;
  flatHouse: string;
  areaStreet: string;
  city: string;
  state: string;
  addressType: 'Home' | 'Work' | 'Other';
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderDate: string;
  items: CartItem[];
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  totalAmount: number;
  savingsAmount: number;
  status: 'Order Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDeliveryDate: string;
  trackingNumber: string;
  courierPartner: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  timings: string;
  distanceKm?: number;
  isMallStore: boolean;
}
