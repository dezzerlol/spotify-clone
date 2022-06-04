import { Box } from '@chakra-ui/layout'
import { useStoreActions } from 'easy-peasy'
import React, { FC, useEffect } from 'react'
import { useMe } from '../lib/hooks'
import Playbar from './Playbar'
import Sidebar from './Sidebar'

const PlayerLayout: FC = ({ children }) => {
  const { user } = useMe()
  const setUser = useStoreActions((actions: any) => actions.setUser)

  useEffect(() => {
    setUser(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' top='0' left='0' width='240px'>
        <Sidebar />
      </Box>
      <Box marginLeft='240px' marginBottom='100px'>
        <Box height='calc(100vh - 100px)'>{children}</Box>
      </Box>
      <Box position='absolute' left='0' bottom='0'>
        <Playbar />
      </Box>
    </Box>
  )
}

export default PlayerLayout
