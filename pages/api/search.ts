import { validateRoute } from '../../services/auth'
import prisma from '../../lib/prisma'

// change profile username
export default validateRoute(async (req, res, user) => {
  const { searchValue } = req.body

  const result = await prisma.song.findMany({
    where: {
      name: {
        contains: searchValue,
        mode: 'insensitive',
      },
    },
    include: {
      artist: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  })

  return res.json(result)
})
