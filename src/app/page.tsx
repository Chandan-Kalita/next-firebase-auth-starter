"use client"
import { auth } from '@/config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  function handleSignIn() {
      signInWithPopup(auth, provider)
          .then(async (result) => {
              // This gives you a Google Access Token. You can use it to access the Google API.
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.idToken;
              if(token){
                const response = await fetch('/api/auth/login', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ idToken:token }), // Send token to the API
                });
          
                if (response.ok) {
                  router.replace('/dashboard');
                } else {
                  const { message } = await response.json();
                  console.log(message);
                  
                }

              }

          }).catch((error) => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log({ errorCode, errorMessage });

          });
  }
  
  return (
    
    <div>
      <button onClick={handleSignIn}> Sign In With Google</button>
    </div>
  )
}
