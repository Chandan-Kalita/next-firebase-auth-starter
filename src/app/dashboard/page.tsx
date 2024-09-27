"use client"

import { auth } from '@/config/firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React from 'react'
export default function Dashboard() {
    const router = useRouter()
    async function handleLogout (){
        console.log('clicked');
        
        await signOut(auth);
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            router.replace("/");
          } else {
            const { message } = await response.json();
            console.log(message);
          }
    }
  return (
    <>
    <button onClick={handleLogout}>Logout</button>
    <br />
    <div>Dashboard</div>
    </>
  )
}
