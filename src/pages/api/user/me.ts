import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../../middleware/auth'
import { IUser } from '../../../types/user'
import prisma from '../../../utils/prisma'

// counting playlists for user
export default validateRoute(async (req: NextApiRequest, res: NextApiResponse, user: IUser) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  })

  res.json({ ...user, playlistsCount })
})
