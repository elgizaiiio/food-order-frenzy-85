
import { supabase } from "@/integrations/supabase/client";
import { PersonalCareProduct } from "@/types/personalCare";

/**
 * Fetch all personal care products
 */
export async function fetchPersonalCareProducts(): Promise<PersonalCareProduct[]> {
  try {
    const { data, error } = await supabase
      .from('personal_care_products')
      .select('*');
    
    if (error) throw error;
    
    // Ensure we're always returning an array, even if data is null
    return (data || []).map(item => ({
      ...item,
      inStock: item.stock > 0,
      category: item.category_id || ''
    }));
  } catch (error) {
    console.error('Error fetching personal care products:', error);
    throw error;
  }
}

/**
 * Fetch personal care products by category
 */
export async function fetchProductsByCategory(category: string): Promise<PersonalCareProduct[]> {
  try {
    const { data, error } = await supabase
      .from('personal_care_products')
      .select('*')
      .eq('category_id', category);
    
    if (error) throw error;
    
    // Ensure we're always returning an array, even if data is null
    return (data || []).map(item => ({
      ...item,
      inStock: item.stock > 0,
      category: item.category_id || ''
    }));
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
}

/**
 * Fetch personal care products by gender
 */
export async function fetchProductsByGender(gender: string): Promise<PersonalCareProduct[]> {
  try {
    const { data, error } = await supabase
      .from('personal_care_products')
      .select('*')
      .eq('gender', gender);
    
    if (error) throw error;
    
    // Fix the recursive type issue by explicitly defining the return type
    const products: PersonalCareProduct[] = (data || []).map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      description: item.description,
      image_url: item.image_url,
      gender: item.gender,
      stock: item.stock,
      inStock: item.stock > 0,
      category: item.category_id || ''
    }));
    
    return products;
  } catch (error) {
    console.error(`Error fetching products for gender ${gender}:`, error);
    throw error;
  }
}

/**
 * Fetch personal care product by ID
 */
export async function fetchProductById(id: string): Promise<PersonalCareProduct> {
  try {
    const { data, error } = await supabase
      .from('personal_care_products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return {
      ...data,
      inStock: data.stock > 0,
      category: data.category_id || ''
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
}

/**
 * Get unique product categories
 */
export async function fetchProductCategories(): Promise<string[]> {
  try {
    // Use direct query
    const { data, error } = await supabase
      .from('personal_care_products')
      .select('category_id');
    
    if (error) throw error;
    
    // Use Set for unique values
    const categorySet = new Set<string>();
    
    if (data && Array.isArray(data)) {
      data.forEach(item => {
        if (item.category_id) {
          categorySet.add(String(item.category_id));
        }
      });
    }
    
    // Return array of unique categories
    return Array.from(categorySet);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
}
