
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/api/market';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category_id: number;
  quantity: number; // هنا الكمية هي رقم وليست نصاً
}

interface MarketCartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const MarketCartContext = createContext<MarketCartContextType | undefined>(undefined);

export const useMarketCart = () => {
  const context = useContext(MarketCartContext);
  if (context === undefined) {
    throw new Error('useMarketCart must be used within a MarketCartProvider');
  }
  return context;
};

export const MarketCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // حساب إجمالي العناصر والسعر
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  // استرجاع عناصر السلة من localStorage عند تحميل الصفحة
  useEffect(() => {
    const savedCart = localStorage.getItem('marketCart');
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
    localStorage.setItem('marketCart', JSON.stringify(items));
  }, [items]);

  // إضافة منتج إلى السلة
  const addToCart = (product: Product) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // زيادة الكمية إذا كان المنتج موجود بالفعل
        const updatedItems = prevItems.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        toast({
          title: "تمت الإضافة",
          description: `تم زيادة كمية ${product.name} في سلة التسوق`,
        });
        return updatedItems;
      } else {
        // إضافة منتج جديد بكمية 1
        toast({
          title: "تمت الإضافة",
          description: `تمت إضافة ${product.name} إلى سلة التسوق`,
        });
        return [...prevItems, { 
          ...product, 
          quantity: 1,
          // تحويل أي حقول غير متوافقة إلى النوع الصحيح
          price: typeof product.price === 'string' ? parseFloat(product.price) : product.price
        }];
      }
    });
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId: number) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        toast({
          title: "تمت الإزالة",
          description: `تمت إزالة ${itemToRemove.name} من سلة التسوق`,
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // زيادة كمية منتج
  const increaseQuantity = (productId: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // إنقاص كمية منتج
  const decreaseQuantity = (productId: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productId);
      
      if (existingItem && existingItem.quantity === 1) {
        // إزالة المنتج إذا كانت الكمية ستصبح صفر
        toast({
          title: "تمت الإزالة",
          description: `تمت إزالة ${existingItem.name} من سلة التسوق`,
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
    toast({
      title: "تم تفريغ السلة",
      description: "تم تفريغ سلة التسوق بالكامل",
    });
  };

  return (
    <MarketCartContext.Provider value={{
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
    </MarketCartContext.Provider>
  );
};

