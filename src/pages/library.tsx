import { Flex, Text } from '@chakra-ui/layout'
import { Box, Image } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import LayoutHeader from '../components/Header/Header'
import { usePlaylist } from '../utils/hooks'

const Library = () => {
  const { playlists } = usePlaylist()

  return (
    <Flex
      padding='30px 30px 0px 30px'
      align='start'
      direction='column'
      bgColor='var(--dark-bg)'
      height='100%'
      color='white'
      overflowY='auto'>
      <LayoutHeader bgcolor='white' />
      <Flex padding='20px' direction='column'>
        <Text fontSize='28px' fontWeight='600' color='white' mb='1rem'>
          Playlists
        </Text>

        <Flex direction='row' wrap='wrap' gap='2rem'>
          <Flex
            justifyContent='start'
            alignItems='end'
            width='430px'
            height='250px'
            borderRadius='5px'
            background='linear-gradient(149.46deg,#450af5,#8e8ee5 99.16%)'
            cursor='pointer'>
            <Box padding='20px'>
              <Text fontSize='24px' fontWeight='600'>
                Favorite tracks
              </Text>
            </Box>
          </Flex>
          {playlists &&
            playlists.map((item) => (
              <Link key={item.id} href={`/playlist/${item.id}`} passHref>
                <Flex
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
                    src={item.photo ? item.photo : '/defaultPlaylist.jpg'}
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
              </Link>
            ))}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Library
