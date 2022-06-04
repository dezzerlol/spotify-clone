import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Input } from '@chakra-ui/react'
import { useStoreActions } from 'easy-peasy'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const setUser = useStoreActions((store: any) => store.setUser)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const user = await auth(mode, { email, password })
    setUser(user)
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height='100vh' width='100vw' color='black'>
      <Flex align='center' justify='center' height='100px' borderBottom='1px solid lightgray'>
        <Image src='/Spotify_logo_black.svg' width='180' height='60' />
      </Flex>

      <Flex align='center' justify='center' height='calc(100vh - 100px)' direction='column'>
        <Text fontWeight='bold' fontSize='14px'>To continue, log in to Spotify.</Text>
        <Box padding='50px' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Input placeholder='Email' type='email' onChange={(e) => setEmail(e.target.value)} mb='1rem' />
            <Input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)} mb='1rem' />
            <Button
              type='submit'
              isLoading={isLoading}
              variant='solid'
              bg='green.500'
              sx={{ '&:hover': { bg: 'green.400' } }}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
