
import { supabase } from '@/integrations/supabase/client';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  shadow: string;
  link: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  image: string;
  gradient: string;
  link: string;
}

export interface Place {
  id: number;
  name: string;
  image: string;
  rating: number;
  category: string;
  deliveryTime?: string;
  deliveryFee?: string;
}

export interface Promo {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  iconBg: string;
  textColor: string;
  link: string;
}

/**
 * جلب فئات الصفحة الرئيسية
 */
export async function fetchHomeCategories(): Promise<Category[]> {
  // هذه البيانات الثابتة حاليًا، في المستقبل يمكن تحويلها إلى جدول في قاعدة البيانات
  return [
    { 
      id: "restaurants",
      name: "مطاعم", 
      icon: "UtensilsCrossed", 
      color: "bg-gradient-to-br from-blue-500 to-blue-600 text-white",
      shadow: "shadow-blue-200",
      link: "/restaurants"
    },
    { 
      id: "market",
      name: "سوبر ماركت", 
      icon: "ShoppingCart", 
      color: "bg-gradient-to-br from-cyan-500 to-blue-500 text-white",
      shadow: "shadow-cyan-200",
      link: "/market" 
    },
    { 
      id: "pharmacy",
      name: "صيدليات", 
      icon: "Pill", 
      color: "bg-gradient-to-br from-sky-500 to-blue-500 text-white",
      shadow: "shadow-sky-200",
      link: "/pharmacy" 
    },
    { 
      id: "personal-care",
      name: "العناية الشخصية", 
      icon: "Brush", 
      color: "bg-gradient-to-br from-blue-400 to-blue-600 text-white",
      shadow: "shadow-blue-200",
      link: "/personal-care" 
    },
    { 
      id: "gym",
      name: "جيم", 
      icon: "Dumbbell", 
      color: "bg-gradient-to-br from-blue-600 to-indigo-700 text-white",
      shadow: "shadow-blue-200",
      link: "/gym" 
    }
  ];
}

/**
 * جلب العروض المميزة
 */
export async function fetchHomeOffers(): Promise<Offer[]> {
  try {
    // محاولة جلب العروض من قاعدة البيانات
    const { data, error } = await supabase
      .from('supermarket_offers')
      .select('*')
      .limit(5);

    if (error) throw error;

    // إذا كانت هناك بيانات، نقوم بتحويلها إلى التنسيق المطلوب
    if (data && data.length > 0) {
      return data.map(offer => ({
        id: offer.id,
        title: offer.title,
        description: offer.description,
        image: offer.image_url || "https://images.unsplash.com/photo-1501747315-124a0eaca060?q=80&w=500&fit=crop",
        gradient: "from-black/60 to-transparent",
        link: `/promotions/${offer.id}`
      }));
    }
    
    // إذا لم تكن هناك بيانات، نُرجع قائمة فارغة
    return [];
  } catch (error) {
    console.error('خطأ في جلب العروض المميزة:', error);
    return [];
  }
}

/**
 * جلب الأماكن الشائعة
 */
export async function fetchPopularPlaces(): Promise<Place[]> {
  try {
    // محاولة جلب المطاعم من قاعدة البيانات
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .order('rating', { ascending: false })
      .limit(5);

    if (error) throw error;

    // إذا كانت هناك بيانات، نقوم بتحويلها إلى التنسيق المطلوب
    if (data && data.length > 0) {
      return data.map(restaurant => ({
        id: restaurant.id,
        name: restaurant.name,
        image: restaurant.logo_url || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
        rating: restaurant.rating,
        category: restaurant.description?.split(',')[0] || "مطعم",
        deliveryTime: "25-35 دقيقة",
        deliveryFee: `${Math.round(restaurant.delivery_fee || 15)} ج.م`
      }));
    }
    
    // إذا لم تكن هناك بيانات، نُرجع قائمة فارغة
    return [];
  } catch (error) {
    console.error('خطأ في جلب الأماكن الشائعة:', error);
    return [];
  }
}

/**
 * جلب العروض الترويجية
 */
export async function fetchHomePromos(): Promise<Promo[]> {
  // هذه البيانات الثابتة حاليًا، في المستقبل يمكن تحويلها إلى جدول في قاعدة البيانات
  return [
    {
      id: 1,
      title: "سوبر ماركت",
      description: "خصم 50 جنيه على أول طلب",
      icon: "Home",
      gradient: "from-blue-500 to-sky-400",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/market"
    }, 
    {
      id: 2,
      title: "اشتراكات الجيم",
      description: "اشتراك شهري بـ 300 جنيه",
      icon: "Dumbbell",
      gradient: "from-indigo-600 to-blue-500",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/gym"
    }, 
    {
      id: 3,
      title: "العناية الشخصية",
      description: "خصم 20% على كل المنتجات",
      icon: "Brush",
      gradient: "from-blue-700 to-blue-500",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/personal-care"
    }
  ];
}
