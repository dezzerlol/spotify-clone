import { Box } from '@chakra-ui/layout'
import React from 'react'
import GradientLayout from '../../components/GradientLayout'
import SongTable from '../../components/SongTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const getGBColor = (id) => {
  const colors = ['red', 'green', 'blue', 'orange', 'gray', 'purple', 'yellow', 'teal']

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  return (
    <GradientLayout
      color={getGBColor(playlist.id)}
      title={playlist.name}
      subtitle='playlist'
      description={`${playlist.songs.length} songs`}>
      <SongTable />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  const { id } = validateToken(req.cookies.SPOOTIK_ACCESS_TOKEN)
  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}

export default Playlist
