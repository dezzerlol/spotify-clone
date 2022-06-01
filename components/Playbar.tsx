import { Box, Flex, Text } from '@chakra-ui/layout'
import { IconButton } from '@chakra-ui/react'
import { useStoreState } from 'easy-peasy'
import Image from 'next/image'
import React, { useState } from 'react'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import Player from './Player'

const Playbar = () => {
  const [fav, setFav] = useState(false)
  const songs = useStoreState((state: any) => state.activeSongs)
  const activeSong = useStoreState((state: any) => state.activeSong)

  const setFavorite = () => {
    setFav((state) => !state)
  }

  return (
    <Box height='100px' width='100vw' bg='blackAlpha.900' padding='10px'>
      <Flex align='center'>
        {activeSong ? (
          <Box padding='10px' color='white' width='30%' display='flex' alignItems='center'>
            <Box mr='20px'>
              <Image src='/placeholder.jpg' width={56} height={56} />
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
                icon={fav ? <HiHeart fontSize='20px' color='#1DB954'/> : <HiOutlineHeart fontSize='20px' />}
                color='gray'
                aria-label='like song'
                variant='link'
                onClick={setFavorite}
              />
            </Box>
          </Box>
        ) : null}

        <Box width='40%'>{activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}</Box>
      </Flex>
    </Box>
  )
}

export default Playbar
