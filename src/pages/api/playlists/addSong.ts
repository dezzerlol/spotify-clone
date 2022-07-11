import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../../middleware/auth'
import prisma from '../../../utils/prisma'

// add song to playlist
export default validateRoute(async (req: NextApiRequest, res: NextApiResponse, user) => {
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
