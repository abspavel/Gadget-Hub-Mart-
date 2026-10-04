export type Category = string;

export interface CategoryItem {
  id: string;
  label: string;
  imageUrl: string;
  imageType?: string;
  description?: string;
}

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  avatar?: string;
  verified?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug?: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageType?: string;
  imageUrl?: string;
  images?: string[]; // 2-3 images support
  colors?: (string | ColorOption)[];
  stockCount?: number;
  tag?: string;
  badge?: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isBundle?: boolean;
  sections?: string[];
  isTravel?: boolean;
  description: string; // Used as short description or fallback
  shortDescription?: string;
  fullDescription?: string;
  warranty?: string;
  specs: {
    compatibility: string;
    powerOrOutput?: string;
    material: string;
    dimensions: string;
    warranty: string;
  };
  features: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Currency {
  code: 'USD' | 'EUR' | 'GBP' | 'BDT';
  symbol: string;
  rate: number; // relative to USD
}

export interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
  selectedColor?: string;
  imageUrl?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  thana?: string;
  city?: string;
  deliveryZone?: string;
  paymentMethod?: string;
  items: OrderItem[];
  total: number;
  status: 'Pending' | 'Processing' | 'Sent to Courier' | 'Delivered' | 'Cancelled';
  date: string;
  steadfastTrackingCode?: string;
  steadfastConsignmentId?: string;
  steadfastStatus?: string;
}

export interface IncompleteOrder {
  id: string;
  phone: string;
  customerName?: string;
  address?: string;
  cartSummary: string;
  total: number;
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType?: 'percentage' | 'fixed';
  discountPercentage?: number;
  discountAmount?: number;
  minOrderAmount?: number;
  expiryDate?: string;
  isActive?: boolean;
  usageCount?: number;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  type: 'main' | 'offer' | 'hero';
  linkSection?: string;
  isActive?: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface Subscriber {
  id: string;
  email: string;
  date: string;
}

export interface SteadfastConfig {
  apiKey: string;
  secretKey: string;
  baseUrl?: string;
  isConnected: boolean;
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  thana?: string;
  createdAt: string;
  password?: string;
}
