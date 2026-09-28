export type CategoryId =
  | 'all'
  | 'cookies'
  | 'traditional'
  | 'cakes'
  | 'sweets'
  | 'spicy'
  | 'hampers';

export interface WeightOption {
  label: string;
  weight: string;
  price: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  basePrice: number;
  weightOptions: WeightOption[];
  defaultWeight: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  isVeg: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  rating: number;
  reviewCount: number;
  ingredients: string[];
  prepInfo: string;
  storageInstructions: string;
  allergenInfo: string;
  shelfLife: string;
  reviews: Review[];
}

export interface CartItem {
  cartItemId: string; // productId + weight
  productId: string;
  name: string;
  image: string;
  weight: string;
  unitPrice: number;
  quantity: number;
  isVeg: boolean;
}

export interface CheckoutDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  deliveryNotes: string;
  paymentMethod: 'cod' | 'upi' | 'card';
}

export interface OrderRecord {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customer: CheckoutDetails;
  status: 'Received' | 'Preparing' | 'Out for Delivery';
  estimatedDelivery: string;
}
