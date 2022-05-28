import { Box, Flex } from '@chakra-ui/layout'
import { Button, Input } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useSWRConfig } from 'swr'
import { auth } from '../lib/mutations'

const AuthForm: FC<{ mode: 'signin' | 'signup' }> = ({ mode }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const user = await auth(mode, { email, password })
    setIsLoading(false)
    router.push('/')
  }

  return (
    <Box height='100vh' width='100vw' bg='black' color='white'>
      <Flex align='center' justify='center' height='100px' borderBottom='1px solid lightgreen'>
        <Image src='/Spotify_logo.svg' width='160' height='80' />
      </Flex>

      <Flex align='center' justify='center' height='calc(100vh - 100px)'>
        <Box padding='50px' bg='gray.900' borderRadius='6px'>
          <form onSubmit={handleSubmit}>
            <Input placeholder='email' type='email' onChange={(e) => setEmail(e.target.value)} mb='1rem' />
            <Input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} mb='1rem' />
            <Button type='submit' isLoading={isLoading} variant='solid' bg='green.500' sx={{ '&:hover': { bg: 'green.400' } }}>
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  )
}

export default AuthForm
