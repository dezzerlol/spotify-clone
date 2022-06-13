import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/GradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ songs, playlists, artists }) => {
  const { user, isLoading } = useMe()

  return (
    <GradientLayout color='gray'>
      <Box color='white' paddingX='50px'>
        <Text as='h3' fontSize='32px' fontWeight='600'>
          Good evening
        </Text>
        <SimpleGrid minChildWidth='400px' spacing='20px' paddingY='20px'>
          {playlists && playlists.slice(0, 6).map((playlist) => (
            <Flex
              key={playlist.id}
              height='100px'
              bgColor='#181818'
              borderRadius='5px'
              alignItems='center'
              cursor='pointer'
              sx={{ '&:hover': { bgColor: 'gray.900' } }}>
              <Image boxSize='100px' boxShadow='dark-sm' paddingRight='10px' />
              <Text fontSize='16px' fontWeight='600'>
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
            {artists && artists.map((artist) => (
              <Flex
                key={artist.id}
                bgColor='#181818'
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
                  boxShadow='4px 4px 80px 5px rgba(0, 0, 0, 0.8)'
                  src='https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a'
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
            {artists && artists.map((artist) => (
              <Flex
                key={artist.id}
                bgColor='#181818'
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
                  boxShadow='4px 4px 80px 5px rgba(0, 0, 0, 0.8)'
                  src='https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a'
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
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const songs = await prisma.song.findMany({})
  const playlists = await prisma.playlist.findMany({})
  const artists = await prisma.artist.findMany({})

  return {
    props: { songs, playlists, artists },
  }
}

export default Home
