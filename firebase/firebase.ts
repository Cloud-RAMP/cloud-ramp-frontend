"use client";

// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtiVm-_D7BgxrwiJ53Ao_q-cRYHD9dHj8",
    authDomain: "cloud-ramp.firebaseapp.com",
    projectId: "cloud-ramp",
    storageBucket: "cloud-ramp.firebasestorage.app",
    messagingSenderId: "259937330690",
    appId: "1:259937330690:web:2f1dd4cbbcead83226e91b",
    measurementId: "G-CJC4N9EZBT",
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export { app };
