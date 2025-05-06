
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Share, Search, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type SizeOption = 'S' | 'M' | 'L' | 'XL';

interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  sizes: SizeOption[];
  image: string;
}

const ClothesCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedSizes, setSelectedSizes] = useState<Record<number, SizeOption>>({});

  // Mock products data for each category
  const productsByCategory: Record<string, { title: string; products: Product[] }> = {
    'girls': {
      title: 'ملابس بناتي',
      products: [
        { id: 1, name: 'قميص أنيق', type: 'قميص', price: 150, sizes: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1583744946564-b52d01c96e19?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 2, name: 'فستان صيفي', type: 'فستان', price: 250, sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 3, name: 'بلوزة كاجوال', type: 'بلوزة', price: 120, sizes: ['M', 'L'], image: 'https://images.unsplash.com/photo-1560829244-984447ed7985?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 4, name: 'بنطلون جينز', type: 'بنطلون', price: 200, sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=300&h=400' },
      ]
    },
    'boys': {
      title: 'ملابس ولادي',
      products: [
        { id: 5, name: 'قميص كاجوال', type: 'قميص', price: 140, sizes: ['M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 6, name: 'تيشيرت قطني', type: 'تيشيرت', price: 90, sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 7, name: 'بنطلون رياضي', type: 'بنطلون', price: 180, sizes: ['M', 'L'], image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 8, name: 'جاكيت خفيف', type: 'جاكيت', price: 280, sizes: ['M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=300&h=400' },
      ]
    },
    'kids': {
      title: 'ملابس أطفال',
      products: [
        { id: 9, name: 'بيجامة أطفال', type: 'بيجامة', price: 120, sizes: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 10, name: 'فستان بناتي', type: 'فستان', price: 150, sizes: ['S', 'M'], image: 'https://images.unsplash.com/photo-1602250698774-469b27ce339c?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 11, name: 'تيشيرت مطبوع', type: 'تيشيرت', price: 85, sizes: ['S', 'M'], image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 12, name: 'شورت رياضي', type: 'شورت', price: 95, sizes: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1619182597083-17bda72c5d1c?auto=format&fit=crop&q=80&w=300&h=400' },
      ]
    },
    'sportswear': {
      title: 'ملابس رياضية',
      products: [
        { id: 13, name: 'بنطلون رياضي', type: 'بنطلون', price: 200, sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1556633640-8c0989d74fe6?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 14, name: 'تيشيرت رياضي', type: 'تيشيرت', price: 120, sizes: ['M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 15, name: 'سويت شيرت', type: 'سترة', price: 230, sizes: ['S', 'M', 'L'], image: 'https://images.unsplash.com/photo-1565317058474-8ef05f4ebe97?auto=format&fit=crop&q=80&w=300&h=400' },
        { id: 16, name: 'شورت رياضي', type: 'شورت', price: 140, sizes: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1565019011521-b0d5ce115424?auto=format&fit=crop&q=80&w=300&h=400' },
      ]
    }
  };

  const categoryData = categoryId ? productsByCategory[categoryId] : null;
  
  const handleSizeSelect = (productId: number, size: SizeOption) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const addToCart = (product: Product) => {
    // In a real app, you would dispatch to a cart context/store
    // For now, we'll just navigate to the cart page
    console.log(`Added product ${product.id} with size ${selectedSizes[product.id]} to cart`);
  };

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/clothes" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">{categoryData.title}</h1>
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
            {categoryData.products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.type}</p>
                  <div className="flex gap-2 mb-3">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                          ${selectedSizes[product.id] === size 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-800'}`}
                        onClick={() => handleSizeSelect(product.id, size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{product.price} ريال</span>
                    <Button 
                      size="sm" 
                      className="text-xs py-1 px-3 bg-blue-500"
                      onClick={() => addToCart(product)}
                      disabled={!selectedSizes[product.id]}
                    >
                      أضف إلى السلة
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Floating Button */}
        <div className="fixed bottom-6 left-4 z-20">
          <Link to="/clothes/cart">
            <Button className="rounded-full w-14 h-14 bg-blue-500 hover:bg-blue-600 shadow-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClothesCategory;
