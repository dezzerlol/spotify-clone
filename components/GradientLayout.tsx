import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import React from 'react'

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
  return (
    <Box height='100%' overflowY='auto' bgGradient={`linear(${color}.500 1%, ${color}.600 10%, ${color}.700 30%, rgba(0,0,0, 0.95) 75%)`}>
      <Flex bg={`${color}.600`} padding='40px' align='end'>
        <Box padding='20px'>
          <Image boxSize='160px' boxShadow='2xl' src={image} borderRadius={roundImage ? '100%' : ''} />
        </Box>
        <Box padding='20px' lineHeight='40px' color='white'>
          <Text fontSize='x-small' fontWeight='bold' casing='uppercase'>
            {subtitle}
          </Text>
          <Text fontSize='6xl'>{title}</Text>
          <Text fontSize='small'>{description}</Text>
        </Box>
      </Flex>
      <Box paddingY='50px'>{children}</Box>
    </Box>
  )
}

export default GradientLayout
