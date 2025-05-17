
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// واجهة لعنصر السلة
export interface CartItem {
  id: string | number; 
  name: string;
  price: number;
  quantity: number;
  image?: string;
  options?: string[];
}

// عملية تخزين عناصر السلة
export async function saveCart(type: string, items: CartItem[]): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      console.warn('لم يتم تسجيل الدخول، سيتم تخزين السلة محليًا');
      localStorage.setItem(`cart_${type}`, JSON.stringify(items));
      return true;
    }
    
    // إذا كان المستخدم مسجل دخوله، قم بحفظ السلة في قاعدة البيانات (في الإنتاج)
    // الآن نحفظها في التخزين المحلي فقط
    localStorage.setItem(`cart_${type}_${user.id}`, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('خطأ في تخزين السلة:', error);
    return false;
  }
}

// عملية استرجاع عناصر السلة
export function loadCart(type: string): CartItem[] {
  try {
    // التحقق إذا كان المستخدم مسجل دخوله
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    };
    
    const user = getUserData();
    const userId = user ? user.id : null;
    
    if (!userId) {
      const savedCart = localStorage.getItem(`cart_${type}`);
      return savedCart ? JSON.parse(savedCart) : [];
    }
    
    // أحضر السلة المخزنة للمستخدم المحدد
    const savedUserCart = localStorage.getItem(`cart_${type}_${userId}`);
    const savedGeneralCart = localStorage.getItem(`cart_${type}`);
    
    if (savedUserCart) {
      return JSON.parse(savedUserCart);
    } else if (savedGeneralCart) {
      // إذا وجدت سلة عامة، انقلها إلى حساب المستخدم
      const generalCart = JSON.parse(savedGeneralCart);
      saveCart(type, generalCart);
      localStorage.removeItem(`cart_${type}`);
      return generalCart;
    }
    
    return [];
  } catch (error) {
    console.error('خطأ في استرجاع السلة:', error);
    return [];
  }
}

// عملية مسح السلة
export function clearCart(type: string): boolean {
  try {
    // التحقق إذا كان المستخدم مسجل دخوله
    const getUserData = async () => {
      const { data } = await supabase.auth.getUser();
      return data.user;
    };
    
    const user = getUserData();
    const userId = user ? user.id : null;
    
    if (userId) {
      localStorage.removeItem(`cart_${type}_${userId}`);
    } else {
      localStorage.removeItem(`cart_${type}`);
    }
    return true;
  } catch (error) {
    console.error('خطأ في مسح السلة:', error);
    return false;
  }
}
