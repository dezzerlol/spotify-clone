import { Artist } from './artist'

export type Song = {
  artist: Artist
  artistId: number
  createdAt: Date
  updatedAt: Date
  duration: number
  id: number
  name: string
  photo: string
  url: string
}
