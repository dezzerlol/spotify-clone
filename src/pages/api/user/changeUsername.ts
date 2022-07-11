import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../../middleware/auth'
import { IUser } from '../../../types/user'
import prisma from '../../../utils/prisma'

// change profile username
export default validateRoute(async (req: NextApiRequest, res: NextApiResponse, user: IUser) => {
  const { newUsername } = req.body
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { username: newUsername },
    })
  } catch (error) {
    res.json({ error })
  }
  res.json({ message: 'successfully changed username' })
})
