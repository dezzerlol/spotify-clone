import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { API_GET_PLAYLISTS, API_GET_USER } from '../services/apiConsts'
import fetcher from './fetcher'

interface useMeReturn {
  user: {
    username: string
    playlistsCount: number
  }
  isLoading: boolean
  isError: string
}

interface usePlaylistReturn {
  playlists: string[] | []
  isLoading: boolean
  isError: string
}

// call api 'me'
export const useMe = (): useMeReturn => {
  const { data, error } = useSWR(API_GET_USER, fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

// call api 'playlist'
export const usePlaylist = (): usePlaylistReturn => {
  const { data, error } = useSWR(API_GET_PLAYLISTS, fetcher)

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  }
}

// use state with dependancy
export function useStateWithDep(defaultValue: any) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])
  return [value, setValue]
}
