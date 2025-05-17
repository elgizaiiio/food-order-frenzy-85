
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
    // نتحقق أولا من التخزين المحلي للسلة العامة
    const savedGeneralCart = localStorage.getItem(`cart_${type}`);
    const generalCart = savedGeneralCart ? JSON.parse(savedGeneralCart) : [];

    // محاولة الحصول على المستخدم الحالي
    // نلاحظ: هذا يرجع Promise لذلك لا نستطيع استخدامه مباشرة هنا
    // لكن يمكن التعامل مع الحالة الأساسية
    
    // التحقق من وجود سلة خاصة للمستخدم المسجل
    // نفحص وجود بيانات في localStorage باسم المستخدم
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(`cart_${type}_`)) {
        const userCart = localStorage.getItem(key);
        if (userCart) {
          return JSON.parse(userCart);
        }
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
    } else {
      localStorage.removeItem(`cart_${type}`);
    }
    return true;
  } catch (error) {
    console.error('خطأ في مسح السلة:', error);
    return false;
  }
}
