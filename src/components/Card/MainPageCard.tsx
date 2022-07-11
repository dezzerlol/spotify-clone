import { Flex, Image, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { IPlaylist } from '../../types/playlist'

const MainPageCard = ({ playlist }: { playlist: IPlaylist }) => {
  const router = useRouter()
  return (
    <Flex
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
  )
}

export default MainPageCard
