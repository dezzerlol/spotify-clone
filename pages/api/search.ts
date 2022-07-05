import { validateRoute } from '../../lib/auth'
import prisma from '../../lib/prisma'

// change profile username
export default validateRoute(async (req, res, user) => {
  const { searchValue } = req.body
  console.log(searchValue)
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
