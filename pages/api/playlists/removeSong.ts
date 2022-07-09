import { validateRoute } from '../../../services/auth'
import prisma from '../../../lib/prisma'

// add song to playlist
export default validateRoute(async (req, res, user) => {
  const { playlistId, songId } = req.body
  try {
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        songs: {
          disconnect: { id: songId },
        },
      },
    })
  } catch (error) {
    return res.status(401).json({ error })
  }
  return res.status(200).json({ message: 'successfully deleted' })
})
