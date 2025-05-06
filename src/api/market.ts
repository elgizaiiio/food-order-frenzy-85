
// واجهة فئة المنتجات
export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

// واجهة المنتج
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: string;
  image: string;
  categoryId: number;
  description?: string;
  inStock: boolean;
}

// واجهة العروض
export interface Offer {
  id: number;
  title: string;
  description: string;
  discount: number;
  image: string;
}

// الحصول على فئات المنتجات
export async function getCategories(): Promise<Category[]> {
  // في تطبيق حقيقي، هذا سيكون استدعاء لواجهة برمجة التطبيقات
  return [
    { id: 1, name: 'المشروبات', description: 'Beverages', image: 'https://images.unsplash.com/photo-1596803244535-925769f389fc?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'القهوة والشاي', description: 'Coffee & Tea', image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'الحليب', description: 'Milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 4, name: 'منتجات الألبان', description: 'Dairy Products', image: 'https://images.unsplash.com/photo-1628689469838-524a4a973b8e?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 5, name: 'إضافات الطعام', description: 'Food Additives', image: 'https://images.unsplash.com/photo-1610554675846-2618e40bd49d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 6, name: 'الجبن', description: 'Cheese', image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 7, name: 'اللحوم', description: 'Meat', image: 'https://images.unsplash.com/photo-1613454320174-7862ab285a97?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 8, name: 'منتجات الطبخ', description: 'Cooking Products', image: 'https://images.unsplash.com/photo-1620574387735-3921fa6376a8?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 9, name: 'دجاج، بيض، لحوم باردة', description: 'Chicken, Eggs, Cold Cuts', image: 'https://images.unsplash.com/photo-1569288063643-5d29ad6874f0?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 10, name: 'الماء', description: 'Water', image: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 11, name: 'منتجات الخبز', description: 'Bread Products', image: 'https://images.unsplash.com/photo-1605280263929-1c42c62ef169?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 12, name: 'الأطعمة المجمدة', description: 'Frozen Foods', image: 'https://images.unsplash.com/photo-1621858170710-2e684fb6bb6e?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 13, name: 'الآيس كريم', description: 'Ice Cream', image: 'https://images.unsplash.com/photo-1565237324415-e40db5510042?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 14, name: 'منتجات الإفطار', description: 'Breakfast Items', image: 'https://images.unsplash.com/photo-1550037303-03da09fbde16?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 15, name: 'شوكولاتة وبسكويت', description: 'Chocolate & Biscuits', image: 'https://images.unsplash.com/photo-1587495153142-a9c4480d4be5?auto=format&fit=crop&q=80&w=200&h=200' },
  ];
}

// الحصول على المنتجات حسب الفئة
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  // في تطبيق حقيقي، هذا سيكون استدعاء لواجهة برمجة التطبيقات مع معرف الفئة
  const allProducts: Record<number, Product[]> = {
    1: [
      { id: 1, name: 'كوكاكولا', price: 6, quantity: '330 مل', image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
      { id: 2, name: 'بيبسي', price: 5.5, quantity: '330 مل', image: 'https://images.unsplash.com/photo-1629203432180-71e9b1b8742c?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
      { id: 3, name: 'سفن أب', price: 5.5, quantity: '330 مل', image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
      { id: 4, name: 'عصير برتقال', price: 12, quantity: '1 لتر', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
      { id: 5, name: 'عصير تفاح', price: 11, quantity: '1 لتر', image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
      { id: 6, name: 'ماء معدني', price: 2, quantity: '600 مل', image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
    ],
    2: [
      { id: 7, name: 'قهوة عربية', price: 15, quantity: '250 جم', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 2, inStock: true },
      { id: 8, name: 'شاي أخضر', price: 10, quantity: '20 كيس', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0f5?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 2, inStock: false },
    ],
    3: [
      { id: 9, name: 'حليب طازج', price: 8, quantity: '1 لتر', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 3, inStock: true },
      { id: 10, name: 'حليب منكه', price: 9, quantity: '1 لتر', image: 'https://images.unsplash.com/photo-1530258422663-1595ff389394?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 3, inStock: true },
    ],
  };

  // إرجاع المنتجات للفئة المطلوبة، أو مصفوفة فارغة إذا لم تكن موجودة
  return allProducts[categoryId] || [];
}

// الحصول على العروض
export async function getOffers(): Promise<Offer[]> {
  // في تطبيق حقيقي، هذا سيكون استدعاء لواجهة برمجة التطبيقات
  return [
    {
      id: 1,
      title: 'عرض خاص على المشروبات',
      description: 'خصم 20% على جميع المشروبات الغازية',
      discount: 20,
      image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 2,
      title: 'عروض الصيف',
      description: 'اشتر قطعتين واحصل على الثالثة مجانًا',
      discount: 33,
      image: 'https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 3,
      title: 'توصيل مجاني',
      description: 'للطلبات التي تزيد عن 100 ريال',
      discount: 10,
      image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 4,
      title: 'منتجات مخفضة',
      description: 'خصومات تصل إلى 50% على منتجات مختارة',
      discount: 50,
      image: 'https://images.unsplash.com/photo-1576673442511-7e39b6545c87?auto=format&fit=crop&q=80&w=400&h=300'
    },
    {
      id: 5,
      title: 'مهرجان الأجبان',
      description: 'خصم 15% على جميع أنواع الجبن',
      discount: 15,
      image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&q=80&w=400&h=300'
    },
  ];
}

// الحصول على المنتجات الأكثر شعبية
export async function getPopularProducts(): Promise<Product[]> {
  // في تطبيق حقيقي، هذا سيكون استدعاء لواجهة برمجة التطبيقات
  return [
    { id: 1, name: 'كوكاكولا', price: 6, quantity: '330 مل', image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 1, inStock: true },
    { id: 7, name: 'قهوة عربية', price: 15, quantity: '250 جم', image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 2, inStock: true },
    { id: 9, name: 'حليب طازج', price: 8, quantity: '1 لتر', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 3, inStock: true },
    { id: 11, name: 'جبن شيدر', price: 22, quantity: '250 جم', image: 'https://images.unsplash.com/photo-1589881133595-a3c085cb731d?auto=format&fit=crop&q=80&w=400&h=400', categoryId: 6, inStock: false },
  ];
}
