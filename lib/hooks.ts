import { useDispatch } from 'react-redux'
import { useStoreActions } from 'easy-peasy'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { setSidebarPlaylists } from '../store/Reducer'
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
  const { data, error } = useSWR('/user/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

// call api 'playlist'
export const usePlaylist = (): usePlaylistReturn => {
  const dispatch = useDispatch()
  const { data, error } = useSWR('/playlists/playlist', fetcher)
  // useStoreActions((actions: any) => actions.setSidebarPlaylists(data))
  dispatch(setSidebarPlaylists(data))

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
