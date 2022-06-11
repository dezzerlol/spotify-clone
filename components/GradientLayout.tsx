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
  useDisclosure,
} from '@chakra-ui/react'
import { useStoreState } from 'easy-peasy'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from 'react-icons/io'
import { logout } from '../lib/mutations'
import Modal from './Modal'

interface IProps {
  children: React.ReactNode
  color?: string
  image?: string
  subtitle?: 'profile' | 'playlist'
  description?: string
  title?: string | React.ReactNode
  roundImage?: true | false
}

const GradientLayout = ({ children, color, image, subtitle, title, description, roundImage }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageTitle, setPageTitle] = useState(title)
  const router = useRouter()
  const user = useStoreState((state: any) => state.user)

  const onLogout = async () => {
    await logout()
    router.push('/signin')
  }

  useEffect(() => {
    setPageTitle(title)
  }, [title])

  return (
    <Box
      height='100%'
      overflowY='auto'
      bgGradient={`linear(${color}.500 1%, ${color}.600 10%, ${color}.700 30%, rgba(0,0,0, 0.95) 75%)`}
      onContextMenu={(e) => e.preventDefault()}>
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
                bgColor='#282828'
                color='white'
                boxShadow='0px 0px 5px 3px rgba(34, 60, 80, 0.6)'
                border='0'
                width='220px'>
                <PopoverBody p='1rem'>
                  <Box
                    padding='8px 12px'
                    sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                    borderRadius='5px'
                    cursor='pointer'>
                    Account
                  </Box>
                  <Box
                    padding='8px 12px'
                    sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                    borderRadius='5px'
                    cursor='pointer'>
                    <Link href={user ? `/user/${user.id}` : ''} passHref>
                      Profile
                    </Link>
                  </Box>
                  <Box
                    padding='8px 12px'
                    sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                    borderRadius='5px'
                    cursor='pointer'>
                    Upgrade to Premium
                  </Box>
                  <Box
                    padding='8px 12px'
                    sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                    borderRadius='5px'
                    cursor='pointer'>
                    Private session
                  </Box>
                  <Box
                    padding='8px 12px'
                    sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                    borderRadius='5px'
                    cursor='pointer'>
                    Settings
                  </Box>
                  <Divider />
                  <Box
                    padding='8px 12px'
                    sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                    borderRadius='5px'
                    cursor='pointer'>
                    <Button
                      variant='link'
                      onClick={onLogout}
                      sx={{ '&:hover': { textDecoration: 'none' } }}
                      color='white'
                      fontWeight='400'>
                      Log out
                    </Button>
                  </Box>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Box>
        </Flex>

        {title && (
          <Flex>
            <Box padding='20px'>
              <Image boxSize='180px' boxShadow='2xl' src={image} borderRadius={roundImage ? '100%' : ''} />
            </Box>
            <Box paddingY='60px' lineHeight='40px' color='white'>
              <Text fontSize='x-small' fontWeight='bold' casing='uppercase'>
                {subtitle}
              </Text>
              <Button
                fontSize='6xl'
                color='white'
                variant='link'
                m='0'
                p='0'
                lineHeight='6xl'
                onClick={onOpen}
                sx={{ '&:hover': { color: 'white', textDecoration: 'none' } }}>
                {pageTitle}
              </Button>
              <Text fontSize='small'>{description}</Text>
            </Box>
          </Flex>
        )}
      </Flex>
      <Box paddingY='20px'>{children}</Box>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        image={image}
        roundImage={roundImage}
        subtitle={subtitle}
        id={Number(router.query.id)}
        setPageTitle={setPageTitle}
        pageTitle={pageTitle}
      />
    </Box>
  )
}

export default GradientLayout
