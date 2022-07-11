import { NextApiResponse } from 'next'
import { validateRoute } from '../../../middleware/auth'
import { IUser } from '../../../types/user'
import prisma from '../../../utils/prisma'

// creating playlist
export default validateRoute(async (req, res: NextApiResponse, user: IUser) => {
  const newPlaylist = await prisma.playlist.create({
    data: {
      name: `New playlist`,
      user: {
        connect: { id: user.id },
      },
    },
  })

  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  })

  res.status(200)
  res.json({ newPlaylist, playlists })
})
