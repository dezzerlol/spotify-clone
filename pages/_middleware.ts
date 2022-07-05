import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const signedIdPages = ['/', '/library', '/home', '/playlist/[id]', '/user/[id]'] // array of pages that locked to not signed users

// redirect to signin pages if cookie not found
export default async function middleware(req: NextRequest) {
  const token = req.cookies.SPOOTIK_ACCESS_TOKEN
  const url = req.nextUrl.clone()
  if (signedIdPages.find((p) => p === req.nextUrl.pathname)) {
    url.pathname = '/signin'
    if (!token) {
      return NextResponse.redirect(url)
    }
    return NextResponse.next()
  }

  // if token exists redirect to home page
  if (token && (req.nextUrl.pathname === '/signin' || req.nextUrl.pathname === '/signup')) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }
}
