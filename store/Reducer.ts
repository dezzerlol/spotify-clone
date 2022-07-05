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

const initialState = {
  activeSongs: [],
  activeSong: null as ActiveSongType,
  user: {},
  sidebarPlaylists: [{}],
  playlist: [{}],
  searchValues: [],
}

const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_ACTIVE_SONGS': {
      return {
        ...state,
        activeSongs: action.payload,
      }
    }
    case 'CHANGE_ACTIVE_SONG': {
      return {
        ...state,
        activeSong: action.payload,
      }
    }

    case 'SET_USER': {
      return {
        ...state,
        user: action.payload,
      }
    }

    case 'SET_SIDEBAR_PLAYLISTS': {
      return {
        ...state,
        sidebarPlaylists: action.payload,
      }
    }

    case 'SET_PLAYLIST': {
      return {
        ...state,
        playlist: action.payload,
      }
    }

    case 'SET_SEARCH_VALUES': {
      return {
        ...state,
        searchValues: action.payload,
      }
    }

    default: {
      return state
    }
  }
}

export const changeActiveSongs = (songs) => {
  return {
    type: 'CHANGE_ACTIVE_SONGS',
    payload: songs,
  }
}

export const changeActiveSong = (song) => {
  return {
    type: 'CHANGE_ACTIVE_SONG',
    payload: song,
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export const setSidebarPlaylists = (playlists) => {
  return {
    type: 'SET_SIDEBAR_PLAYLISTS',
    payload: playlists,
  }
}

export const setPlaylist = (playlist) => {
  return {
    type: 'SET_PLAYLIST',
    payload: playlist,
  }
}

export const setSearchValues = (values) => {
  return {
    type: 'SET_SEARCH_VALUES',
    payload: values,
  }
}

export default playlistReducer
