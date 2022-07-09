import { validateRoute } from '../../../services/auth'
import prisma from '../../../lib/prisma'

// change profile username
export default validateRoute(async (req, res, user) => {
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
