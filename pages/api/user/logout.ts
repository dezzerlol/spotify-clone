import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('SPOOTIK_ACCESS_TOKEN', 'false', {
      httpOnly: true,
      maxAge: 1,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  )

  res.status(200)
  res.json({ logout: 'success' })
}
