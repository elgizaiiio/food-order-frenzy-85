import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, MapPin, Star, Clock, Users, Dumbbell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useGyms } from '@/hooks/useGymData';
import { useAuth } from '@/context/AuthContext';
import { Gym } from '@/services/gymService';

const Gym: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); 
  const { data: gyms, isLoading: loading, error } = useGyms();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  
  // فلترة النوادي حسب الكلمة المفتاحية
  const filteredGyms = gyms?.filter(gym => 
    gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (gym.location && gym.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // فلترة حسب النوع (إذا تم تحديد فلتر)
  const typeFilters = ["كمال أجسام", "لياقة بدنية", "كروس فيت", "كارديو"];
  
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
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md">
          <div className="flex items-center justify-between p-4">
            <Link to="/" className="text-white hover:text-orange-100">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold">نوادي رياضية</h1>
            <div className="flex items-center gap-3">
              <button className="text-white hover:text-orange-200 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="px-4 pb-4">
            <div className="relative mb-2">
              <Input
                type="text"
                placeholder="ابحث عن نادي..."
                className="pl-10 pr-4 py-2 rounded-full border-orange-200 bg-white/90 text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 right-4 flex items-center">
                <Search className="h-4 w-4 text-orange-400" />
              </div>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-between text-orange-700 bg-white hover:bg-orange-50 border-orange-200"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <span>تصفية حسب النوع</span>
              </div>
              <span className={`transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}>▼</span>
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="px-4 py-3 border-b border-orange-100 animate-fade-in">
            <div className="flex flex-wrap gap-2">
              {["كمال أجسام", "لياقة بدنية", "كروس فيت", "كارديو"].map(type => (
                <Button
                  key={type}
                  variant={filterType === type ? "default" : "outline"}
                  className={`rounded-full ${
                    filterType === type 
                    ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                    : 'border-orange-200 text-orange-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setFilterType(filterType === type ? null : type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Welcome message */}
        <div className="px-4 pt-6 pb-4 bg-gradient-to-r from-orange-50 to-amber-50">
          <h2 className="text-2xl font-bold text-orange-900">فكرت تهتم بصحتك!</h2>
          <p className="text-orange-800 mt-1">اختار النادي اللي تحبه واشترك معانا</p>
        </div>

        {/* Gym Subscriptions button */}
        <div className="px-4 py-4">
          <Link to="/gym/subscriptions">
            <Button 
              variant="outline" 
              className="w-full bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 border-orange-200 hover:bg-orange-100 py-6 font-medium shadow-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              اشتراكاتك الحالية
            </Button>
          </Link>
        </div>

        {/* Gym List */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center text-orange-900">
            <Dumbbell className="w-5 h-5 text-orange-600 mr-2" />
            النوادي المتاحة
          </h3>
          
          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="overflow-hidden border-none shadow-md animate-pulse">
                  <div className="relative h-48 bg-orange-100"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-orange-100 rounded-md mb-2 w-3/4"></div>
                    <div className="h-4 bg-orange-100 rounded-md mb-4 w-1/2"></div>
                    <div className="h-10 bg-orange-100 rounded-md w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {gyms?.map((gym) => (
                <Card 
                  key={gym.id} 
                  className="overflow-hidden border border-orange-100 rounded-xl shadow-md transition-all hover:shadow-lg hover:border-orange-300"
                >
                  <div className="relative h-48">
                    <img 
                      src={gym.image} 
                      alt={gym.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-600 to-orange-500 text-white px-3 py-1 m-2 rounded-full text-sm font-medium shadow-sm">
                      {gym.price}
                    </div>
                  </div>
                  <CardContent className="p-4 bg-gradient-to-b from-orange-50 to-white">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-xl text-orange-800">{gym.name}</h3>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md shadow-sm">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-sm font-semibold text-amber-700">{gym.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-orange-700 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-orange-500" />
                      <span>{gym.location}</span>
                    </div>
                    
                    {gym.features && gym.features.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {gym.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full border border-orange-100"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4 text-sm text-orange-700">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-orange-500" />
                        <span>{gym.open_hours}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-orange-800">{typeof gym.price === 'string' ? gym.price : `${gym.price}`}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md py-6"
                      onClick={() => navigate(`/gym/${gym.id}/subscribe`)}
                    >
                      اشترك الآن
                    </Button>
                  </CardContent>
                </Card>
              ))}

              {gyms?.length === 0 && (
                <div className="text-center py-8 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-3">
                    <Dumbbell className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-medium text-orange-800 mb-2">لا يوجد نوادي متطابقة</h3>
                  <p className="text-orange-600 mb-4">
                    جرب كلمات بحث أخرى أو تصفح جميع النوادي المتاحة
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gym;
