import { Box, Divider, Flex, Text } from '@chakra-ui/layout'
import {
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@chakra-ui/react'
import { useStoreState } from 'easy-peasy'
import { useRouter } from 'next/router'
import React from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import { logout } from '../lib/mutations'

interface Props {
  children: React.ReactNode
  color?: string
  image?: string
  subtitle?: string
  description?: string
  title?: string | React.ReactNode
  roundImage?: true | false
}

const GradientLayout = ({ children, color, image, subtitle, title, description, roundImage }: Props) => {
  const router = useRouter()
  const user = useStoreState((state: any) => state.user)
  const onLogout = async () => {
    const data = await logout()
    router.push('/signin')
  }

  return (
    <Box
      height='100%'
      overflowY='auto'
      bgGradient={`linear(${color}.500 1%, ${color}.600 10%, ${color}.700 30%, rgba(0,0,0, 0.95) 75%)`}>
      <Flex bg={`${color}.600`} padding='30px 30px 0px 30px' align='start' direction='column'>
        <Flex paddingX='10px' justifyContent='space-between' width='100%'>
          <Box>
            <ButtonGroup>
              <IconButton
                icon={<IoIosArrowDropleftCircle fontSize='35px' />}
                aria-label='back'
                outline='none'
                variant='link'
                color='black'
                colorScheme='whiteAlpha'
              />
              <IconButton
                icon={<IoIosArrowDroprightCircle fontSize='35px' />}
                aria-label='next'
                outline='none'
                variant='link'
                color='black'
                colorScheme='whiteAlpha'
              />
            </ButtonGroup>
          </Box>
          <Box marginRight='3rem'>
            <Popover autoFocus={false}>
              <PopoverTrigger>
                <Box
                  tabIndex={0}
                  role='button'
                  aria-label='Some box'
                  p='1'
                  w='100px'
                  bg='gray.900'
                  children={user ? user.username : <Skeleton width='80px' padding='1' borderRadius='50px' />}
                  borderRadius='50px'
                  color='white'
                  fontWeight='bold'
                  letterSpacing='0.3px'
                />
              </PopoverTrigger>
              <PopoverContent
                bg='gray.900'
                color='white'
                boxShadow='0px 0px 5px 3px rgba(34, 60, 80, 0.6)'
                border='0'
                width='200px'>
                <PopoverBody p='1rem'>
                  <Box mb='1rem'>Account</Box>
                  <Box mb='1rem'>Profile</Box>
                  <Box mb='1rem'>Upgrade to Premium</Box>
                  <Box mb='1rem'>Private session</Box>
                  <Box mb='1rem'>Settings</Box>
                  <Divider />
                  <Box marginTop='0.5rem'>
                    <Button variant='link' onClick={onLogout}>
                      Logout
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>
        <Flex>
          <Box padding='20px'>
            <Image boxSize='160px' boxShadow='2xl' src={image} borderRadius={roundImage ? '100%' : ''} />
          </Box>
          <Box paddingY='70px' lineHeight='40px' color='white'>
            <Text fontSize='x-small' fontWeight='bold' casing='uppercase'>
              {subtitle}
            </Text>
            <Text fontSize='6xl'>{title}</Text>
            <Text fontSize='small'>{description}</Text>
          </Box>
        </Flex>
      </Flex>
      <Box paddingY='50px'>{children}</Box>
    </Box>
  )
}

export default GradientLayout
