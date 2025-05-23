
import { supabase } from "@/integrations/supabase/client";

// تعريف الواجهات
export interface Category {
  id: string;  // تغيير النوع من number إلى string ليتوافق مع قاعدة البيانات
  name: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;  // تغيير النوع من number إلى string ليتوافق مع قاعدة البيانات
  name: string;
  price: number;
  quantity: string;
  image: string;
  categoryId: string;
  description: string;
  inStock: boolean;
}

export interface Offer {
  id: string;  // تغيير النوع من number إلى string ليتوافق مع قاعدة البيانات
  title: string;
  description: string;
  discount: number;
  image: string;
}

/**
 * Get all supermarket categories
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const { data, error } = await supabase
      .from('supermarket_categories')
      .select('*');
    
    if (error) throw error;
    
    // Transform the data to match our Category interface
    return data.map(item => ({
      id: item.id,
      name: item.name,
      description: item.description || '',
      image: item.image_url || 'https://via.placeholder.com/200?text=صورة+غير+متوفرة'
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get products by category
 */
export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('supermarket_products')
      .select('*')
      .eq('category_id', categoryId);
    
    if (error) throw error;
    
    // Transform the data to match our Product interface
    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || '',
      image: item.image_url || 'https://via.placeholder.com/400?text=صورة+غير+متوفرة',
      categoryId: item.category_id || '',
      description: item.description || '',
      inStock: item.stock > 0
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Get special offers
 */
export async function fetchOffers(): Promise<Offer[]> {
  try {
    const { data, error } = await supabase
      .from('supermarket_offers')
      .select('*');
    
    if (error) throw error;
    
    // Transform the data to match our Offer interface
    return data.map(item => ({
      id: item.id,
      title: item.title,
      description: item.description || '',
      discount: item.discount || 0,
      image: item.image_url || 'https://via.placeholder.com/400?text=صورة+غير+متوفرة'
    }));
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
}

/**
 * Get popular products
 */
export async function fetchPopularProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('supermarket_products')
      .select('*')
      .eq('is_popular', true)
      .limit(10);
    
    if (error) throw error;
    
    // Transform the data to match our Product interface
    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity || '',
      image: item.image_url || 'https://via.placeholder.com/400?text=صورة+غير+متوفرة',
      categoryId: item.category_id || '',
      description: item.description || '',
      inStock: item.stock > 0
    }));
  } catch (error) {
    console.error('Error fetching popular products:', error);
    throw error;
  }
}
