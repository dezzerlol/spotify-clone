import { Box, Flex, Text } from '@chakra-ui/layout'
import { Button, Image, useDisclosure } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { useStateWithDep } from '../../utils/hooks'
import LayoutHeader from '../Header/Header'
import Modal from './Modal'

type Props = {
  children: React.ReactNode
  color?: string
  image?: string
  subtitle?: 'profile' | 'playlist'
  description?: string
  title?: string | React.ReactNode
  roundImage?: true | false
}

const GradientLayout = ({ children, color, image, subtitle, title, description, roundImage }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [pageTitle, setPageTitle] = useStateWithDep(title)
  const router = useRouter()

  return (
    <Box
      height='100%'
      overflowY='auto'
      bgGradient={`linear(${color}.500 1%, ${color}.600 10%, ${color}.700 30%, rgba(0,0,0, 0.95) 75%)`}
      onContextMenu={(e) => e.preventDefault()}>
      <Flex bg={`${color}.600`} padding='30px 30px 0px 30px' align='start' direction='column'>
        <LayoutHeader />
        {title && (
          <Flex>
            <Box padding='20px'>
              <Image
                boxSize='180px'
                boxShadow='2xl'
                src={image ? image : '/defaultPlaylist.jpg'}
                borderRadius={roundImage ? '100%' : ''}
              />
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
