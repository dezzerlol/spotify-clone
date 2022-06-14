import fetcher from './fetcher'

// send signin request to nextjs api with email and password
export const auth = (mode: 'signin' | 'signup', body: { email: string; password: string; username: string }) => {
  return fetcher(`/user/${mode}`, body)
}

// logout
export const logout = () => {
  return fetcher('/user/logout')
}

export const createNewPlaylist = () => {
  return fetcher('/playlists/createPlaylist')
}

export const removePlaylist = (body: { playlistId: number }) => {
  return fetcher('/playlists/removePlaylist', body)
}

export const renamePlaylist = (body: { id: number; newName: string }) => {
  return fetcher('/playlists/renamePlaylist', body)
}

export const changeUsername = (body: { newUsername: string }) => {
  return fetcher('/user/changeUsername', body)
}

export const addToPlaylist = (body: { playlistId: number; songId: number }) => {
  return fetcher('/playlists/addSong', body)
}

// del song from playlist
export const removeFromPlaylist = (body: { playlistId: number; songId: number }) => {
  return fetcher('/playlists/removeSong', body)
}
