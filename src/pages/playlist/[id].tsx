import React from 'react'
import { useSelector } from 'react-redux'
import GradientLayout from '../../components/Playlist/GradientLayout'
import SEO from '../../components/SEO'
import SongTable from '../../components/Playlist/SongTable'
import { validateToken } from '../../middleware/auth'
import prisma from '../../utils/prisma'
import { getGBColor } from '../../utils/getGBColor'
import { IPlaylist } from '../../types/playlist'
import { Song } from '../../types/song'

type IProps = IPlaylist & { songs: Song[] }

const Playlist = ({ playlist }: { playlist: IProps }) => {
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
        <SongTable songs={playlist.songs} type='playlist' />
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
