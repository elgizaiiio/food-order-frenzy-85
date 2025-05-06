
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share, Search, MapPin, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type GymItem = {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
};

const Gym: React.FC = () => {
  // Mock data for gyms
  const gyms: GymItem[] = [
    {
      id: 'iron-fitness',
      name: 'آيرون فيتنس',
      image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&q=80&w=500&h=300',
      location: 'شارع الملك فهد',
      rating: 4.8,
    },
    {
      id: 'gold-gym',
      name: 'جولد جيم',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=500&h=300',
      location: 'حي النزهة',
      rating: 4.5,
    },
    {
      id: 'fitness-time',
      name: 'فيتنس تايم',
      image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&q=80&w=500&h=300',
      location: 'طريق الشيخ زايد',
      rating: 4.7,
    },
    {
      id: 'power-zone',
      name: 'باور زون',
      image: 'https://images.unsplash.com/photo-1637666218229-7824d3b2ed83?auto=format&fit=crop&q=80&w=500&h=300',
      location: 'الجامعة الشرقية',
      rating: 4.4,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-md mx-auto bg-white pb-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0 z-10">
          <Link to="/" className="text-gray-700">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">dam Gym</h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700">
              <Share className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Welcome message */}
        <div className="px-4 pt-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-800">عاش يوحش !!</h2>
          <p className="text-gray-600 mt-1">اختار النادي اللي تحبه واشترك معانا</p>
        </div>

        {/* Gym Subscriptions button */}
        <div className="px-4 py-3">
          <Link to="/gym/subscriptions">
            <Button 
              variant="outline" 
              className="w-full bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100"
            >
              اشتراكاتك
            </Button>
          </Link>
        </div>

        {/* Gym List */}
        <div className="px-4 py-4">
          <h3 className="text-lg font-semibold mb-4">النوادي المتاحة</h3>
          <div className="space-y-4">
            {gyms.map((gym) => (
              <Card 
                key={gym.id} 
                className="overflow-hidden border-none shadow-md"
              >
                <div className="relative h-48">
                  <img 
                    src={gym.image} 
                    alt={gym.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-lg">{gym.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-semibold ms-1">{gym.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="w-4 h-4 me-1" />
                    <span>{gym.location}</span>
                  </div>
                  <Button 
                    className="w-full bg-brand-500 hover:bg-brand-600"
                    onClick={() => navigate(`/gym/${gym.id}/subscribe`)}
                  >
                    اشترك الآن
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gym;
