
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  type: 'restaurant' | 'market' | 'pharmacy' | 'personal_care' | 'gym';
  options?: Record<string, any>[];
  restaurant_id?: string;
  category_id?: string | number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string | number, type: string) => void;
  increaseQuantity: (id: string | number, type: string) => void;
  decreaseQuantity: (id: string | number, type: string) => void;
  clearCart: () => void;
  clearCartByType: (type: string) => void;
  getItemsByType: (type: string) => CartItem[];
  itemCount: number;
  totalPrice: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // حساب إجمالي العناصر والسعر
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // جلب سلة التسوق من Supabase
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) {
        setIsLoading(false);
        // استخدام LocalStorage للمستخدمين غير المسجلين
        const localCart = localStorage.getItem('unified-cart');
        if (localCart) {
          try {
            setItems(JSON.parse(localCart));
          } catch (error) {
            console.error('خطأ في تحليل سلة التسوق المحلية:', error);
            setItems([]);
          }
        } else {
          setItems([]);
        }
        return;
      }
      
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .eq('status', 'cart')
          .single();
          
        if (error && error.code !== 'PGRST116') { // PGRST116 = لا توجد نتائج
          console.error('خطأ في جلب سلة التسوق:', error);
        }
        
        if (data && data.items) {
          try {
            // تحويل JSON إلى كائنات
            const cartItems = JSON.parse(data.items);
            setItems(Array.isArray(cartItems) ? cartItems : []);
          } catch (error) {
            console.error('خطأ في تحليل عناصر السلة:', error);
            setItems([]);
          }
        } else {
          setItems([]);
        }
      } catch (error) {
        console.error('خطأ في جلب سلة التسوق:', error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCart();
  }, [user]);

  // حفظ سلة التسوق عند تغييرها
  useEffect(() => {
    const saveCart = async () => {
      if (!user) {
        // حفظ في LocalStorage للمستخدمين غير المسجلين
        localStorage.setItem('unified-cart', JSON.stringify(items));
        return;
      }
      
      if (!isLoading) {
        try {
          const { error } = await supabase
            .from('orders')
            .upsert({
              user_id: user.id,
              status: 'cart',
              items: JSON.stringify(items),
              total_amount: totalPrice,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            });
            
          if (error) {
            console.error('خطأ في حفظ سلة التسوق:', error);
          }
        } catch (error) {
          console.error('خطأ في حفظ سلة التسوق:', error);
        }
      }
    };
    
    saveCart();
  }, [items, user, isLoading, totalPrice]);

  // إضافة عنصر إلى السلة
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && item.type === product.type
      );
      
      if (existingItemIndex !== -1) {
        // زيادة كمية العنصر الموجود
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        
        toast(`تمت زيادة كمية ${product.name} في سلة التسوق`);
        return updatedItems;
      } else {
        // إضافة عنصر جديد
        const newItem: CartItem = {
          ...product,
          quantity: 1
        };
        
        toast(`تمت إضافة ${product.name} إلى سلة التسوق`);
        return [...prevItems, newItem];
      }
    });
  };

  // إزالة عنصر من السلة
  const removeFromCart = (id: string | number, type: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => 
        item.id === id && item.type === type
      );
      
      if (itemToRemove) {
        toast(`تمت إزالة ${itemToRemove.name} من سلة التسوق`);
      }
      
      return prevItems.filter(item => !(item.id === id && item.type === type));
    });
  };

  // زيادة كمية عنصر
  const increaseQuantity = (id: string | number, type: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        (item.id === id && item.type === type) 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // إنقاص كمية عنصر
  const decreaseQuantity = (id: string | number, type: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === id && item.type === type
      );
      
      if (existingItem && existingItem.quantity === 1) {
        // إزالة العنصر إذا كانت الكمية ستصبح صفر
        toast(`تمت إزالة ${existingItem.name} من سلة التسوق`);
        return prevItems.filter(item => !(item.id === id && item.type === type));
      }
      
      // تقليل الكمية
      return prevItems.map(item => 
        (item.id === id && item.type === type) 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  // تفريغ السلة
  const clearCart = () => {
    setItems([]);
    toast('تم تفريغ سلة التسوق بالكامل');
  };

  // تفريغ السلة حسب النوع
  const clearCartByType = (type: string) => {
    setItems(prevItems => {
      const filteredItems = prevItems.filter(item => item.type !== type);
      
      if (filteredItems.length < prevItems.length) {
        toast(`تم تفريغ سلة ${getCartTypeName(type)}`);
      }
      
      return filteredItems;
    });
  };

  // الحصول على العناصر حسب النوع
  const getItemsByType = (type: string): CartItem[] => {
    return items.filter(item => item.type === type);
  };

  // الحصول على اسم نوع السلة بالعربية
  const getCartTypeName = (type: string): string => {
    switch (type) {
      case 'restaurant':
        return 'المطاعم';
      case 'market':
        return 'السوبر ماركت';
      case 'pharmacy':
        return 'الصيدلية';
      case 'personal_care':
        return 'العناية الشخصية';
      case 'gym':
        return 'الجيم';
      default:
        return 'التسوق';
    }
  };

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    clearCartByType,
    getItemsByType,
    itemCount,
    totalPrice,
    isLoading
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
