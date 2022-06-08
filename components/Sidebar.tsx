import { Box, Divider, LinkBox, LinkOverlay, List, ListIcon, ListItem, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { FiHome, FiSearch } from 'react-icons/fi'
import { MdFavorite, MdLibraryMusic } from 'react-icons/md'
import { usePlaylist } from '../lib/hooks'
import { createNewPlaylist } from '../lib/mutations'

const navMenu = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Search', icon: FiSearch, route: '/search' },
  { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  const [allPlaylists, setAllPlaylists] = useState(playlists)
  const setSidebarPlaylists = useStoreActions((store: any) => store.setSidebarPlaylists)
  const sidebarPlaylists = useStoreState((store: any) => store.sidebarPlaylists)
  const router = useRouter()

  useEffect(() => {
    setAllPlaylists(playlists)
  }, [playlists])

  const createPlaylist = async () => {
    const data = await createNewPlaylist()
    setAllPlaylists(data.playlists)
    router.push(`/playlist/${data.newPlaylist.id}`)
  }

  return (
    <Box width='100%' height='calc(100vh - 100px)' bg='black' paddingX='5px' color='gray'>
      <Box paddingY='20px' height='100%'>
        <Box width='200px' marginBottom='20px' paddingX='20px'>
          <Image src='/Spotify_logo.svg' width={140} height={60} />
        </Box>

        <Box marginBottom='20px'>
          <List spacing={2}>
            {navMenu.map((menu) => (
              <ListItem
                paddingX='20px'
                paddingY='5px'
                fontSize='16px'
                key={menu.name}
                sx={{ '&:hover': { color: 'white' } }}>
                <LinkBox>
                  <Link href={menu.route} passHref>
                    <LinkOverlay display='flex' alignItems='center'>
                      <ListIcon as={menu.icon} marginRight='20px' width='25px' height='25px' />
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
            <ListItem paddingX='20px' paddingY='5px' fontSize='16px' onClick={createPlaylist}>
              <Button variant='link' sx={{ '&:hover': { color: 'white', textDecoration: 'none' } }}>
                <LinkOverlay display='flex' alignItems='center'>
                  <ListIcon as={BsFillPlusSquareFill} marginRight='20px' width='25px' height='25px' />
                  <Text fontWeight='bold'>Create playlist</Text>
                </LinkOverlay>
              </Button>
            </ListItem>

            <ListItem paddingX='20px' paddingY='5px' fontSize='16px'>
              <LinkBox sx={{ '&:hover': { color: 'white', textDecoration: 'none' } }}>
                <Link href='/favorites' passHref>
                  <LinkOverlay display='flex' alignItems='center'>
                    <ListIcon as={MdFavorite} marginRight='20px' width='25px' height='25px' />
                    <Text fontWeight='bold'>Liked songs</Text>
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </ListItem>
          </List>
        </Box>

        <Divider color='gray.700' marginY='20px' />

        <Box height='66%' overflowY='auto' paddingX='20px' sx={{ '::-webkit-scrollbar': { display: 'none' } }}>
          <List>
            {allPlaylists.map((playlist) => (
              <ListItem key={playlist.id} marginBottom='10px' color={router.query.id == playlist.id ? 'white' : 'gray'}>
                <LinkBox fontSize='14px'>
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
