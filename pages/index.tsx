import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import GradientLayout from '../components/GradientLayout'
import { useMe } from '../lib/hooks'
import prisma from '../lib/prisma'

const Home = ({ songs, playlists }) => {
  const { user, isLoading } = useMe()
  console.log(songs, playlists)

  return (
    <GradientLayout color='gray'>
      <Box color='white' paddingX='50px'>
        <Text as='h3' fontSize='32px' fontWeight='600'>
          Good evening
        </Text>
        <SimpleGrid minChildWidth='400px' spacing='20px' paddingY='20px'>
          {playlists.slice(0, 6).map((playlist) => (
            <Flex key={playlist.id} height='100px' bgColor='gray.900' borderRadius='5px' alignItems='center'>
              <Image boxSize='100px' boxShadow='dark-sm' paddingRight='10px' />
              <Text fontSize='16px' fontWeight='600'>
                {playlist.name}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const songs = await prisma.song.findMany({})
  const playlists = await prisma.playlist.findMany({})

  return {
    props: { songs, playlists },
  }
}

export default Home
