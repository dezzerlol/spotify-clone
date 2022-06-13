import { validateRoute } from '../../../lib/auth'
import prisma from '../../../lib/prisma'

// add song to playlist
export default validateRoute(async (req, res, user) => {
  const { playlistId, songId } = req.body
  try {
    await prisma.playlist.update({
      where: { id: playlistId },
      data: {
        songs: {
          connect: {
            id: songId,
          },
        },
      },
    })
  } catch (error) {
    return res.json({ error })
  }
  return res.json({ message: 'successfully added song' })
})
