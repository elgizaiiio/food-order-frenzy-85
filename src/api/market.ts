
// Interface for the product categories
export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Interface for the product
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: string;
  image: string;
  categoryId: string;
  description?: string;
  inStock: boolean;
}

// Interface for offers
export interface Offer {
  id: string;
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
