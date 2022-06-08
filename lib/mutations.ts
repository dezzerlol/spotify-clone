import fetcher from './fetcher'

// send signin request to nextjs api with email and password
export const auth = (mode: 'signin' | 'signup', body: { email: string; password: string; username: string }) => {
  return fetcher(`/${mode}`, body)
}

// logout
export const logout = () => {
  return fetcher('/logout')
}

export const createNewPlaylist = () => {
  return fetcher('/createPlaylist')
}

export const renamePlaylist = (body: { id: number; newName: string }) => {
  return fetcher('/renamePlaylist', body)
}

