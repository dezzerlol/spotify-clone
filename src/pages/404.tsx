import { LinkBox } from '@chakra-ui/layout'
import { Flex, Image, LinkOverlay, Text } from '@chakra-ui/react'
import Link from 'next/link'
import SEO from '../components/SEO'

const FourOFour = () => {
  return (
    <>
      <SEO title='Page not found' />
      <Flex
        bgColor='rgb(18,18,18)'
        width='100vw'
        height='100vh'
        color='white'
        alignItems='center'
        justify='center'
        direction='column'>
        <Image src='/404spotify.svg' />
        <Text as='h1' fontSize='xxx-large' fontWeight='600'>
          Page not found
        </Text>
        <Text as='h1' fontSize='sm' mt='1rem'>
          We didn&apos;t find the page you were looking for.
        </Text>
        <LinkBox color='black' borderRadius='50px' padding='10px 40px' mt='2rem' bgColor='white' cursor='pointer'>
          <Link href='/' passHref>
            <LinkOverlay>
              <Text>Main</Text>
            </LinkOverlay>
          </Link>
        </LinkBox>

        <LinkBox
          color='white'
          mt='2rem'
          cursor='pointer'
          fontWeight='600'
          sx={{ '&:hover': { textDecoration: 'underline' } }}>
          <Link href='/' passHref>
            <LinkOverlay>
              <Text>Help</Text>
            </LinkOverlay>
          </Link>
        </LinkBox>
      </Flex>
    </>
  )
}

FourOFour.authPage = true

export default FourOFour
