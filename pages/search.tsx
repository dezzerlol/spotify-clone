import { Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import LayoutHeader from '../components/Layout/LayoutHeader'
import SongTable from '../components/SongTable'

const Search = () => {
  const searchValues = useSelector((state: any) => state.playlistReducer.searchValues)

  return (
    <Flex
      padding='30px 30px 0px 30px'
      align='start'
      direction='column'
      bgColor='var(--dark-bg)'
      height='100%'
      width='100%'
      overflowY='auto'
      color='white'
      onContextMenu={(e) => e.preventDefault()}>
      <LayoutHeader bgcolor='white' type='search' />
      {searchValues && <SongTable songs={searchValues} type='search' />}
    </Flex>
  )
}

export default Search
