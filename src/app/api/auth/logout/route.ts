import { NextRequest } from 'next/server';
import { initAdmin} from '@/config/firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  initAdmin()
    const server_firestore_db = getFirestore()
  const sessionId = req.cookies.get("authToken");
  if(sessionId){
    const doc_ref = server_firestore_db.collection("user_sessions").doc(sessionId.value)
    const doc_snap = await doc_ref.get()
    if(doc_snap.exists){
      await doc_ref.delete()
    }
  }
  cookies().delete('authToken')
  return new Response(
    JSON.stringify({ message: 'Logged out successfully' }),
    {
      status:200
    }
  )
}
