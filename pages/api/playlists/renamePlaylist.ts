import { validateRoute } from '../../../lib/auth'
import prisma from '../../../lib/prisma'

// renaming playlist
export default validateRoute(async (req, res, user) => {
  const { id, newName } = req.body
  try {
    await prisma.playlist.update({
      where: { id: id },
      data: { name: newName },
    })
  } catch (error) {
    res.json({ error })
  }
  res.json({ message: 'successfully renamed playlist' })
})
