import { Box, Divider, LinkBox, LinkOverlay, List, ListIcon, ListItem, Text } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BsFillPlusSquareFill } from 'react-icons/bs'
import { FiHome, FiSearch } from 'react-icons/fi'
import { MdFavorite, MdLibraryMusic } from 'react-icons/md'
import { useSWRConfig } from 'swr'
import { usePlaylist } from '../lib/hooks'
import { createNewPlaylist } from '../lib/mutations'
import { ContextMenu } from './ContextMenu'

const navMenu = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Search', icon: FiSearch, route: '/search' },
  { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  const { mutate } = useSWRConfig()
  const [allPlaylists, setAllPlaylists] = useState(playlists)
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const router = useRouter()

  const createPlaylist = async () => {
    const data = await createNewPlaylist()
    setAllPlaylists(data.playlists)
    router.push(`/playlist/${data.newPlaylist.id}`)
  }

  useEffect(() => {
    setAllPlaylists(playlists)
  }, [playlists])

  useEffect(() => {
    const handleClick = () => setShow(false)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <Box
      width='100%'
      height='calc(100vh - 100px)'
      bg='black'
      paddingX='5px'
      color='gray'
      onContextMenu={(e) => e.preventDefault()}>
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
            {allPlaylists.map((playlist, index) => (
              <ListItem key={playlist.id} lineHeight='32px' color={router.query.id == playlist.id ? 'white' : 'gray'}>
                <LinkBox
                  fontSize='14px'
                  sx={{ '&:hover': { color: 'white' } }}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    setShow(true)
                    if (index > 6) {
                      setPoints({ x: e.pageX, y: e.pageY - 300 })
                    } else {
                      setPoints({ x: e.pageX, y: e.pageY })
                    }
                  }}>
                  <Link href={{ pathname: `/playlist/[id]`, query: { id: playlist.id } }} passHref>
                    <a>{playlist.name}</a>
                  </Link>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
        {show && (
          <ContextMenu top={points.y} left={points.x}>
            <ul>
              <li>Add to queue</li>
              <li>Go to playlist radio</li>
              <Divider color='gray.500' />
              <li>Add to profile</li>
              <Divider color='gray.500' />
              <li>Report</li>
              <li>Remove from your library</li>
              <Divider color='gray.500' />
              <li>Download</li>
              <li>Create playlist</li>
              <li>Create folder</li>
              <Divider color='gray.500' />
              <li>Share</li>
            </ul>
          </ContextMenu>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
