
// Pharmacy types
export interface PharmacyProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  category: string;
  requires_prescription: boolean;
  stock: number;
  created_at?: string;
}

export interface PharmacyCategory {
  id: string;
  name: string;
  icon: string;
}
