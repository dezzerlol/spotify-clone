import { Box } from '@chakra-ui/layout'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useMe } from '../utils/hooks'
import { setUser } from '../store/Reducer'
import Playbar from './Playbar/Playbar'
import Sidebar from './Sidebar/Sidebar'

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useMe()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUser(user))
    }
  }, [user])

  return (
    <Box width='100vw' height='100vh'>
      <Box position='absolute' top='0' left='0' width='240px'>
        <Sidebar />
      </Box>
      <Box marginLeft='240px' minWidth='720px' marginBottom='100px'>
        <Box height='calc(100vh - 100px)'>{children}</Box>
      </Box>
      <Box position='absolute' minWidth='960px' left='0' bottom='0'>
        <Playbar />
      </Box>
    </Box>
  )
}

export default PageLayout
