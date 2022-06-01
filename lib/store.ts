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

  changeActiveSongs: action((state: any, payload: any) => {
    state.activeSongs = payload
  }),

  changeActiveSong: action((state: any, payload: ActiveSongType) => {
    state.activeSong = payload
  }),
})
