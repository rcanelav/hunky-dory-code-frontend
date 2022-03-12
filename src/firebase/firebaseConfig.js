import { initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup} from 'firebase/auth';

initializeApp({
    apiKey: "AIzaSyDRt1qJLMjP9b-JhvqZtad5kLHHgy_56aM",
    authDomain: "hunkydorycode.firebaseapp.com",
    projectId: "hunkydorycode",
    storageBucket: "hunkydorycode.appspot.com",
    messagingSenderId: "464041784745",
    appId: "1:464041784745:web:12fff7c6c103a38e1cc0b8",
    measurementId: "G-ZQQFQDBWY4",
});

const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider().addScope("email");
export const facebookAuthProvider = new FacebookAuthProvider().addScope("email");
export const startSignIn = async (provider) => {
  try {
      const { _tokenResponse: credentials } = await signInWithPopup(
      auth,
      provider
    );
    return credentials;
  } catch (error) {
    console.warn(error);
  }
};
