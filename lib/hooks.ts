import { useStoreActions } from 'easy-peasy';
import useSWR from 'swr'
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
  playlists: Response | []
  isLoading: boolean
  isError: string
}

// call api 'me'
export const useMe = (): useMeReturn => {
  const { data, error } = useSWR('/me', fetcher)

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  }
}

// call api 'playlist'
export const usePlaylist = () => {
  const setSidebarPlaylists = useStoreActions((store: any) => store.setSidebarPlaylists)
  const { data, error } = useSWR('/playlist', fetcher)
  setSidebarPlaylists(data)

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  }
}

