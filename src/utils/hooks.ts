import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { API_GET_PLAYLISTS, API_GET_USER } from '../services/apiConsts'
import { IUser } from '../types/user'
import { IPlaylist } from '../types/playlist'
import fetcher from './fetcher'

type UserType = IUser & {
  playlistsCount: number
}

type useMeReturn = {
  user: UserType
  isLoading: boolean
  isError: string
}

type usePlaylistReturn = {
  playlists: IPlaylist[]
  isLoading: boolean
  isError: string
}

// call api 'me'
export const useMe = (): useMeReturn => {
  const { data, error, isValidating } = useSWR(API_GET_USER, fetcher)
  return {
    user: data,
    isLoading: isValidating,
    isError: error,
  }
}

// call api 'playlist'
export const usePlaylist = (): usePlaylistReturn => {
  const { data, error, isValidating } = useSWR(API_GET_PLAYLISTS, fetcher)
  return {
    playlists: data || [],
    isLoading: isValidating,
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
