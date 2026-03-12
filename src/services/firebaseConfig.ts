import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  initializeAuth, 
  // @ts-ignore
  getReactNativePersistence,
  browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { Platform } from "react-native";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD15DMDI6KFTC2ZSoCiqHDw-BSubUWvgEA",
  authDomain: "tunes-bb922.firebaseapp.com",
  projectId: "tunes-bb922",
  storageBucket: "tunes-bb922.firebasestorage.app",
  messagingSenderId: "429435824070",
  appId: "1:429435824070:web:8bb3afbdc7d1169b3934c7",
  measurementId: "G-B94F5Q6VBG"
};

// Initialize Firebase (avoid duplicate initialization on hot reloads)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let authInternal: any;

try {
  if (Platform.OS === 'web') {
    authInternal = initializeAuth(app, {
      persistence: browserLocalPersistence,
    });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require('@react-native-async-storage/async-storage').default;
    authInternal = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch (error) {
  // auth has already been initialized
  authInternal = getAuth(app);
}

export const auth = authInternal;
export const db = getFirestore(app);

// Analytics support check
isSupported().then(yes => yes && getAnalytics(app));

export default app;
