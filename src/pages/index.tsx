import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import GradientLayout from '../components/Playlist/GradientLayout'
import SEO from '../components/SEO'
import prisma from '../utils/prisma'

const Home = ({ playlists, artists }) => {
  const activeSong = useSelector((state: any) => state.playlistReducer.activeSong)
  const router = useRouter()
  const random = playlists.concat(artists)

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
              playlists.slice(0, 6).map((playlist) => (
                <Flex
                  key={playlist.id}
                  height='100px'
                  bgColor='var(--card-dark-bg)'
                  borderRadius='5px'
                  alignItems='center'
                  cursor='pointer'
                  onClick={() => router.push(`/playlist/${playlist.id}`)}
                  sx={{ '&:hover': { bgColor: 'gray.900' } }}>
                  <Image
                    objectFit='cover'
                    width={100}
                    height={100}
                    src={playlist.photo ? playlist.photo : '/defaultPlaylist.jpg'}
                    boxShadow='10px 5px 5px -5px rgba(0, 0, 0, 0.4)'
                    borderRadius='2px'
                  />
                  <Text paddingLeft='10px' fontSize='16px' fontWeight='600'>
                    {playlist.name}
                  </Text>
                </Flex>
              ))}
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
              {artists &&
                artists.slice(0, 5).map((artist) => (
                  <Flex
                    key={artist.id}
                    bgColor='var(--card-dark-bg)'
                    direction='column'
                    height='250px'
                    borderRadius='5px'
                    width='200px'
                    cursor='pointer'
                    sx={{ '&:hover': { bgColor: 'gray.900' } }}>
                    <Image
                      boxSize='140px'
                      borderRadius='50%'
                      marginLeft='auto'
                      marginRight='auto'
                      marginTop='20px'
                      boxShadow='4px 4px 30px 5px rgba(0, 0, 0, 0.8)'
                      src={artist.avatar ? artist.avatar : '/defaultPlaylist.jpg'}
                    />
                    <Box padding='20px 0px 0px 20px'>
                      <Text fontWeight='600' fontSize='18px'>
                        {artist.name}
                      </Text>
                      <Text fontSize='14px' color='gray.400'>
                        Artist
                      </Text>
                    </Box>
                  </Flex>
                ))}
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
              {artists &&
                random.slice(0, 10).map((item) => (
                  <Flex
                    key={item.id}
                    bgColor='var(--card-dark-bg)'
                    direction='column'
                    height='250px'
                    borderRadius='5px'
                    width='200px'
                    cursor='pointer'
                    sx={{ '&:hover': { bgColor: 'gray.900' } }}>
                    <Image
                      boxSize='140px'
                      borderRadius={item.userId ? '' : '50%'}
                      objectFit='cover'
                      marginLeft='auto'
                      marginRight='auto'
                      marginTop='20px'
                      boxShadow='4px 4px 30px 5px rgba(0, 0, 0, 0.8)'
                      src={item.photo ? item.photo : item.avatar ? item.avatar : '/defaultPlaylist.jpg'}
                    />
                    <Box padding='20px 0px 0px 20px'>
                      <Text fontWeight='600' fontSize='18px'>
                        {item.name}
                      </Text>
                      <Text fontSize='14px' color='gray.400'>
                        {item.userId ? 'Playlist' : 'Artist'}
                      </Text>
                    </Box>
                  </Flex>
                ))}
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
