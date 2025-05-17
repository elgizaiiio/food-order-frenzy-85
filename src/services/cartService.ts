
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
    // الحصول على المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.warn('لم يتم تسجيل الدخول، سيتم تخزين السلة محليًا');
      localStorage.setItem(`cart_${type}`, JSON.stringify(items));
      return true;
    }
    
    // إذا كان المستخدم مسجل دخوله، قم بحفظ السلة في قاعدة البيانات (في الإنتاج)
    // الآن نحفظها في التخزين المحلي فقط
    localStorage.setItem(`cart_${type}_${user.id}`, JSON.stringify(items));
    
    // يمكن تنفيذ تخزين العناصر في قاعدة البيانات Supabase هنا
    // مثال:
    // const { error } = await supabase
    //   .from('carts')
    //   .upsert({
    //     user_id: user.id,
    //     type: type,
    //     items: items,
    //     updated_at: new Date()
    //   });
    // if (error) throw error;
    
    return true;
  } catch (error) {
    console.error('خطأ في تخزين السلة:', error);
    return false;
  }
}

// عملية استرجاع عناصر السلة
export async function loadCart(type: string): Promise<CartItem[]> {
  try {
    // نتحقق أولا من التخزين المحلي للسلة العامة
    const savedGeneralCart = localStorage.getItem(`cart_${type}`);
    const generalCart = savedGeneralCart ? JSON.parse(savedGeneralCart) : [];

    // محاولة الحصول على المستخدم الحالي
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // التحقق من وجود سلة خاصة للمستخدم المسجل
      const userCartKey = `cart_${type}_${user.id}`;
      const userCart = localStorage.getItem(userCartKey);
      
      if (userCart) {
        return JSON.parse(userCart);
      }
      
      // يمكن تنفيذ استرجاع العناصر من قاعدة البيانات Supabase هنا
      // مثال:
      // const { data, error } = await supabase
      //   .from('carts')
      //   .select('items')
      //   .eq('user_id', user.id)
      //   .eq('type', type)
      //   .single();
      // if (data && !error) return data.items;
      
      // إذا وجدنا سلة عامة وليس هناك سلة خاصة بالمستخدم، انقل السلة العامة
      if (generalCart.length > 0) {
        await saveCart(type, generalCart);
        localStorage.removeItem(`cart_${type}`);
        return generalCart;
      }
    }
    
    // إذا لم نجد سلة خاصة بالمستخدم، نرجع السلة العامة
    return generalCart;
  } catch (error) {
    console.error('خطأ في استرجاع السلة:', error);
    return [];
  }
}

// عملية مسح السلة
export async function clearCart(type: string): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      localStorage.removeItem(`cart_${type}_${user.id}`);
      
      // يمكن تنفيذ حذف العناصر من قاعدة البيانات Supabase هنا
      // مثال:
      // const { error } = await supabase
      //   .from('carts')
      //   .delete()
      //   .eq('user_id', user.id)
      //   .eq('type', type);
      // if (error) throw error;
    } else {
      localStorage.removeItem(`cart_${type}`);
    }
    return true;
  } catch (error) {
    console.error('خطأ في مسح السلة:', error);
    return false;
  }
}
