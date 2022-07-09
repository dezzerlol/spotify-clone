import { validateRoute } from '../../../services/auth'
import prisma from '../../../lib/prisma'

// add song to playlist
export default validateRoute(async (req, res, user) => {
  const { playlistId } = req.body
  try {
    await prisma.playlist.delete({
      where: { id: playlistId },
    })
  } catch (error) {
    return res.status(401).json({ error })
  }
  return res.status(200).json({ message: 'successfully deleted' })
})
