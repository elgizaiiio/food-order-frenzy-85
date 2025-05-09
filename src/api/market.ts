
// واجهة فئة المنتجات
export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

// واجهة المنتج
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: string;
  image: string;
  categoryId: number;
  description?: string;
  inStock: boolean;
}

// واجهة العروض
export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: number;
  image: string;
}

// Import the new service functions
import { 
  fetchCategories, 
  fetchProductsByCategory, 
  fetchOffers, 
  fetchPopularProducts 
} from '@/services/marketService';

// Export the functions to maintain the existing API structure
export const getCategories = fetchCategories;
export const getProductsByCategory = fetchProductsByCategory;
export const getOffers = fetchOffers;
export const getPopularProducts = fetchPopularProducts;
