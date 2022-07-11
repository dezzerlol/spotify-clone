import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import Card from '../components/Card/Card'
import MainPageCard from '../components/Card/MainPageCard'
import GradientLayout from '../components/Playlist/GradientLayout'
import SEO from '../components/SEO'
import { Artist } from '../types/artist'
import { IPlaylist } from '../types/playlist'
import prisma from '../utils/prisma'

type Props = {
  playlists: IPlaylist[]
  artists: Artist[]
}

const Home = ({ playlists, artists }: Props) => {
  const activeSong = useSelector((state: any) => state.playlistReducer.activeSong)
  const random = [...playlists, ...artists]

  return (
    <>
      <SEO
        title={activeSong ? `${activeSong.artist.name} — ${activeSong.name}` : 'Spotify — Web-player'}
        description='Spotify web-player'
        ogtitle='Spotify web-player'
      />
      <GradientLayout color='gray'>
        <Box color='white' paddingX='50px'>
          <Text as='h3' fontSize='32px' fontWeight='600'>
            Good evening
          </Text>
          <SimpleGrid minChildWidth='400px' spacing='20px' paddingY='20px'>
            {playlists &&
              playlists.slice(0, 6).map((playlist) => <MainPageCard playlist={playlist} key={playlist.id} />)}
          </SimpleGrid>

          <Box paddingY='20px'>
            <Flex alignItems='center' justifyContent='space-between'>
              <Box>
                <Text as='h3' fontSize='26px' fontWeight='600'>
                  Suggested artists
                </Text>
                <Text fontSize='sm' color='gray.300'>
                  Inspired by your recent activity.
                </Text>
              </Box>
              <Box
                color='gray.400'
                fontWeight='600'
                sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
                See all
              </Box>
            </Flex>
            <SimpleGrid minChildWidth='200px' spacing='90px' paddingY='20px'>
              {artists && artists.slice(0, 5).map((artist) => <Card item={artist} key={artist.id} />)}
            </SimpleGrid>
          </Box>

          <Box paddingY='20px'>
            <Flex alignItems='center' justifyContent='space-between'>
              <Box>
                <Text as='h3' fontSize='26px' fontWeight='600'>
                  Recently played
                </Text>
              </Box>
              <Box
                color='gray.400'
                fontWeight='600'
                sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
                See all
              </Box>
            </Flex>
            <SimpleGrid minChildWidth='200px' spacing='90px' paddingY='20px'>
              {artists && random.slice(0, 10).map((item) => <Card item={item} key={item.id} />)}
            </SimpleGrid>
          </Box>
        </Box>
      </GradientLayout>
    </>
  )
}

export const getServerSideProps = async () => {
  const playlists = await prisma.playlist.findMany({})
  const artists = await prisma.artist.findMany({})

  return {
    props: { playlists, artists },
  }
}

export default Home
