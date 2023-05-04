import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyBaW_EKY98JSGG-6fvu2_AvjJfta8sKkIc',
  authDomain: 'weekly-a1079.firebaseapp.com',
  databaseURL: 'https://weekly-a1079-default-rtdb.firebaseio.com',
  projectId: 'weekly-a1079',
  storageBucket: 'weekly-a1079.appspot.com',
  messagingSenderId: '509355970439',
  appId: '1:509355970439:web:07c960095744cf7209cd22',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
