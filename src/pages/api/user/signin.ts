import bcrypt from 'bcrypt'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../utils/prisma'

// signin and create jwt token function
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      'test',
      { expiresIn: '24h' }
    )

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('SPOOTIK_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    )
    const { password, ...noPasswordUser } = user
    
    res.json(noPasswordUser)
  } else {
    res.status(401)
    res.json({ error: 'Email or password is incorrect' })
  }
}
