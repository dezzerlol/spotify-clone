import { Box, Divider, LinkBox, LinkOverlay, List, ListIcon, ListItem, Text } from '@chakra-ui/layout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdFavorite, MdHome, MdLibraryMusic, MdPlaylistAdd, MdSearch } from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'

const navMenu = [
  { name: 'Home', icon: MdHome, route: '/' },
  { name: 'Search', icon: MdSearch, route: '/search' },
  { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const musicMenu = [
  { name: 'Create Playlist', icon: MdPlaylistAdd, route: '/' },
  { name: 'Favorites', icon: MdFavorite, route: '/favorites' },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()

  return (
    <Box width='100%' height='calc(100vh - 100px)' bg='black' paddingX='5px' color='gray'>
      <Box paddingY='20px' height='100%'>
        <Box width='160px' marginBottom='20px' paddingX='20px'>
          <Image src='/Spotify_logo.svg' width={120} height={60} />
        </Box>

        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                <LinkBox>
                  <Link href={menu.route} passHref>
                    <LinkOverlay display='flex' alignItems='center'>
                      <ListIcon as={menu.icon} color='white' marginRight='20px' width='30px' height='30px' />
                      <Text fontWeight='bold'>{menu.name}</Text>
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box marginTop='20px'>
          <List spacing={2}>
            {musicMenu.map((menu) => (
              <ListItem paddingX='20px' fontSize='16px' key={menu.name}>
                <LinkBox>
                  <Link href={menu.route} passHref>
                    <LinkOverlay display='flex' alignItems='center'>
                      <ListIcon as={menu.icon} color='white' marginRight='20px' width='30px' height='30px' />
                      <Text fontWeight='bold'>{menu.name}</Text>
                    </LinkOverlay>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider color='gray.700' marginY='20px' />

        <Box height='66%' overflowY='auto' paddingX='20px' sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
          <List>
            {playlists.map((playlist) => (
              <ListItem key={playlist.id} marginBottom='10px'>
                <LinkBox>
                  <Link href={{ pathname: `/playlist/[id]`, query: { id: playlist.id } }} passHref>
                    {playlist.name}
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  )
}

export default Sidebar
