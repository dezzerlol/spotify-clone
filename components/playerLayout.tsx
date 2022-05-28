import { Box } from '@chakra-ui/layout'
import React, { FC } from 'react'
import Sidebar from './Sidebar'

const PlayerLayout: FC = ({ children }) => {
  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' top='0' left='0' width='250px'>
        <Sidebar />
      </Box>
      <Box marginLeft='250px' marginBottom='100px'>
        <Box height='calc(100vh - 100px)'>{children}</Box>
      </Box>
      <Box position='absolute' left='0' bottom='0'>
        player
      </Box>
    </Box>
  )
}

export default PlayerLayout
