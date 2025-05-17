
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Minus, Plus, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

// واجهة العنصر في السلة
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Mock cart for demonstration
const mockCart: CartItem[] = [
  {
    id: 1,
    name: "برجر لحم بالجبنة",
    price: 35,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    name: "بطاطس مقلية",
    price: 15,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=300&h=200&fit=crop"
  }
];

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRequireLogin, setShowRequireLogin] = useState(false);
  
  const navigate = useNavigate();
  const { isLoggedIn, userName } = useUser();
  const { user } = useAuth();
  
  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        setCart(mockCart);
      }
    } else {
      // Use mock cart for demo if nothing in localStorage
      setCart(mockCart);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Calculate the subtotal
  const subtotal = calculateTotal(cart);
  const delivery = 15; // Fixed delivery fee
  const total = subtotal + delivery;
  
  const updateQuantity = (id: number, delta: number) => {
    setCart(currentCart => 
      currentCart.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } 
          : item
      )
    );
  };
  
  const removeItem = (id: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== id));
    toast.success("تم حذف العنصر من السلة");
  };
  
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
    toast.success("تم تفريغ السلة بنجاح");
  };
  
  // Handle checkout process
  const handleCheckout = async () => {
    if (!user) {
      setShowRequireLogin(true);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // This is where you'd normally process payment, etc.
      // For now, just create an order record in Supabase
      
      // Convert cart items to order items format
      const orderItems = cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      }));
      
      // Create a new order
      const { data, error } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_type: 'restaurant', // Default to restaurant
          status: 'pending',
          items: orderItems,
          total_amount: total
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Clear cart after successful order
      clearCart();
      
      // Navigate to order confirmation
      navigate('/order-confirmation', { 
        state: { 
          orderId: data.id,
          total: total
        }
      });
      
      toast.success("تم تقديم الطلب بنجاح");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("حدث خطأ أثناء إتمام الطلب");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Navigate to login and set return URL
  const handleLoginRedirect = () => {
    // Store current path to redirect back after login
    sessionStorage.setItem('returnUrl', window.location.pathname);
    navigate('/login');
  };
  
  // Empty cart view
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="max-w-md mx-auto bg-white pb-24">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
            <Link to="/" className="text-gray-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">السلة</h1>
            <div className="w-6"></div> {/* For centering */}
          </div>
          
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-lg font-bold mb-2">سلتك فارغة</h2>
            <p className="text-gray-600 mb-6">لم تقم بإضافة أي عناصر إلى سلتك بعد.</p>
            <Link to="/">
              <Button className="bg-blue-600 hover:bg-blue-700">استمرار التسوق</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-28">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">السلة</h1>
          <button 
            onClick={clearCart}
            className="text-red-600 text-sm hover:underline"
          >
            تفريغ السلة
          </button>
        </div>
        
        {/* Cart items */}
        <div className="px-4 py-2">
          {cart.map(item => (
            <div key={item.id} className="flex border-b border-gray-100 py-4">
              {/* Item image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 mr-3">
                <img 
                  src={item.image || `https://picsum.photos/seed/${item.id}/200`} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Item details */}
              <div className="flex-1 px-2">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-blue-600 font-medium mt-1">{item.price.toFixed(2)} ج.م</p>
                
                {/* Quantity controls */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center border rounded-full">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-500"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-blue-500"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Login required alert */}
        {showRequireLogin && (
          <div className="mx-4 my-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5 ml-2" />
            <div>
              <h4 className="font-medium text-yellow-800">تسجيل الدخول مطلوب</h4>
              <p className="text-sm text-yellow-700 mb-2">يجب أن تقوم بتسجيل الدخول لإتمام الطلب</p>
              <Button 
                size="sm" 
                variant="outline" 
                className="border-yellow-300 hover:bg-yellow-100 text-yellow-800"
                onClick={handleLoginRedirect}
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>
        )}
        
        {/* Order summary */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 max-w-md mx-auto">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">المجموع الفرعي:</span>
            <span>{subtotal.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">رسوم التوصيل:</span>
            <span>{delivery.toFixed(2)} ج.م</span>
          </div>
          <div className="flex justify-between font-bold mb-4 pt-2 border-t border-gray-100">
            <span>الإجمالي:</span>
            <span>{total.toFixed(2)} ج.م</span>
          </div>
          
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleCheckout}
            disabled={isLoading}
          >
            {isLoading ? "جاري المعالجة..." : "متابعة الطلب"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
