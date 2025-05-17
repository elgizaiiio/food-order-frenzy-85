
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
    
    return data.map(item => ({
      ...item,
      inStock: item.stock > 0,
      category: item.category_id || ''
    })) || [];
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
    
    return data.map(item => ({
      ...item,
      inStock: item.stock > 0,
      category: item.category_id || ''
    })) || [];
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
    
    return data.map(item => ({
      ...item,
      inStock: item.stock > 0,
      category: item.category_id || ''
    })) || [];
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
    // First try to use an RPC function, which would be more efficient
    const { data: rpcData, error: rpcError } = await supabase
      .rpc('get_distinct_category_ids');
    
    // If the RPC exists and works, use it
    if (!rpcError && rpcData) {
      return rpcData as string[];
    }
    
    // Fallback to direct query
    const { data, error } = await supabase
      .from('personal_care_products')
      .select('category_id');
    
    if (error) throw error;
    
    // Create a Set to store unique category IDs
    const categorySet = new Set<string>();
    
    // Process each item and add non-null category_ids to the Set
    if (data) {
      data.forEach(item => {
        if (item.category_id) {
          categorySet.add(String(item.category_id));
        }
      });
    }
    
    // Convert the Set back to an array
    return Array.from(categorySet);
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
}
