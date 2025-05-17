
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
  id: string; // Changed from number to string to match database
  title: string;
  description: string;
  image: string;
  gradient: string;
  link: string;
}

export interface Place {
  id: string | number;
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
      color: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
      shadow: "shadow-orange-200",
      link: "/restaurants"
    },
    { 
      id: "market",
      name: "سوبر ماركت", 
      icon: "ShoppingCart", 
      color: "bg-gradient-to-br from-orange-400 to-orange-500 text-white",
      shadow: "shadow-orange-200",
      link: "/market" 
    },
    { 
      id: "pharmacy",
      name: "صيدليات", 
      icon: "Pill", 
      color: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
      shadow: "shadow-orange-200",
      link: "/pharmacy" 
    },
    { 
      id: "personal-care",
      name: "بيوتي", 
      icon: "Brush", 
      color: "bg-gradient-to-br from-orange-400 to-orange-500 text-white",
      shadow: "shadow-orange-200",
      link: "/personal-care" 
    },
    { 
      id: "gym",
      name: "جيم", 
      icon: "Dumbbell", 
      color: "bg-gradient-to-br from-orange-500 to-orange-600 text-white",
      shadow: "shadow-orange-200",
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
    // Use the newly created supermarket_offers table
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
        description: offer.description || "",
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
    
    // إذا لم تكن هناك بيانات، نُرجع قائمة افتراضية
    return [
      {
        id: 1,
        name: "مطعم الكشري المصري",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
        rating: 4.8,
        category: "كشري",
        deliveryTime: "25-35 دقيقة",
        deliveryFee: "مجاناً"
      },
      {
        id: 2,
        name: "كنتاكي",
        image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=300&auto=format&fit=crop",
        rating: 4.5,
        category: "فراخ",
        deliveryTime: "15-25 دقيقة",
        deliveryFee: "10 ج.م"
      }
    ];
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
      description: "توصيل مجاني للطلبات فوق 100 ريال",
      icon: "ShoppingCart",
      gradient: "from-orange-600 to-red-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/market"
    }, 
    {
      id: 2,
      title: "اشتراكات الجيم",
      description: "خصم 25% على الاشتراك السنوي",
      icon: "Dumbbell",
      gradient: "from-orange-500 to-orange-700",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/gym"
    }, 
    {
      id: 3,
      title: "منتجات تجميل",
      description: "اشتر قطعتين واحصل على الثالثة مجانًا",
      icon: "Brush",
      gradient: "from-pink-500 to-purple-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/personal-care"
    },
    {
      id: 4,
      title: "صيدليات",
      description: "توصيل أدويتك خلال ساعتين",
      icon: "Pill",
      gradient: "from-blue-500 to-blue-700",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/pharmacy"
    },
    {
      id: 5,
      title: "توصيل سريع",
      description: "وصل طلبك خلال 30 دقيقة",
      icon: "Clock",
      gradient: "from-amber-500 to-orange-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/restaurants"
    },
    {
      id: 6,
      title: "ضمان الجودة",
      description: "استرداد كامل المبلغ إذا لم تكن راضيًا",
      icon: "ShieldCheck",
      gradient: "from-green-500 to-teal-600",
      iconBg: "bg-white/20",
      textColor: "text-white",
      link: "/market"
    }
  ];
}
