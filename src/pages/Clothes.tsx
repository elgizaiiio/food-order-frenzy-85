
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Clothes: React.FC = () => {
  // Categories for clothes
  const categories = [
    {
      id: 'girls',
      name: 'ملابس بناتي',
      image: 'https://images.unsplash.com/photo-1613995887374-3c9e8d49320b?auto=format&fit=crop&q=80&w=300&h=300',
    },
    {
      id: 'boys',
      name: 'ملابس ولادي',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300&h=300',
    },
    {
      id: 'kids',
      name: 'ملابس أطفال',
      image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=300&h=300',
    },
    {
      id: 'sportswear',
      name: 'ملابس رياضية',
      image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=300&h=300',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">dam Clothes</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Intro Text */}
        <div className="px-4 py-6">
          <h2 className="text-2xl font-bold text-gray-800">هنسهل عليك كل حاجة</h2>
        </div>

        {/* Categories Grid */}
        <div className="px-4 pb-8">
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                to={`/clothes/category/${category.id}`}
                className="relative overflow-hidden rounded-xl shadow-md h-40"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-3">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clothes;
