import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image, Skeleton } from '@chakra-ui/react'
import Card from '../../components/Card/Card'
import GradientLayout from '../../components/Playlist/GradientLayout'
import { validateToken } from '../../middleware/auth'
import { useMe } from '../../utils/hooks'
import prisma from '../../utils/prisma'

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
              <Card item={artist} key={artist.id}/>
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
