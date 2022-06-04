import { NextRequest, NextResponse } from 'next/server'


const signedIdPages = ['/', '/playlist/:id', '/library', '/home'] // array of pages that locked to not signed users

// redirect to signin pages if cookie not found
export default function middleware(req: NextRequest) {
  if (signedIdPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.SPOOTIK_ACCESS_TOKEN

    const url = req.nextUrl.clone()
    url.pathname = '/signin'
    if (!token) {
      return NextResponse.redirect(url)
    }
  }
}
