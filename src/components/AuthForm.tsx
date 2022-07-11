import { Box, Divider, Flex, Text } from '@chakra-ui/layout'
import { Button, Checkbox, Input, Link } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { auth } from '../services/mutations'
import { setUser } from '../store/Reducer'

// FIXME on production build loading spinner on button stops while request is still going
type FormProps = {
  mode: 'signin' | 'signup'
}

const AuthForm = ({ mode }: FormProps) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const data = await auth(mode, { email, password, username })
    if (data.error) {
      setIsError(true)
      setError(data.error)
      setIsLoading(false)
    } else {
      setIsError(false)
      dispatch(setUser(data))
      router.push('/')
      setIsLoading(false)
    }
  }

  return (
    <Box color='black' height='100%'>
      <Flex
        align='center'
        justify='center'
        height='100px'
        width='100%'
        top='0'
        borderBottom='1px solid lightgray'
        position='static'>
        <NextLink href='/signin' passHref>
          <a>
            <Image src='/Spotify_logo_black.svg' width={180} height={60} />
          </a>
        </NextLink>
      </Flex>
      {mode === 'signin' ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          top='100px'
          position='relative'
          flexDirection='column'
          height='100%'>
          {isError && (
            <Box textAlign='center' marginTop='1rem'>
              <Text color='red' fontSize='14px'>
                There was error processing your request: {error}.
              </Text>
            </Box>
          )}
          <Text fontWeight='bold' fontSize='14px'>
            To continue, log in to Spotify.
          </Text>
          <Box padding='50px'>
            <form onSubmit={handleSubmit}>
              <Box>
                <Input
                  placeholder='Email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                  mb='1rem'
                  padding='25px'
                  isRequired
                />
                <Input
                  placeholder='Password'
                  type='password'
                  onChange={(e) => setPassword(e.target.value)}
                  mb='1rem'
                  padding='25px'
                  isRequired
                />
              </Box>
              <NextLink href='/signin' passHref>
                <Link>Forgot your password?</Link>
              </NextLink>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Checkbox colorScheme='green'>Remember me</Checkbox>
                <Button
                  type='submit'
                  isLoading={isLoading}
                  variant='solid'
                  bg='#1ED760'
                  borderRadius='50px'
                  float='right'
                  width='120px'
                  height='50px'
                  sx={{ '&:hover': { bg: 'green.400' } }}>
                  Sign in
                </Button>
              </Box>
            </form>
            <Box>
              <Divider marginY='2rem' color='gray.500' />
              <Text fontWeight='bold' fontSize='18px' textAlign='center' marginBottom='2rem'>
                Don&apos;t have an account?
              </Text>
              <Button
                textTransform='uppercase'
                borderRadius='50px'
                bg='white'
                border='1px solid lightgray'
                width='100%'
                onClick={() => router.push('/signup')}>
                sign up for spotify
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          top='100px'
          position='relative'
          flexDirection='column'
          height='100%'>
          <Text fontWeight='bold' fontSize='18px'>
            Signup and listen for free.
          </Text>
          <Box padding='50px'>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Input
                placeholder='Username'
                type='text'
                onChange={(e) => setUsername(e.target.value)}
                mb='1rem'
                padding='25px'
                width='414px'
              />
              <Input
                placeholder='Email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                mb='1rem'
                padding='25px'
                width='414px'
              />
              <Input
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                mb='1rem'
                padding='25px'
                width='414px'
              />

              <Button
                type='submit'
                isLoading={isLoading}
                variant='solid'
                bg='#1ED760'
                borderRadius='50px'
                width='120px'
                height='50px'
                sx={{ '&:hover': { bg: 'green.400' } }}>
                Submit
              </Button>
            </form>
            {isError && (
              <Box textAlign='center' marginTop='1rem'>
                <Text color='red' fontSize='14px'>
                  There was error processing your request: {error}.
                </Text>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default AuthForm
