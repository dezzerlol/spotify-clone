import { Box, Center } from '@chakra-ui/layout'
import { ButtonGroup, IconButton } from '@chakra-ui/react'
import React from 'react'
import { ReactHowler } from 'react-howler'
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from 'react-icons/md'

const Player = () => {
  return (
    <Box>
      <Box>{/*  <ReactHowler /> */}</Box>
      <Center color='gray.600'>
        <ButtonGroup>
          <IconButton outline='none' icon={<MdShuffle />} variant='link' aria-label='shuffle' fontSize='18px' />
          <IconButton outline='none' icon={<MdSkipPrevious />} variant='link' aria-label='previous' fontSize='24px' />
          <IconButton
            outline='none'
            icon={<MdOutlinePlayCircleFilled />}
            variant='link'
            aria-label='play'
            fontSize='40px'
            color='white'
          />
          <IconButton
            outline='none'
            icon={<MdOutlinePauseCircleFilled />}
            variant='link'
            aria-label='pause'
            fontSize='40px'
            color='white'
          />
          <IconButton outline='none' icon={<MdSkipNext />} variant='link' aria-label='next' fontSize='24px' />
          <IconButton outline='none' icon={<MdOutlineRepeat />} variant='link' aria-label='repeat' fontSize='18px' />
        </ButtonGroup>
      </Center>
    </Box>
  )
}

export default Player
