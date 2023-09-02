// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";
import Router from "next/router";

const provider = new GoogleAuthProvider();

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBibYR4Dp-teuJLafqiuf6k15Z28K5iigk",
  authDomain: "semicolon-7dc69.firebaseapp.com",
  projectId: "semicolon-7dc69",
  storageBucket: "semicolon-7dc69.appspot.com",
  messagingSenderId: "687180848813",
  appId: "1:687180848813:web:9a7cf9e8e13a3570ebf024",
  measurementId: "G-FLDMK7FDGQ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authh = getAuth(app);



if (typeof window !== 'undefined') {
  authh.onAuthStateChanged(function(user) {
    if (user) {
      localStorage.setItem('uid', user.uid);
      localStorage.setItem('email', user.email);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('userName', user.displayName);
      localStorage.setItem('photoURL',user.photoURL);
      } else {
      
      localStorage.setItem('uid', null);
      localStorage.setItem('email', null);
      localStorage.setItem('isLogin', false);
      localStorage.setItem('userName', null);
      localStorage.setItem('photoURL', null);
      }
    })
}

export function GoogleLogin(){
  signInWithPopup(authh, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    Router.push('/');
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    console.log(errorCode,errorMessage,email);
    // ...
  });
}


export function LogOut(){
signOut(authh).then(()=>{
  console.log('successful logout');
  Router.push('/');
}).catch((error)=>{
  console.log('logout failed');
})
}






