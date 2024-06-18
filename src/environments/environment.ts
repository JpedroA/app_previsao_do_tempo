import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



export const environment = {
production: false,
  apiKey: "AIzaSyBsP049WZyxB6e6K4UU9C0MhRRhAjmE8rM",
  authDomain: "openteste-783f3.firebaseapp.com",
  projectId: "openteste-783f3",
  storageBucket: "openteste-783f3.appspot.com",
  messagingSenderId: "751623335582",
  appId: "1:751623335582:web:b0855245d66ac92c9c958f",
  measurementId: "G-SFRX3YGYZH"
};

const app = initializeApp(environment);
const analytics = getAnalytics(app);