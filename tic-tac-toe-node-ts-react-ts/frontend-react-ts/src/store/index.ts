import { GameState } from './game/types'

export { default as GameReducer } from './game/reducer'

export interface SystemState {
  game: GameState
}
