import { validateRoute } from '../../../services/auth'
import prisma from '../../../lib/prisma'

// getiing playlists with validating route so another user cant get logged user playlists
export default validateRoute(async (req, res, user) => {
  const playlists = await prisma.playlist.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      name: 'asc',
    },
  })



  res.json(playlists)
})
