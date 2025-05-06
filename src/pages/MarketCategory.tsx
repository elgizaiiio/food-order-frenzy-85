
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, Share, ShoppingCart, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MarketCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Mock categories mapping to get the current category name
  const categories: Record<string, string> = {
    '1': 'المشروبات',
    '2': 'القهوة والشاي',
    '3': 'الحليب',
    '4': 'منتجات الألبان',
    '5': 'إضافات الطعام',
  };

  // Mock products data - in a real app, this would come from Supabase based on the category ID
  const products = [
    { 
      id: 1, 
      name: 'كوكاكولا', 
      price: 6, 
      quantity: '330 مل', 
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400&h=400' 
    },
    { 
      id: 2, 
      name: 'بيبسي', 
      price: 5.5, 
      quantity: '330 مل', 
      image: 'https://images.unsplash.com/photo-1629203432180-71e9b1b8742c?auto=format&fit=crop&q=80&w=400&h=400' 
    },
    { 
      id: 3, 
      name: 'سفن أب', 
      price: 5.5, 
      quantity: '330 مل', 
      image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&q=80&w=400&h=400' 
    },
    { 
      id: 4, 
      name: 'عصير برتقال', 
      price: 12, 
      quantity: '1 لتر', 
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400&h=400' 
    },
    { 
      id: 5, 
      name: 'عصير تفاح', 
      price: 11, 
      quantity: '1 لتر', 
      image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?auto=format&fit=crop&q=80&w=400&h=400' 
    },
    { 
      id: 6, 
      name: 'ماء معدني', 
      price: 2, 
      quantity: '600 مل', 
      image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=400&h=400' 
    },
  ];

  const categoryName = categories[id || '1'] || 'القسم';

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/market" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{categoryName}</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-36 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.quantity}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{product.price} ريال</span>
                    <Button size="sm" className="text-xs py-1 px-2 bg-brand-500">
                      <Plus className="w-4 h-4 mr-1" />
                      إضافة
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Floating Button */}
        <div className="fixed bottom-6 left-4 z-20">
          <Link to="/market/cart">
            <Button className="rounded-full w-14 h-14 bg-brand-500 hover:bg-brand-600 shadow-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarketCategory;
