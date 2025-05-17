
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
    // Using a different approach with raw SQL to avoid type issues
    const { data, error } = await supabase
      .rpc('get_distinct_category_ids');
    
    if (error) throw error;
    
    // The RPC function doesn't exist yet, so as a fallback
    // let's query the table directly but handle the results differently
    if (!data) {
      const { data: rawData, error: rawError } = await supabase
        .from('personal_care_products')
        .select('category_id');
      
      if (rawError) throw rawError;
      
      // Use Set for unique values then convert back to array
      const categorySet = new Set<string>();
      
      rawData.forEach(item => {
        if (item.category_id) {
          categorySet.add(String(item.category_id));
        }
      });
      
      return Array.from(categorySet);
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
}
