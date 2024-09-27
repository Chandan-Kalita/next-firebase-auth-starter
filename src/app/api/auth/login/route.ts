import { initAdmin} from '@/config/firebase-admin';
import { randomUUID } from 'crypto';
import { getFirestore } from 'firebase-admin/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { idToken } = await req.json();
  initAdmin()
  const server_firestore_db = getFirestore()
  try {

    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionId = randomUUID();
    await server_firestore_db.collection("user_sessions").doc(sessionId).set({
      token:idToken
    })
    const response = NextResponse.json({ message: 'Login successful' }, { status: 200 });
    
    response.cookies.set('authToken', sessionId, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: expiresIn,
      path: '/',
    });

    return response;
  } catch (error) {
    console.log(error);
    
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
    
  }
}
