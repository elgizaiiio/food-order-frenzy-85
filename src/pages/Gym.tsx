
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Share, MapPin, Star, Clock, DollarSign, Users, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { useGyms } from '@/hooks/useGymData';
import { useAuth } from '@/context/AuthContext';
import { GymItem } from '@/services/gymService';

const Gym: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { data: gyms, isLoading: loading, error } = useGyms();
  
  // Show error toast if fetching fails
  useEffect(() => {
    if (error) {
      console.error('Error fetching gyms:', error);
      toast.error('حدث خطأ أثناء تحميل بيانات النوادي');
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white sticky top-0 z-10 shadow-lg">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">dam Gym</h1>
          <div className="flex items-center gap-3">
            <button className="text-white hover:text-blue-200 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-blue-200 transition-colors">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Welcome message */}
        <div className="px-4 pt-6 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-3xl shadow-sm">
          <h2 className="text-2xl font-bold text-blue-900">عاش يوحش !!</h2>
          <p className="text-blue-800 mt-1">اختار النادي اللي تحبه واشترك معانا</p>
        </div>

        {/* Gym Subscriptions button */}
        <div className="px-4 py-4">
          <Link to="/gym/subscriptions">
            <Button 
              variant="outlineBlue" 
              className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:bg-blue-100 py-6 font-medium shadow-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              اشتراكاتك الحالية
            </Button>
          </Link>
        </div>

        {/* Gym List */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-blue-900">
            <Dumbbell className="w-5 h-5 text-blue-600 mr-2" />
            النوادي المتاحة
          </h3>
          
          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="overflow-hidden border-none shadow-md animate-pulse">
                  <div className="relative h-48 bg-blue-100"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-blue-100 rounded-md mb-2 w-3/4"></div>
                    <div className="h-4 bg-blue-100 rounded-md mb-4 w-1/2"></div>
                    <div className="h-10 bg-blue-100 rounded-md w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {gyms?.map((gym) => (
                <Card 
                  key={gym.id} 
                  className="overflow-hidden border border-blue-100 rounded-xl shadow-md transition-all hover:shadow-lg hover:border-blue-300"
                >
                  <div className="relative h-48">
                    <img 
                      src={gym.image} 
                      alt={gym.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-700 to-indigo-600 text-white px-3 py-1 m-2 rounded-full text-sm font-medium shadow-sm">
                      {gym.price}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-xl text-blue-800">{gym.name}</h3>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-sm font-semibold text-amber-700">{gym.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-blue-700 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-blue-500" />
                      <span>{gym.location}</span>
                    </div>
                    
                    {gym.features && gym.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {gym.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4 text-sm text-blue-700">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-blue-500" />
                        <span>{gym.openHours}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-blue-500" />
                        <span>{gym.price?.split('/')[0]}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md py-6"
                      onClick={() => navigate(`/gym/${gym.id}/subscribe`)}
                    >
                      اشترك الآن
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gym;
