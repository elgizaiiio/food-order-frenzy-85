
import { useState, useEffect } from 'react';
import { MenuItem } from '@/services/restaurantService';
import { saveCart, loadCart, clearCart, CartItem } from '@/services/cartService';
import { toast } from '@/hooks/use-toast';

export interface RestaurantCartItem extends MenuItem {
  quantity: number;
  options?: string[];
}

export function useRestaurantCart(restaurantId: string | null = null) {
  const [items, setItems] = useState<RestaurantCartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // حساب إجمالي العناصر والسعر
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // استرجاع عناصر السلة عند تحميل المكون
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const savedCart = await loadCart('restaurant');
        if (savedCart && Array.isArray(savedCart) && savedCart.length > 0) {
          setItems(savedCart as RestaurantCartItem[]);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // حفظ عناصر السلة عند تغييرها
  useEffect(() => {
    if (!loading) {
      saveCart('restaurant', items);
    }
  }, [items, loading]);

  // إضافة منتج إلى السلة
  const addToCart = (item: MenuItem, options?: string[]) => {
    setItems(prevItems => {
      // تحقق إذا كان المنتج موجود بالفعل
      const existingItem = prevItems.find(i => 
        i.id === item.id && 
        // مقارنة الخيارات إذا كانت موجودة
        JSON.stringify(i.options || []) === JSON.stringify(options || [])
      );
      
      let updatedItems;
      
      if (existingItem) {
        // زيادة الكمية إذا كان المنتج موجود بالفعل
        updatedItems = prevItems.map(i => 
          i.id === item.id && 
          JSON.stringify(i.options || []) === JSON.stringify(options || [])
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
        toast(`تمت زيادة كمية ${item.name} في سلة التسوق`);
      } else {
        // إضافة منتج جديد
        const newItem = { 
          ...item, 
          quantity: 1,
          options
        };
        updatedItems = [...prevItems, newItem];
        toast(`تمت إضافة ${item.name} إلى سلة التسوق`);
      }
      
      return updatedItems;
    });
  };

  // إزالة منتج من السلة
  const removeFromCart = (itemId: string, options?: string[]) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => 
        item.id === itemId &&
        JSON.stringify(item.options || []) === JSON.stringify(options || [])
      );
      
      if (itemToRemove) {
        toast(`تمت إزالة ${itemToRemove.name} من سلة التسوق`);
      }
      
      return prevItems.filter(item => 
        !(item.id === itemId && 
          JSON.stringify(item.options || []) === JSON.stringify(options || []))
      );
    });
  };

  // زيادة كمية منتج
  const increaseQuantity = (itemId: string, options?: string[]) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId && 
        JSON.stringify(item.options || []) === JSON.stringify(options || [])
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // إنقاص كمية منتج
  const decreaseQuantity = (itemId: string, options?: string[]) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.id === itemId &&
        JSON.stringify(item.options || []) === JSON.stringify(options || [])
      );
      
      if (existingItem && existingItem.quantity === 1) {
        // إزالة المنتج إذا كانت الكمية ستصبح صفر
        toast(`تمت إزالة ${existingItem.name} من سلة التسوق`);
        return prevItems.filter(item => 
          !(item.id === itemId && 
            JSON.stringify(item.options || []) === JSON.stringify(options || []))
        );
      }
      
      // تقليل الكمية
      return prevItems.map(item => 
        item.id === itemId && 
        JSON.stringify(item.options || []) === JSON.stringify(options || [])
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  // تفريغ السلة بالكامل
  const clearCartItems = () => {
    setItems([]);
    clearCart('restaurant');
    toast('تم تفريغ سلة التسوق بالكامل');
  };

  return {
    items,
    loading,
    itemCount,
    totalPrice,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCartItems
  };
}
