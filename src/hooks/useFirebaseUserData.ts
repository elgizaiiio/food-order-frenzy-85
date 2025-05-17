
import { useState, useEffect } from 'react';
import { useFirebase } from '@/context/FirebaseContext';
import { useAuth } from '@/context/AuthContext';
import { doc, onSnapshot, collection, query, where } from 'firebase/firestore';

export function useFirebaseUserProfile() {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { firestore } = useFirebase();
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // استمع للتغييرات في مستند المستخدم
    const unsubscribe = onSnapshot(
      doc(firestore, "users", user.id),
      (doc) => {
        if (doc.exists()) {
          setUserProfile({ id: doc.id, ...doc.data() });
        } else {
          setUserProfile(null);
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("خطأ في جلب بيانات المستخدم من Firebase:", error);
        setError(error);
        setIsLoading(false);
      }
    );
    
    // قم بإلغاء الاشتراك عند تفكيك المكون
    return () => unsubscribe();
  }, [user?.id, firestore]);
  
  return { userProfile, isLoading, error };
}

export function useFirebaseUserAddresses() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { firestore } = useFirebase();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user?.id) {
      setAddresses([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // استمع للتغييرات في عناوين المستخدم
    const q = query(collection(firestore, "addresses"), where("userId", "==", user.id));
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const addressesList: any[] = [];
        querySnapshot.forEach((doc) => {
          addressesList.push({ id: doc.id, ...doc.data() });
        });
        setAddresses(addressesList);
        setIsLoading(false);
      },
      (error) => {
        console.error("خطأ في جلب عناوين المستخدم من Firebase:", error);
        setError(error);
        setIsLoading(false);
      }
    );
    
    // قم بإلغاء الاشتراك عند تفكيك المكون
    return () => unsubscribe();
  }, [user?.id, firestore]);
  
  return { addresses, isLoading, error };
}

export function useFirebaseUserOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { firestore } = useFirebase();
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user?.id) {
      setOrders([]);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    
    // استمع للتغييرات في طلبات المستخدم
    const q = query(collection(firestore, "orders"), where("userId", "==", user.id));
    
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const ordersList: any[] = [];
        querySnapshot.forEach((doc) => {
          ordersList.push({ id: doc.id, ...doc.data() });
        });
        setOrders(ordersList);
        setIsLoading(false);
      },
      (error) => {
        console.error("خطأ في جلب طلبات المستخدم من Firebase:", error);
        setError(error);
        setIsLoading(false);
      }
    );
    
    // قم بإلغاء الاشتراك عند تفكيك المكون
    return () => unsubscribe();
  }, [user?.id, firestore]);
  
  return { orders, isLoading, error };
}
