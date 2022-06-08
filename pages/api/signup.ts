import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../lib/prisma'

// signup and create jwt token function
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync()
  const { email, password, username } = req.body

  let user

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        username
      },
    })
  } catch (error) {
    res.status(401)
    res.json({ error: 'user already exists' })
    return
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
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

  res.json(user)
}
