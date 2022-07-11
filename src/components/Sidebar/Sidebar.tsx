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
import { usePlaylist } from '../../utils/hooks'
import { API_GET_PLAYLISTS } from '../../services/apiConsts'
import { createNewPlaylist, removePlaylist } from '../../services/mutations'
import { ContextMenu } from '../../styles/ContextMenu'

const navMenu = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Search', icon: FiSearch, route: '/search' },
  { name: 'Your Library', icon: MdLibraryMusic, route: '/library' },
]

const Sidebar = () => {
  const { playlists } = usePlaylist()
  const { mutate } = useSWRConfig()
  const [isShow, setIsShow] = useState(false)
  const [clickedPlaylist, setClickedPlaylist] = useState(0)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const router = useRouter()

  const handleCreatePlaylist = async () => {
    const data = await createNewPlaylist()
    router.push(`/playlist/${data.newPlaylist.id}`)
    mutate(API_GET_PLAYLISTS)
  }

  const handleDeletePlaylist = async (playlistId: number) => {
    await removePlaylist({ playlistId })
    mutate(API_GET_PLAYLISTS)
  }

  // closing context menu on outside click
  useEffect(() => {
    const handleClick = () => setIsShow(false)
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
        <Box width='200px' marginBottom='20px' paddingX='20px' cursor='pointer'>
          <Link href='/' passHref>
            <Image src='/Spotify_logo.svg' width={140} height={60} />
          </Link>
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
            <ListItem paddingX='20px' paddingY='5px' fontSize='16px' onClick={handleCreatePlaylist}>
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
            {playlists
              ? playlists.map((playlist, index) => (
                  <ListItem
                    key={playlist.id}
                    lineHeight='32px'
                    color={+router.query.id === playlist.id ? 'white' : 'gray'}>
                    <LinkBox
                      fontSize='14px'
                      sx={{ '&:hover': { color: 'white' } }}
                      onContextMenu={(e) => {
                        e.preventDefault()
                        setIsShow(true)
                        setClickedPlaylist(playlist.id)
                        if (index > 6) {
                          setPoints({ x: e.pageX, y: e.pageY - 300 })
                        } else {
                          setPoints({ x: e.pageX, y: e.pageY })
                        }
                      }}>
                      <Link href={{ pathname: `/playlist/[id]`, query: { id: playlist.id } }}>
                        <a>{playlist.name}</a>
                      </Link>
                    </LinkBox>
                  </ListItem>
                ))
              : ''}
          </List>
        </Box>
        {isShow && (
          <ContextMenu top={points.y} left={points.x}>
            <ul>
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Add to queue
                </Button>
              </li>
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Go to playlist radio
                </Button>
              </li>
              <Divider color='gray.500' />
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Add to profile
                </Button>
              </li>
              <Divider color='gray.500' />
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Report
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => handleDeletePlaylist(clickedPlaylist)}
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Remove from Your library
                </Button>
              </li>
              <Divider color='gray.500' />
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Download
                </Button>
              </li>
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  onClick={handleCreatePlaylist}
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Create playlist
                </Button>
              </li>
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Create folder
                </Button>
              </li>
              <Divider color='gray.500' />
              <li>
                <Button
                  variant='link'
                  color='white'
                  fontWeight='400'
                  fontSize='14px'
                  disabled
                  sx={{ '&:hover': { textDecoration: 'none' } }}>
                  Share
                </Button>
              </li>
            </ul>
          </ContextMenu>
        )}
      </Box>
    </Box>
  )
}

export default Sidebar
