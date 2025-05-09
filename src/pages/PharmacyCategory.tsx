
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { usePharmacyCategoryProducts } from '@/hooks/usePharmacyData';
import { usePharmacyCart } from '@/context/PharmacyCartContext';
import { PharmacyProduct } from '@/types/pharmacy';

const PharmacyCategory: React.FC = () => {
  const { categoryId = '' } = useParams<{ categoryId?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const { data: products, isLoading } = usePharmacyCategoryProducts(categoryId);
  const { addToCart, itemCount } = usePharmacyCart();

  // فلتر المنتجات بناء على مصطلح البحث
  const filteredProducts = products?.filter(
    product => product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 shadow-sm">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-b-xl">
            <Link to="/pharmacy" className="text-white hover:text-blue-100">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">المنتجات</h1>
            <Link to="/pharmacy/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-blue-700 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Search */}
          <div className="px-4 py-4 border-b border-blue-100">
            <div className="relative">
              <Input
                type="search"
                placeholder="ابحث عن المنتجات"
                className="pl-10 pr-4 py-2 rounded-full border-blue-200 bg-blue-50 focus:border-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="px-4 py-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <p className="text-blue-600">جاري التحميل...</p>
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product: PharmacyProduct) => (
                <Card key={product.id} className="overflow-hidden border border-blue-100 hover:shadow-lg transition-all hover:scale-[1.02]">
                  <div className="p-3">
                    <div className="bg-blue-50 rounded-lg overflow-hidden">
                      <img 
                        src={product.image_url || 'https://via.placeholder.com/200?text=Medicine'} 
                        alt={product.name} 
                        className="w-full h-32 object-cover hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <h3 className="font-medium mt-2 text-blue-800">{product.name}</h3>
                    <p className="text-xs text-blue-600 line-clamp-2 min-h-[2rem]">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold text-blue-700">{product.price} ج.م</span>
                      <Button 
                        size="sm"
                        variant={product.stock > 0 ? "pharmacy" : "outlineBlue"}
                        onClick={() => product.stock > 0 && addToCart(product)}
                        disabled={product.stock <= 0}
                        className="px-3 text-xs"
                      >
                        {product.stock > 0 ? 'إضافة' : 'نفذ'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-blue-600">لا توجد منتجات متطابقة مع البحث</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PharmacyCategory;
