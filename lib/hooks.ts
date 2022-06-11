import { useStoreActions } from 'easy-peasy'
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
  const { data, error } = useSWR('/playlists/playlist', fetcher)
  useStoreActions((actions: any) => actions.setSidebarPlaylists(data))

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  }
}
