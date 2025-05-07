import { PharmacyProduct, PharmacyCategory } from '@/types/pharmacy';

// محاكاة لجلب الفئات من API
export async function fetchPharmacyCategories(): Promise<PharmacyCategory[]> {
  // في التطبيق الحقيقي، هذا سيكون استدعاءً لواجهة برمجة التطبيقات الخلفية
  return [
    { id: 'ear-drops', name: 'قطرات الأذن', icon: 'ear' },
    { id: 'allergy', name: 'مضادات الحساسية', icon: 'allergy' },
    { id: 'mental', name: 'أدوية نفسية', icon: 'mental' },
    { id: 'skin', name: 'الجلدية', icon: 'skin' },
    { id: 'cold', name: 'البرد والإنفلونزا', icon: 'cold' },
    { id: 'immunity', name: 'الجهاز المناعي', icon: 'immunity' },
    { id: 'vaccines', name: 'اللقاحات', icon: 'vaccines' },
    { id: 'womens', name: 'صحة المرأة', icon: 'women' },
    { id: 'diabetes', name: 'السكري', icon: 'diabetes' },
    { id: 'painkillers', name: 'المسكنات', icon: 'painkillers' }
  ];
}

// محاكاة لجلب المنتجات حسب الفئة من API
export async function fetchPharmacyCategoryProducts(categoryId: string): Promise<PharmacyProduct[]> {
  const allProducts = {
    'painkillers': [
      {
        id: '1',
        name: 'باراسيتامول',
        description: 'مسكن ألم سريع المفعول',
        price: 15,
        image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'painkillers',
        requires_prescription: false,
        stock: 10,
        inStock: true
      },
      {
        id: '2',
        name: 'ايبوبروفين',
        description: 'مضاد للالتهاب ومسكن للألم',
        price: 22,
        image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'painkillers',
        requires_prescription: false,
        stock: 7,
        inStock: true
      },
      {
        id: '3',
        name: 'اسبرين',
        description: 'مسكن للألم ومضاد للالتهاب',
        price: 12,
        image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'painkillers',
        requires_prescription: false,
        stock: 0,
        inStock: false
      }
    ],
    'cold': [
      {
        id: '4',
        name: 'كونجستال',
        description: 'لعلاج احتقان الأنف',
        price: 18,
        image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'cold',
        requires_prescription: false,
        stock: 12,
        inStock: true
      },
      {
        id: '5',
        name: 'مضاد هستامين',
        description: 'لعلاج الحساسية والزكام',
        price: 25,
        image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'cold',
        requires_prescription: false,
        stock: 9,
        inStock: true
      }
    ],
    'vitamins': [
      {
        id: '6',
        name: 'فيتامين C',
        description: 'لدعم المناعة',
        price: 30,
        image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'vitamins',
        requires_prescription: false,
        stock: 15,
        inStock: true
      },
      {
        id: '7',
        name: 'فيتامين D',
        description: 'لصحة العظام',
        price: 35,
        image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'vitamins',
        requires_prescription: false,
        stock: 20,
        inStock: true
      }
    ],
    'allergy': [
      {
        id: '8',
        name: 'كلارينت',
        description: 'مضاد للهستامين',
        price: 28,
        image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: 'allergy',
        requires_prescription: false,
        stock: 11,
        inStock: true
      }
    ]
  };

  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // إذا كانت الفئة غير موجودة، قم بإنشاء منتجات عشوائية
  if (!allProducts[categoryId]) {
    return [
      {
        id: `${Math.floor(Math.random() * 1000)}`,
        name: `منتج في ${categoryId}`,
        description: 'وصف المنتج',
        price: Math.floor(Math.random() * 30) + 10,
        image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: categoryId,
        requires_prescription: false,
        stock: 10,
        inStock: true
      },
      {
        id: `${Math.floor(Math.random() * 1000)}`,
        name: `منتج متميز في ${categoryId}`,
        description: 'وصف المنتج المتميز',
        price: Math.floor(Math.random() * 40) + 20,
        image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
        category: categoryId,
        requires_prescription: false,
        stock: Math.random() > 0.3 ? 5 : 0,
        inStock: Math.random() > 0.3
      }
    ];
  }

  return allProducts[categoryId] || [];
}

// محاكاة لجلب المنتجات الموصى بها
export async function fetchRecommendedProducts(): Promise<PharmacyProduct[]> {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: '3',
      name: 'مضاد حيوي',
      description: 'لعلاج الالتهابات البكتيرية',
      price: 45,
      image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'antibiotics',
      requires_prescription: true,
      stock: 8,
      inStock: true
    },
    {
      id: '4',
      name: 'فيتامين D',
      description: 'مكمل غذائي لتقوية العظام',
      price: 35,
      image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'vitamins',
      requires_prescription: false,
      stock: 14,
      inStock: true
    },
    {
      id: '5',
      name: 'شراب للحساسية',
      description: 'يخفف من أعراض الحساسية الموسمية',
      price: 28,
      image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      category: 'allergy',
      requires_prescription: false,
      stock: 6,
      inStock: true
    }
  ];
}

// واجهة تفاصيل الطلب
export interface PharmacyOrder {
  items: Array<{
    id: string;
    quantity: number;
  }>;
  addressId: string;
  paymentMethod: string;
  phone: string;
}

// واجهة استجابة تأكيد الطلب
export interface OrderConfirmation {
  success: boolean;
  orderId?: string;
  message?: string;
  estimatedDelivery?: string;
  trackingUrl?: string;
}

// محاكاة لإرسال طلب إلى API
export async function submitPharmacyOrder(order: PharmacyOrder): Promise<OrderConfirmation> {
  // محاكاة تأخير الشبكة
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // محاكاة نجاح الطلب (95% نجاح)
  if (Math.random() > 0.05) {
    return {
      success: true,
      orderId: `ORD-${Date.now().toString().substring(6)}`,
      estimatedDelivery: '30-45 دقيقة',
      trackingUrl: '/pharmacy/tracking'
    };
  } else {
    return {
      success: false,
      message: 'حدث خطأ أثناء معالجة طلبك. الرجاء المحاولة مرة أخرى.',
    };
  }
}
