
import React, { createContext, useContext, ReactNode } from 'react';
import { firestore, database, auth, storage } from '@/integrations/firebase/client';
import { collection, addDoc, getDocs, doc, getDoc, setDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { ref, set, get, child, update, remove } from 'firebase/database';
import { toast } from 'sonner';

interface FirebaseContextType {
  // خدمات Firebase
  firestore: typeof firestore;
  database: typeof database;
  auth: typeof auth;
  storage: typeof storage;
  
  // وظائف Firestore
  addDocument: (collectionName: string, data: any) => Promise<string | null>;
  getDocuments: (collectionName: string) => Promise<any[]>;
  getDocument: (collectionName: string, id: string) => Promise<any | null>;
  updateDocument: (collectionName: string, id: string, data: any) => Promise<boolean>;
  deleteDocument: (collectionName: string, id: string) => Promise<boolean>;
  queryDocuments: (collectionName: string, field: string, operator: any, value: any) => Promise<any[]>;
  
  // وظائف Realtime Database
  setData: (path: string, data: any) => Promise<boolean>;
  getData: (path: string) => Promise<any | null>;
  updateData: (path: string, data: any) => Promise<boolean>;
  removeData: (path: string) => Promise<boolean>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  // وظائف Firestore
  const addDocument = async (collectionName: string, data: any): Promise<string | null> => {
    try {
      const docRef = await addDoc(collection(firestore, collectionName), data);
      console.log("تم إضافة المستند بنجاح مع ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("خطأ في إضافة المستند:", error);
      toast.error("خطأ في إضافة البيانات");
      return null;
    }
  };

  const getDocuments = async (collectionName: string): Promise<any[]> => {
    try {
      const querySnapshot = await getDocs(collection(firestore, collectionName));
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      console.error("خطأ في جلب المستندات:", error);
      toast.error("خطأ في جلب البيانات");
      return [];
    }
  };

  const getDocument = async (collectionName: string, id: string): Promise<any | null> => {
    try {
      const docRef = doc(firestore, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error("خطأ في جلب المستند:", error);
      toast.error("خطأ في جلب البيانات");
      return null;
    }
  };

  const updateDocument = async (collectionName: string, id: string, data: any): Promise<boolean> => {
    try {
      const docRef = doc(firestore, collectionName, id);
      await updateDoc(docRef, data);
      console.log("تم تحديث المستند بنجاح");
      return true;
    } catch (error) {
      console.error("خطأ في تحديث المستند:", error);
      toast.error("خطأ في تحديث البيانات");
      return false;
    }
  };

  const deleteDocument = async (collectionName: string, id: string): Promise<boolean> => {
    try {
      await deleteDoc(doc(firestore, collectionName, id));
      console.log("تم حذف المستند بنجاح");
      return true;
    } catch (error) {
      console.error("خطأ في حذف المستند:", error);
      toast.error("خطأ في حذف البيانات");
      return false;
    }
  };

  const queryDocuments = async (collectionName: string, field: string, operator: any, value: any): Promise<any[]> => {
    try {
      const q = query(collection(firestore, collectionName), where(field, operator, value));
      const querySnapshot = await getDocs(q);
      const documents: any[] = [];
      querySnapshot.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
    } catch (error) {
      console.error("خطأ في الاستعلام عن المستندات:", error);
      toast.error("خطأ في البحث عن البيانات");
      return [];
    }
  };

  // وظائف Realtime Database
  const setData = async (path: string, data: any): Promise<boolean> => {
    try {
      await set(ref(database, path), data);
      console.log("تم تعيين البيانات بنجاح في المسار:", path);
      return true;
    } catch (error) {
      console.error("خطأ في تعيين البيانات:", error);
      toast.error("خطأ في حفظ البيانات");
      return false;
    }
  };

  const getData = async (path: string): Promise<any | null> => {
    try {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, path));
      
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("لا توجد بيانات في هذا المسار");
        return null;
      }
    } catch (error) {
      console.error("خطأ في جلب البيانات:", error);
      toast.error("خطأ في استرجاع البيانات");
      return null;
    }
  };

  const updateData = async (path: string, data: any): Promise<boolean> => {
    try {
      await update(ref(database, path), data);
      console.log("تم تحديث البيانات بنجاح في المسار:", path);
      return true;
    } catch (error) {
      console.error("خطأ في تحديث البيانات:", error);
      toast.error("خطأ في تحديث البيانات");
      return false;
    }
  };

  const removeData = async (path: string): Promise<boolean> => {
    try {
      await remove(ref(database, path));
      console.log("تم حذف البيانات بنجاح من المسار:", path);
      return true;
    } catch (error) {
      console.error("خطأ في حذف البيانات:", error);
      toast.error("خطأ في حذف البيانات");
      return false;
    }
  };

  const value = {
    // خدمات Firebase
    firestore,
    database,
    auth,
    storage,
    
    // وظائف Firestore
    addDocument,
    getDocuments,
    getDocument,
    updateDocument,
    deleteDocument,
    queryDocuments,
    
    // وظائف Realtime Database
    setData,
    getData,
    updateData,
    removeData
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  
  if (context === undefined) {
    throw new Error('يجب استخدام useFirebase داخل FirebaseProvider');
  }
  
  return context;
};
