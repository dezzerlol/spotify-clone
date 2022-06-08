import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

// creating playlist
export default validateRoute(async (req, res, user) => {
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
  res.json({ newPlaylist, playlists: playlists })
})
