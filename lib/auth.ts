import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import prisma from './prisma'

interface JwtPayload {
  id: number
}

export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.SPOOTIK_ACCESS_TOKEN

    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, 'test') as JwtPayload
        user = await prisma.user.findUnique({ where: { id } })

        if (!user) {
          throw new Error('Not real user')
        }
      } catch (error) {
        res.status(401)
        res.json({ error: 'Not authorized' })
        return
      }
      return handler(req, res, user)
    }

    res.status(401)
    res.json({ error: 'Not authorized' })
  }
}

export const validateToken = (token) => {
  const user = jwt.verify(token, 'test')

  return user as JwtPayload
}
