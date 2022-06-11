import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import GradientLayout from '../../components/GradientLayout'
import { useMe } from '../../lib/hooks'
import prisma from '../../lib/prisma'

const User = ({ artists }) => {
  const { user, isLoading } = useMe()

  return (
    <GradientLayout
      color='gray'
      subtitle='profile'
      title={isLoading ? <Skeleton height='40px' width='400px' /> : `${user.username}`}
      description={`${user?.playlistsCount} public playlists`}
      roundImage>
      <Box color='white' paddingX='40px'>
        <Box marginBottom='40px' marginLeft='10px'>
          <Text fontSize='2xl' fontWeight='bold'>
            Top artists this month
          </Text>
          <Text fontSize='small'>Only visible to you</Text>
        </Box>

        <Flex>
          {artists.map((artist) => (
            <Box paddingX='10px' width='15%' key={artist.name}>
              <Box bg='gray.900' borderRadius='4px' padding='15px' width='100%'>
                <Image src='https://craftypixels.com/placeholder-image/300' borderRadius='100%' />
                <Box marginTop='20px'>
                  <Text fontSize='large' fontWeight='bold'>
                    {artist.name}
                  </Text>
                  <Text fontSize='small' color='gray.500'>
                    {artist.name}
                  </Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default User
