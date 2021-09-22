import { combineReducers, createStore } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import { GameReducer } from './store/index'

/* Create root reducer, containing all features of the application */
const rootReducer = combineReducers({
  game: GameReducer,
})

const store = createStore(
  rootReducer,
  /* preloadedState, */ devToolsEnhancer({})
)

export default store
