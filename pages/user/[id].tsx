import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import GradientLayout from '../../components/Layout/GradientLayout'
import { validateToken } from '../../lib/auth'
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

        <Flex wrap='wrap' gap='1rem'>
          {artists &&
            artists.map((artist) => (
              <Box paddingX='10px' width='15%' key={artist.name} cursor='pointer'>
                <Box
                  bgColor='var(--card-dark-bg)'
                  borderRadius='5px'
                  padding='15px'
                  width='200px'
                  height='250px'
                  sx={{ '&:hover': { bgColor: 'gray.900' } }}>
                  <Image
                    src={artist.avatar ? artist.avatar : '/defaultPlaylist.jpg'}
                    boxSize='140px'
                    borderRadius='50%'
                    marginLeft='auto'
                    marginRight='auto'
                    boxShadow='4px 4px 80px 5px rgba(0, 0, 0, 0.8)'
                  />
                  <Box marginTop='20px'>
                    <Text fontSize='large' fontWeight='bold'>
                      {artist.name}
                    </Text>
                    <Text fontSize='small' color='gray.500'>
                      Artist
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

export const getServerSideProps = async ({ req }) => {
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
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}

export default User
