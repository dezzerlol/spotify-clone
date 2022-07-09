import { Box, IconButton } from '@chakra-ui/react'
import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiHeart } from 'react-icons/hi'

interface IProps {
  handlePlay: () => void
}

const Buttons = ({ handlePlay }: IProps) => {
  return (
    <Box marginBottom='30px' marginLeft='10px' display='flex' alignItems='center'>
      <IconButton
        icon={<BsFillPlayFill fontSize='30px' />}
        colorScheme='green'
        size='lg'
        isRound
        aria-label='play'
        onClick={() => handlePlay()}
        mr='25px'
      />
      <IconButton icon={<HiHeart fontSize='40px' color='#1DB954' />} size='lg' aria-label='fav' variant='link' />
    </Box>
  )
}

export default Buttons
