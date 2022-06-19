import React from 'react'
import { useSelector } from 'react-redux'
import GradientLayout from '../../components/GradientLayout'
import SEO from '../../components/SEO'
import SongTable from '../../components/SongTable'
import { validateToken } from '../../lib/auth'
import prisma from '../../lib/prisma'

const getGBColor = (id) => {
  const colors = ['red', 'green', 'blue', 'orange', 'gray', 'purple', 'yellow', 'teal']

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}

const Playlist = ({ playlist }) => {
  const activeSong = useSelector((state: any) => state.playlistReducer.activeSong)
  return (
    <>
      <SEO
        title={activeSong ? `${activeSong.artist.name} — ${activeSong.name}` : `Spotify — ${playlist.name}`}
        ogtitle={playlist.name}
        description={`Listen on Spotify: ${playlist.name}`}
        image={playlist.photo}
      />
      <GradientLayout
        color={getGBColor(playlist.id)}
        title={playlist.name}
        image={playlist.photo}
        subtitle='playlist'
        description={`${playlist.songs.length} songs`}>
        <SongTable songs={playlist.songs} />
      </GradientLayout>
    </>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user
  try {
    user = validateToken(req.cookies.SPOOTIK_ACCESS_TOKEN)
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/signin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
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
