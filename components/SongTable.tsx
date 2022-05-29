import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { Box } from '@chakra-ui/layout'
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { formatDate, formatTime } from '../lib/formatter'

const SongTable = ({ songs }) => {
  return (
    <Box bg='transparent' color='white'>
      <Box padding='10px' marginBottom='20px'>
        <Box marginBottom='30px' marginLeft='10px'>
          <IconButton
            icon={<BsFillPlayFill fontSize='30px' />}
            colorScheme='green'
            size='lg'
            isRound
            aria-label='play'
          />
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
      </Box>
    </Box>
  )
}

export default SongTable
