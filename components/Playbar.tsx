import { Box, Flex, Text } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useSelector } from 'react-redux'
import Player from './Player'

const Playbar = () => {
  const [fav, setFav] = useState(false)
  const songs = useSelector((state: any) => state.playlistReducer.activeSongs)
  const activeSong = useSelector((state: any) => state.playlistReducer.activeSong)

  const setFavorite = () => {
    setFav((state) => !state)
  }

  return (
    <Box
      height='100px'
      width='100vw'
      bg='#181818'
      padding='10px'
      borderTop='1px solid #282828'
      onContextMenu={(e) => e.preventDefault()}>
      <Flex align='center'>
        {activeSong ? (
          <Box padding='10px' color='white' width='20%' display='flex' alignItems='center'>
            <Box mr='20px'>
              <Image
                src={activeSong.photo ? activeSong.photo : '/placeholder.jpg'}
                width={56}
                height={56}
                objectFit='cover'
              />
            </Box>
            <Box>
              <Text fontSize='sm' mb='0' lineHeight='16px'>
                {activeSong.name}
              </Text>
              <Text fontSize='xs' color='gray.400' lineHeight='16px'>
                {activeSong.artist.name}
              </Text>
            </Box>
            <Box>
              <IconButton
                icon={fav ? <HiHeart fontSize='20px' color='#1DB954' /> : <HiOutlineHeart fontSize='20px' />}
                color='gray'
                aria-label='like song'
                variant='link'
                onClick={setFavorite}
              />
            </Box>
          </Box>
        ) : null}

        <Box width='80%'>{activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}</Box>
      </Flex>
    </Box>
  )
}

export default Playbar
