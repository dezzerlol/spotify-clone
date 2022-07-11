import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../middleware/auth'
import prisma from '../../utils/prisma'

// change profile username
export default validateRoute(async (req: NextApiRequest, res: NextApiResponse) => {
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
