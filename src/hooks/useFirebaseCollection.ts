
import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, QueryConstraint, DocumentData } from 'firebase/firestore';
import { firestore } from '@/integrations/firebase/client';

interface UseFirebaseCollectionProps {
  collectionName: string;
  conditions?: {
    field: string;
    operator: "==" | "!=" | "<" | "<=" | ">" | ">=" | "array-contains" | "in" | "array-contains-any" | "not-in";
    value: any;
  }[];
  orderBy?: {
    field: string;
    direction?: 'asc' | 'desc';
  }[];
  limit?: number;
}

/**
 * Hook مخصص لاستخدام مجموعات Firebase Firestore مع ميزات الاستماع للتغييرات بالوقت الفعلي
 */
export function useFirebaseCollection<T = DocumentData>({ 
  collectionName, 
  conditions = [],
  orderBy = [],
  limit
}: UseFirebaseCollectionProps) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    try {
      // بناء استعلام Firebase مع الشروط المرسلة
      const queryConstraints: QueryConstraint[] = [];
      
      // إضافة الشروط إن وجدت
      conditions.forEach(condition => {
        queryConstraints.push(where(condition.field, condition.operator, condition.value));
      });
      
      // إنشاء استعلام Firebase
      const q = query(collection(firestore, collectionName), ...queryConstraints);
      
      // الاستماع للتغييرات
      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          const items: T[] = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() } as unknown as T);
          });
          setData(items);
          setIsLoading(false);
        },
        (err) => {
          console.error(`خطأ في جلب البيانات من مجموعة ${collectionName}:`, err);
          setError(err);
          setIsLoading(false);
        }
      );
      
      // إلغاء الاشتراك عند تفكيك المكون
      return () => unsubscribe();
    } catch (err: any) {
      console.error(`خطأ في إعداد الاستماع لمجموعة ${collectionName}:`, err);
      setError(err);
      setIsLoading(false);
    }
    
  }, [collectionName, JSON.stringify(conditions), JSON.stringify(orderBy), limit]);
  
  return { data, isLoading, error };
}
