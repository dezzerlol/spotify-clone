import {
  Button,
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
  Box,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { BsPlayFill } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { formatDate, formatTime } from '../../utils/formatter'
import { usePlaylist, useStateWithDep } from '../../utils/hooks'
import { addToPlaylist, removeFromPlaylist } from '../../services/mutations'
import { changeActiveSong, changeActiveSongs } from '../../store/Reducer'
import { ContextMenu } from '../../styles/ContextMenu'
import Buttons from './TableButtons'
import { Song } from '../../types/song'

type Props = {
  songs: Song[]
  type: 'search' | 'playlist'
}

const SongTable = ({ songs, type }: Props) => {
  const { playlists } = usePlaylist()
  const router = useRouter()
  const dispatch = useDispatch()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [allSongs, setAllSongs] = useStateWithDep<Song[]>(songs)
  const [isShow, setIsShow] = useState(false)
  const [points, setPoints] = useState({ x: 0, y: 0 })
  const [clickedSong, setClickedSong] = useState(1)
  const [isHover, setIsHover] = useState(-1)

  const handlePlay = (activeSong?) => {
    dispatch(changeActiveSong(activeSong || allSongs[0]))
    dispatch(changeActiveSongs(allSongs))
  }

  const handleAdd = (playlistId: number, songId: number) => {
    addToPlaylist({ playlistId, songId })
  }

  const handleRemove = async (playlistId: number, songId: number) => {
    await removeFromPlaylist({ playlistId, songId })
    setAllSongs((state) => state.filter((song) => song.id !== songId))
  }

  useEffect(() => {
    const handleClick = () => setIsShow(false)
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  return (
    <Box bg='transparent' color='white' width='100%'>
      <Box padding='10px' marginBottom='20px'>
        {type === 'playlist' ? <Buttons handlePlay={handlePlay} /> : ''}
        <Table variant='unstyled'>
          <Thead borderBottom='1px solid' borderColor='rgba(255,255,255, 0.2)'>
            <Tr color='gray.400'>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {allSongs.map((song, index) => (
              <Tr
                onClick={() => handlePlay(song)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  setIsShow(true)
                  setClickedSong(song.id)
                  if (index > allSongs.length / 4) {
                    setPoints({ x: e.pageX, y: e.pageY - 300 })
                  } else {
                    setPoints({ x: e.pageX, y: e.pageY })
                  }
                }}
                onMouseEnter={() => setIsHover(index)}
                onMouseLeave={() => setIsHover(-1)}
                sx={{ transition: 'all 0.3s', '&:hover': { bg: 'rgba(255,255,255, 0.1)' } }}
                key={song.id}
                cursor='pointer'>
                <Td color='gray.400' width='30px'>
                  {isHover === index ? <BsPlayFill fontSize='24px' /> : <Box width='30px'>{index + 1}</Box>}
                </Td>
                <Td>
                  <Flex direction='row' align='center'>
                    <Box paddingRight='20px'>
                      <Image src={song.photo ? song.photo : '/defaultPlaylist.jpg'} width={35} height={35} />
                    </Box>
                    <Box>
                      <Text>{song.name}</Text>
                      <Text fontSize='xs' color='gray.400'>
                        {song.artist.name}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td color='gray.400'>{formatDate(new Date(song.createdAt))}</Td>
                <Td color='gray.400'> {formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {isShow && (
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
                <li>
                  <Button
                    onClick={() => handleRemove(Number(router.query.id), clickedSong)}
                    variant='link'
                    color='white'
                    fontWeight='400'
                    fontSize='14px'
                    sx={{ '&:hover': { textDecoration: 'none' } }}>
                    Remove from this playlist
                  </Button>
                </li>
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
