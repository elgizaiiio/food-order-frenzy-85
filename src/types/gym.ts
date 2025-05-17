
export interface Gym {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  features: string[];
  open_hours: string;
  price: number;
}

export interface GymSubscription {
  id: string;
  user_id: string;
  gym_id: string;
  gym_name: string;
  plan_name: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled';
  price: number;
  created_at?: string;
}

// Adding alias for Gym type for compatibility
export type GymItem = Gym;
