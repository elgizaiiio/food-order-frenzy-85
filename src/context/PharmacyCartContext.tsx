
import React, { createContext, useContext, useState, useEffect } from 'react';
import { PharmacyProduct } from '@/types/pharmacy';
import { toast } from 'sonner';

interface CartItem extends PharmacyProduct {
  quantity: number;
}

interface PharmacyCartContextType {
  items: CartItem[];
  addToCart: (product: PharmacyProduct) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const PharmacyCartContext = createContext<PharmacyCartContextType | undefined>(undefined);

export const usePharmacyCart = () => {
  const context = useContext(PharmacyCartContext);
  if (context === undefined) {
    throw new Error('usePharmacyCart must be used within a PharmacyCartProvider');
  }
  return context;
};

export const PharmacyCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // حساب إجمالي العناصر والسعر
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // استرجاع عناصر السلة من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedCart = localStorage.getItem('pharmacyCart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // حفظ عناصر السلة في localStorage عند تغييرها
  useEffect(() => {
    localStorage.setItem('pharmacyCart', JSON.stringify(items));
  }, [items]);

  // إضافة منتج إلى السلة
  const addToCart = (product: PharmacyProduct) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // زيادة الكمية إذا كان المنتج موجود بالفعل
        const updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast(`تمت زيادة كمية ${product.name} في سلة التسوق`, {
          position: "top-center",
          className: "bg-blue-600 text-white border-blue-700"
        });
        return updatedItems;
      } else {
        // إضافة منتج جديد بكمية 1
        toast(`تمت إضافة ${product.name} إلى سلة التسوق`, {
          position: "top-center",
          className: "bg-blue-600 text-white border-blue-700"
        });
        return [...prevItems, { ...product, quantity: 1, image: product.image_url }];
      }
    });
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast(`تمت إزالة ${itemToRemove.name} من سلة التسوق`, {
          position: "top-center",
          className: "bg-red-500 text-white"
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // زيادة كمية منتج
  const increaseQuantity = (productId: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // إنقاص كمية منتج
  const decreaseQuantity = (productId: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity === 1) {
        // إزالة المنتج إذا كانت الكمية ستصبح صفر
        toast(`تمت إزالة ${existingItem.name} من سلة التسوق`, {
          position: "top-center",
          className: "bg-red-500 text-white"
        });
        return prevItems.filter(item => item.id !== productId);
      }
      
      // تقليل الكمية
      return prevItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  // تفريغ السلة بالكامل
  const clearCart = () => {
    setItems([]);
    toast('تم تفريغ سلة التسوق بالكامل', {
      position: "top-center",
      className: "bg-blue-600 text-white border-blue-700"
    });
  };

  return (
    <PharmacyCartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      totalPrice
    }}>
      {children}
    </PharmacyCartContext.Provider>
  );
};
