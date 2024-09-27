import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export async function middleware(request: NextRequest) {
    
    const sessionId = request.cookies.get("authToken");
    console.log(sessionId);
    
    if(sessionId){
            return NextResponse.next()
        }
    
    
    return Response.json(
            { success: false, message: 'authentication failed' },
            { status: 401 }
        )
    
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/dashboard/:path*',
}