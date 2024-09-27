import "server-only"
 
import admin from "firebase-admin"
 
interface FirebaseAdminAppParams {
  projectId: string
  clientEmail: string
  privateKey: string
}
 
function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, "\n")
}
 
export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey)
 
  if (admin.apps.length > 0) {
    return admin.app()
  }
 
  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  })
 
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
  })
}
 
export function initAdmin() {
  const params = {
    projectId: process.env.NEXT_PUBLIC_projectId as string,
    clientEmail: process.env.clientEmail as string,
    privateKey: process.env.privateKey as string,
  }
 
  return createFirebaseAdminApp(params)
}
