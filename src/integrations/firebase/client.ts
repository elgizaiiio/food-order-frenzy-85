
// تكوين Firebase للمشروع
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// تكوين Firebase - قم بتحديث هذه البيانات بمعلومات مشروع Firebase الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "xxxxxxxxxxxx",
  appId: "1:xxxxxxxxxxxx:web:xxxxxxxxxxxx",
  databaseURL: "https://your-project-id-default-rtdb.firebaseio.com" // أضف هذا إذا كنت تستخدم Realtime Database
};

// تهيئة Firebase
const firebaseApp = initializeApp(firebaseConfig);

// تصدير خدمات Firebase المختلفة
export const firestore = getFirestore(firebaseApp);
export const database = getDatabase(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
export const firebase = firebaseApp;

// صادق للتحقق مما إذا كان Firebase متصل بشكل صحيح
console.log("Firebase initialized:", firebaseApp.name);

export default firebaseApp;
