import { Box, Divider } from '@chakra-ui/layout'
import {
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import { useStoreActions } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsFillPlayFill } from 'react-icons/bs'
import { HiHeart } from 'react-icons/hi'
import { formatDate, formatTime } from '../lib/formatter'
import { usePlaylist } from '../lib/hooks'
import { addToPlaylist } from '../lib/mutations'
import { ContextMenu } from './ContextMenu'

const SongTable = ({ songs }) => {
  const { playlists } = usePlaylist()
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs)
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong)
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [show, setShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [clickedSong, setClickedSong] = useState(1)

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0])
    playSongs(songs)
  }

  useEffect(() => {
    const handleClick = () => setShow(false)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  const handleAdd = (playlistId: number, songId: number) => {
    addToPlaylist({ playlistId, songId })
  }

  return (
    <Box bg='transparent' color='white'>
      <Box padding='10px' marginBottom='20px'>
        <Box marginBottom='30px' marginLeft='10px' display='flex' alignItems='center'>
          <IconButton
            icon={<BsFillPlayFill fontSize='30px' />}
            colorScheme='green'
            size='lg'
            isRound
            aria-label='play'
            onClick={() => handlePlay()}
            mr='25px'
          />
          <IconButton icon={<HiHeart fontSize='40px' color='#1DB954' />} size='lg' aria-label='fav' variant='link' />
        </Box>
        <Table variant='unstyled'>
          <Thead borderBottom='1px solid' borderColor='rgba(255,255,255, 0.2)'>
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {songs.map((song, index) => (
              <Tr
                onClick={() => handlePlay(song)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setShow(true)
                  setClickedSong(song.id)
                  if (index > songs.length / 4) {
                    setPoints({ x: e.pageX, y: e.pageY - 300 })
                  } else {
                    setPoints({ x: e.pageX, y: e.pageY })
                  }
                }}
                sx={{ transition: 'all 0.3s', '&:hover': { bg: 'rgba(255,255,255, 0.1)' } }}
                key={song.id}
                cursor='pointer'>
                <Td>{index + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        {show && (
          <Popover
            autoFocus={false}
            isLazy
            returnFocusOnClose={false}
            isOpen={isOpen}
            placement='right-end'
            onClose={onClose}
            closeOnBlur={false}
            trigger='hover'>
            <ContextMenu top={points.y} left={points.x}>
              <ul>
                <li>Add to queue</li>
                <Divider color='gray.500' />
                <li>Go to song radio</li>
                <li>Go to artist</li>
                <li>Go to album</li>
                <li>Report</li>
                <li>Show credits</li>
                <Divider color='gray.500' />
                <li>Save to your Liked songs</li>
                <li>Remove from this playlist</li>
                <PopoverTrigger>
                  <li onMouseEnter={onToggle}>Add to playlist</li>
                </PopoverTrigger>
                <Divider color='gray.500' />
                <li>Share</li>
              </ul>

              <PopoverContent
                bgColor='#282828'
                border='0'
                width='170px'
                boxShadow='0 16px 24px rgb(0 0 0 / 30%), 0 6px 8px rgb(0 0 0 / 20%)'>
                <PopoverBody>
                  {playlists.map((playlist) => (
                    <Box
                      onClick={() => handleAdd(playlist.id, clickedSong)}
                      key={playlist.id}
                      p='0.5rem'
                      cursor='pointer'
                      sx={{ '&:hover': { backgroundColor: '#4b4b4b' } }}
                      borderRadius='5px'>
                      {playlist.name}
                    </Box>
                  ))}
                </PopoverBody>
              </PopoverContent>
            </ContextMenu>
          </Popover>
        )}
      </Box>
    </Box>
  )
}

export default SongTable
