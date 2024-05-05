import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAit5iHVM5KkRLosqyuxVdsnPyuPdU00pY",
    authDomain: "test-ec72c.firebaseapp.com",
    projectId: "test-ec72c",
    storageBucket: "test-ec72c.appspot.com",
    messagingSenderId: "636350902062",
    appId: "1:636350902062:web:0b9836c444db478c9f54bf",
    measurementId: "G-3GWK7ME8ZT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
