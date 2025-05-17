import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, Search } from 'lucide-react';
import { useGyms } from '@/hooks/useGymData';
import { useAuth } from '@/context/AuthContext';
import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import { Skeleton } from '@/components/ui/skeleton';
// Import Gym as GymType to avoid naming conflict
import { Gym as GymType } from '@/services/gymService';

const CardSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-md">
    <Skeleton className="h-36 w-full" />
    <div className="p-4">
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-3" />
      <Skeleton className="h-10 w-full" />
    </div>
  </div>
);

const Feature: React.FC<{ name: string }> = ({ name }) => (
  <div className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-sm font-medium">
    {name}
  </div>
);

const GymCard: React.FC<{ gym: GymType }> = ({ gym }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <div className="relative h-36 w-full">
        <img src={gym.image} alt={gym.name} className="w-full h-full object-cover" />
        {/* Price badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-l from-brand-600 to-brand-500 text-white px-3 py-1 rounded-full shadow-lg font-medium">
          {gym.price} ر.س/شهر
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{gym.name}</h3>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{gym.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 ml-1" />
          <span className="text-sm truncate">{gym.location}</span>
        </div>
        
        <div className="flex items-center text-gray-600 mb-4">
          <Clock className="h-4 w-4 ml-1" />
          <span className="text-sm">{gym.open_hours}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {gym.features.slice(0, 3).map((feature, index) => (
            <Feature key={index} name={feature} />
          ))}
          {gym.features.length > 3 && <Feature name={`+${gym.features.length - 3}`} />}
        </div>
        
        <Link to={`/gym/${gym.id}`} className="block text-center w-full bg-brand-500 hover:bg-brand-600 text-white py-2 rounded-xl font-medium transition-colors">
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

const GymList: React.FC = () => {
  const { data: gyms, isLoading, isError } = useGyms();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }
  
  if (isError) {
    return <div className="text-red-500">Error loading gyms.</div>;
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {gyms?.map(gym => (
        <GymCard key={gym.id} gym={gym} />
      ))}
    </div>
  );
};

const Gym: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <div className="bg-gray-50 min-h-screen" dir="rtl">
      {/* Top Bar */}
      <TopBar />
      
      {/* Search Bar */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="ابحث عن نادي رياضي..."
            className="bg-transparent border-none outline-none w-full text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>
      
      {/* Gym List */}
      <div className="container mx-auto p-4">
        <GymList />
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Gym;
