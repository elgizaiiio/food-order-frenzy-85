
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Search, MapPin, Star, Clock, DollarSign, Users, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

type GymItem = {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  features?: string[];
  openHours?: string;
  price?: string;
};

const Gym: React.FC = () => {
  const [gyms, setGyms] = useState<GymItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // محاكاة جلب البيانات من API
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        // في الحالة الحقيقية، سيتم استبدال هذا بطلب API حقيقي
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const mockData: GymItem[] = [
          {
            id: 'iron-fitness',
            name: 'آيرون فيتنس',
            image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500&h=300',
            location: 'شارع الملك فهد',
            rating: 4.8,
            features: ['تدريب شخصي', 'ساونا', 'مسبح داخلي'],
            openHours: '24 ساعة',
            price: 'من 199 ريال/شهر'
          },
          {
            id: 'gold-gym',
            name: 'جولد جيم',
            image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500&h=300',
            location: 'حي النزهة',
            rating: 4.5,
            features: ['صالة كارديو', 'يوغا', 'زومبا'],
            openHours: '6:00 - 23:00',
            price: 'من 249 ريال/شهر'
          },
          {
            id: 'fitness-time',
            name: 'فيتنس تايم',
            image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=500&h=300',
            location: 'طريق الشيخ زايد',
            rating: 4.7,
            features: ['كروس فيت', 'تمارين جماعية', 'مدربين معتمدين'],
            openHours: '5:00 - 23:30',
            price: 'من 219 ريال/شهر'
          },
          {
            id: 'power-zone',
            name: 'باور زون',
            image: 'https://images.unsplash.com/photo-1637666218229-7824d3b2ed83?auto=format&fit=crop&q=80&w=500&h=300',
            location: 'الجامعة الشرقية',
            rating: 4.4,
            features: ['أجهزة حديثة', 'تدريب قوة', 'كمال أجسام'],
            openHours: '6:00 - 22:00',
            price: 'من 189 ريال/شهر'
          },
        ];
        
        setGyms(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gyms:', error);
        toast.error('حدث خطأ أثناء تحميل بيانات النوادي');
        setLoading(false);
      }
    };
    
    fetchGyms();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white sticky top-0 z-10 shadow-md">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">dam Gym</h1>
          <div className="flex items-center gap-3">
            <button className="text-white">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Welcome message */}
        <div className="px-4 pt-6 pb-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-b-3xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">عاش يوحش !!</h2>
          <p className="text-gray-600 mt-1">اختار النادي اللي تحبه واشترك معانا</p>
        </div>

        {/* Gym Subscriptions button */}
        <div className="px-4 py-4">
          <Link to="/gym/subscriptions">
            <Button 
              variant="outline" 
              className="w-full bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 py-6 font-medium shadow-sm"
            >
              <Users className="w-5 h-5 mr-2" />
              اشتراكاتك الحالية
            </Button>
          </Link>
        </div>

        {/* Gym List */}
        <div className="px-4 py-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Dumbbell className="w-5 h-5 text-purple-600 mr-2" />
            النوادي المتاحة
          </h3>
          
          {loading ? (
            // Loading skeleton
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="overflow-hidden border-none shadow-md animate-pulse">
                  <div className="relative h-48 bg-gray-200"></div>
                  <CardContent className="p-4">
                    <div className="h-6 bg-gray-200 rounded-md mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-md mb-4 w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded-md w-full"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {gyms.map((gym) => (
                <Card 
                  key={gym.id} 
                  className="overflow-hidden border border-gray-100 rounded-xl shadow-md transition-all hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <img 
                      src={gym.image} 
                      alt={gym.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-blue-500 text-white px-3 py-1 m-2 rounded-full text-sm font-medium shadow-sm">
                      {gym.price}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-xl text-gray-800">{gym.name}</h3>
                      <div className="flex items-center bg-amber-50 px-2 py-1 rounded-md">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500 mr-1" />
                        <span className="text-sm font-semibold text-amber-700">{gym.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      <span>{gym.location}</span>
                    </div>
                    
                    {gym.features && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {gym.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{gym.openHours}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1 text-gray-400" />
                        <span>{gym.price?.split('/')[0]}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-md py-6"
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
