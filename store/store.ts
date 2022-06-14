import { composeWithDevTools } from '@redux-devtools/extension'
import { combineReducers, createStore } from 'redux'
import playlistReducer from './Reducer'

const reducers = combineReducers({
  playlistReducer,
})

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25,
})

const store = createStore(reducers, composeEnhancers())

export default store
