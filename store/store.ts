import { combineReducers, createStore } from 'redux'
import playlistReducer from './Reducer'

const reducers = combineReducers({
  playlistReducer,
})

const store = createStore(reducers)

export default store
