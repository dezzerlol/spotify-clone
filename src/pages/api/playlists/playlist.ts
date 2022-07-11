import { NextApiResponse } from 'next'
import { validateRoute } from '../../../middleware/auth'
import { IUser } from '../../../types/user'
import prisma from '../../../utils/prisma'

// getiing playlists with validating route so another user cant get logged user playlists
export default validateRoute(async (req, res: NextApiResponse, user: IUser) => {
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
