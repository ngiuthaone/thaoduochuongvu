export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  images?: string[];
  description: string;
  benefits: string[];
  usage: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  badge?: "mới" | "không hiện" | "hot" | "sắp cháy hàng" | string;
  showOnLanding?: boolean;
}

export interface Category {
  id: string;
  name: string;
  tagline: string;
  image: string;
  showOnLanding?: boolean;
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
  status?: "preparing" | "delivering" | "delivered";
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

export interface ContactData {
  companyName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  footerDesc?: string;
  footerRatingText?: string;
  footerCopyright?: string;
  commitment1Title?: string;
  commitment1Desc?: string;
  commitment2Title?: string;
  commitment2Desc?: string;
  commitment3Title?: string;
  commitment3Desc?: string;
  zaloLink?: string;
  facebookLink?: string;
  tiktokLink?: string;
  bannerBadge?: string;
  bannerSubtitle?: string;
  bannerTitle?: string;
  bannerTagline?: string;
  bannerDesc?: string;
  headerHome?: string;
  headerProducts?: string;
  headerAbout?: string;
  headerContact?: string;
  headerSearch?: string;
  sectionProductsTitle?: string;
  sectionCategoriesTitle?: string;
  showCategoriesSection?: boolean;
  showProductsSection?: boolean;
  showAboutSection?: boolean;
  showContactSection?: boolean;
}

export interface ConsultationRequest {
  id: string;
  name: string;
  phone: string;
  message: string;
  createdAt: string;
  status: "pending" | "called" | "cancelled";
}
