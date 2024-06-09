import { NextResponse, type NextRequest } from 'next/server'
import { getSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const session = await getSession(request)
  console.log(session);
  
  if (!session && request.nextUrl.pathname.startsWith('/auth/todo-crud')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth'

    return NextResponse.redirect(redirectUrl)
  }
  return NextResponse.next()
}
