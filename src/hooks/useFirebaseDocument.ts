
import { useState, useEffect } from 'react';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { firestore } from '@/integrations/firebase/client';

interface UseFirebaseDocumentProps {
  collectionName: string;
  documentId?: string;
}

/**
 * Hook مخصص لاستخدام وثيقة من Firebase Firestore مع ميزة الاستماع للتغييرات بالوقت الفعلي
 */
export function useFirebaseDocument<T = DocumentData>({ 
  collectionName, 
  documentId 
}: UseFirebaseDocumentProps) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!documentId) {
      setData(null);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // إنشاء مرجع للوثيقة
      const docRef = doc(firestore, collectionName, documentId);
      
      // الاستماع للتغييرات في الوثيقة
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setData({ id: docSnap.id, ...docSnap.data() } as unknown as T);
          } else {
            setData(null);
            console.log(`الوثيقة ${documentId} غير موجودة في مجموعة ${collectionName}`);
          }
          setIsLoading(false);
        },
        (err) => {
          console.error(`خطأ في جلب الوثيقة ${documentId} من مجموعة ${collectionName}:`, err);
          setError(err);
          setIsLoading(false);
        }
      );
      
      // إلغاء الاشتراك عند تفكيك المكون
      return () => unsubscribe();
    } catch (err: any) {
      console.error(`خطأ في إعداد الاستماع للوثيقة ${documentId} في مجموعة ${collectionName}:`, err);
      setError(err);
      setIsLoading(false);
      return undefined;
    }
    
  }, [collectionName, documentId]);
  
  return { data, isLoading, error };
}
