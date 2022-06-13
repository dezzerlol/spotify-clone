import { createStore, action } from 'easy-peasy'

interface ActiveSongType {
  artist: {
    id: number
    name: string
  }
  artistId: number
  duration: number
  name: string
  url: string
  createdAt: object
  updatedAt: object
}

export const store = createStore({
  activeSongs: [],
  activeSong: null as ActiveSongType,
  user: {},
  sidebarPlaylists: [{}],
  playlist: [{}],

  changeActiveSongs: action((state: any, payload: any) => {
    state.activeSongs = payload
  }),

  changeActiveSong: action((state: any, payload: ActiveSongType) => {
    state.activeSong = payload
  }),

  setUser: action((state: any, payload: any) => {
    state.user = payload
  }),

  setSidebarPlaylists: action((state: any, payload: any) => {
    state.sidebarPlaylists = payload
  }),

  setPlaylist: action((state: any, payload: any) => {
    state.playlist = payload
  }),
})
