
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, UtensilsCrossed, ShoppingCart, Pill, Brush, Dumbbell, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type OrderStatus = 'completed' | 'inProgress' | 'cancelled';

interface Order {
  id: string;
  date: string;
  time: string;
  storeName: string;
  amount: string;
  items: number;
  status: OrderStatus;
  category: 'food' | 'market' | 'pharmacy' | 'personalCare' | 'gym';
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-1234',
      date: '١٥ مايو ٢٠٢٣',
      time: '١٢:٣٠ م',
      storeName: 'برجر كينج',
      amount: '٧٨.٥٠ ر.س',
      items: 3,
      status: 'completed',
      category: 'food'
    },
    {
      id: 'ORD-1235',
      date: '١٢ مايو ٢٠٢٣',
      time: '٠٤:١٥ م',
      storeName: 'صيدلية الدواء',
      amount: '١٢٥.٠٠ ر.س',
      items: 2,
      status: 'completed',
      category: 'pharmacy'
    },
    {
      id: 'ORD-1236',
      date: '٠٨ مايو ٢٠٢٣',
      time: '١١:٢٠ ص',
      storeName: 'سوق الدام',
      amount: '٢١٠.٧٥ ر.س',
      items: 7,
      status: 'cancelled',
      category: 'market'
    },
    {
      id: 'ORD-1237',
      date: '٠٥ مايو ٢٠٢٣',
      time: '٠٩:٤٥ م',
      storeName: 'العناية الشخصية',
      amount: '٩٥.٠٠ ر.س',
      items: 2,
      status: 'completed',
      category: 'personalCare'
    },
    {
      id: 'ORD-1238',
      date: 'اليوم',
      time: '٠٢:٣٠ م',
      storeName: 'مطعم الشام',
      amount: '١١٠.٢٥ ر.س',
      items: 4,
      status: 'inProgress',
      category: 'food'
    }
  ]);

  const getCategoryIcon = (category: Order['category']) => {
    switch(category) {
      case 'food': 
        return <UtensilsCrossed className="w-4 h-4 text-red-500" />;
      case 'market': 
        return <ShoppingCart className="w-4 h-4 text-green-500" />;
      case 'pharmacy': 
        return <Pill className="w-4 h-4 text-indigo-500" />;
      case 'personalCare': 
        return <Brush className="w-4 h-4 text-pink-500" />;
      case 'gym': 
        return <Dumbbell className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'completed': 
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inProgress': 
        return <Clock className="w-4 h-4 text-brand-500" />;
      case 'cancelled': 
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch(status) {
      case 'completed': 
        return 'تم التوصيل';
      case 'inProgress': 
        return 'قيد التوصيل';
      case 'cancelled': 
        return 'ملغي';
    }
  };

  const filterOrders = (status: OrderStatus | 'all') => {
    if (status === 'all') return orders;
    return orders.filter(order => order.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 bg-white shadow-sm z-10">
          <Link to="/profile" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">الطلبات السابقة</h1>
          <div className="w-6"></div>
        </div>

        {/* Tabs */}
        <div className="px-4 pt-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="completed">المكتملة</TabsTrigger>
              <TabsTrigger value="inProgress">الجارية</TabsTrigger>
              <TabsTrigger value="cancelled">الملغية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filterOrders('all').map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {filterOrders('completed').map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            
            <TabsContent value="inProgress" className="space-y-4">
              {filterOrders('inProgress').map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
            
            <TabsContent value="cancelled" className="space-y-4">
              {filterOrders('cancelled').map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Order Card Component
interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const getCategoryIcon = (category: Order['category']) => {
    switch(category) {
      case 'food': 
        return <UtensilsCrossed className="w-4 h-4 text-red-500" />;
      case 'market': 
        return <ShoppingCart className="w-4 h-4 text-green-500" />;
      case 'pharmacy': 
        return <Pill className="w-4 h-4 text-indigo-500" />;
      case 'personalCare': 
        return <Brush className="w-4 h-4 text-pink-500" />;
      case 'gym': 
        return <Dumbbell className="w-4 h-4 text-yellow-600" />;
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch(status) {
      case 'completed': 
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inProgress': 
        return <Clock className="w-4 h-4 text-brand-500" />;
      case 'cancelled': 
        return <XCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getStatusText = (status: OrderStatus) => {
    switch(status) {
      case 'completed': 
        return 'تم التوصيل';
      case 'inProgress': 
        return 'قيد التوصيل';
      case 'cancelled': 
        return 'ملغي';
    }
  };

  return (
    <Link to={`/order-details/${order.id}`}>
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
              {getCategoryIcon(order.category)}
            </div>
            <span className="font-medium">{order.storeName}</span>
          </div>
          <span className="text-sm font-semibold text-gray-700">{order.amount}</span>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-2">
            <span>{order.date}</span>
            <span>•</span>
            <span>{order.time}</span>
          </div>
          <span>{order.items} منتجات</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            {getStatusIcon(order.status)}
            <span className={`
              ${order.status === 'completed' ? 'text-green-600' : ''}
              ${order.status === 'inProgress' ? 'text-brand-600' : ''}
              ${order.status === 'cancelled' ? 'text-red-600' : ''}
            `}>
              {getStatusText(order.status)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {order.status === 'completed' && (
              <Button variant="outline" size="sm" className="h-8 text-sm border-gray-200 text-brand-600 hover:text-brand-700">
                طلب مرة أخرى
              </Button>
            )}
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Orders;
