
export interface PersonalCareProduct {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image_url: string;
  stock: number;
  inStock: boolean;
}

export interface PersonalCareCategory {
  id: string;
  name: string;
}
