import {
  API_ADD_SONG,
  API_CHANGE_USERNAME,
  API_CREATE_PLAYLIST,
  API_REMOVE_PLAYLIST,
  API_REMOVE_SONG,
  API_RENAME_PLAYLIST,
  API_SEARCH,
  API_USER_LOGOUT,
} from './apiConsts'
import fetcher from '../lib/fetcher'

// send signin request to nextjs api with email and password
export const auth = (mode: 'signin' | 'signup', body: { email: string; password: string; username: string }) => {
  return fetcher(`/user/${mode}`, body)
}

export const logout = () => {
  return fetcher(API_USER_LOGOUT)
}

export const createNewPlaylist = () => {
  return fetcher(API_CREATE_PLAYLIST)
}

export const removePlaylist = (body: { playlistId: number }) => {
  return fetcher(API_REMOVE_PLAYLIST, body)
}

export const renamePlaylist = (body: { id: number; newName: string }) => {
  return fetcher(API_RENAME_PLAYLIST, body)
}

export const changeUsername = (body: { newUsername: string }) => {
  return fetcher(API_CHANGE_USERNAME, body)
}

export const addToPlaylist = (body: { playlistId: number; songId: number }) => {
  return fetcher(API_ADD_SONG, body)
}

export const removeFromPlaylist = (body: { playlistId: number; songId: number }) => {
  return fetcher(API_REMOVE_SONG, body)
}

export const searchInDb = (body: { searchValue: string }) => {
  return fetcher(API_SEARCH, body)
}
