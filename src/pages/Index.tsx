
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Categories from '@/components/Categories';
import PopularPlaces from '@/components/PopularPlaces';
import Offers from '@/components/Offers';
import Promos from '@/components/Promos';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-6">
        <Header />
        <Link to="/restaurants">
          <Categories />
        </Link>
        <PopularPlaces />
        <Offers />
        <Promos />
      </div>
    </div>
  );
};

export default Index;
