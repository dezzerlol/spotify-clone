import { NextApiRequest, NextApiResponse } from 'next'
import { validateRoute } from '../../../middleware/auth'
import prisma from '../../../utils/prisma'

// renaming playlist
export default validateRoute(async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, newName } = req.body
  try {
    await prisma.playlist.update({
      where: { id: id },
      data: { name: newName },
    })
  } catch (error) {
    res.json({ error })
  }
  res.json({ message: 'successfully renamed playlist' })
})
