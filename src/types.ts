export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  benefits: string[];
  usage: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  fullName: string;
  phoneNumber: string;
  address: string;
  note: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  totalAmount: number;
  createdAt: string;
}

export interface AboutUsData {
  subtitle: string;
  title: string;
  description: string;
  quote: string;
  paragraph1: string;
  paragraph2: string;
  statNumber: string;
  statLabel: string;
}
