import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

type Props = {
  item: any
}

const Card = ({ item }: Props) => {
  return (
    <Flex
      bgColor='var(--card-dark-bg)'
      direction='column'
      height='250px'
      borderRadius='5px'
      width='200px'
      cursor='pointer'
      sx={{ '&:hover': { bgColor: 'gray.900' } }}>
      <Image
        boxSize='140px'
        borderRadius={item.userId ? '' : '50%'}
        objectFit='cover'
        marginLeft='auto'
        marginRight='auto'
        marginTop='20px'
        boxShadow='4px 4px 30px 5px rgba(0, 0, 0, 0.8)'
        src={item.photo ? item.photo : item.avatar ? item.avatar : '/defaultPlaylist.jpg'}
      />
      <Box padding='20px 0px 0px 20px'>
        <Text fontWeight='600' fontSize='18px'>
          {item.name}
        </Text>
        <Text fontSize='14px' color='gray.400'>
          {item.userId ? 'Playlist' : 'Artist'}
        </Text>
      </Box>
    </Flex>
  )
}

export default Card
