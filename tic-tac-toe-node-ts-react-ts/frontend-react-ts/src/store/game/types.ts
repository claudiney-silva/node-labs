import { Position, Match } from '../../services/gameService'
import {
  GAME_NEW,
  GAME_MOVE,
  GAME_WINNER,
  GAME_HISTORY_BACK,
  GAME_MENU,
  GAME_APPLY,
  GAME_LOADING_ON,
  GAME_LOADING_OFF,
} from './actionTypes'

export type GameState = {
  loading: boolean
  menu: boolean
  positions: Position[]
  match: Match
  helperText: ''
  isError: false
}

export type GameActionTypes =
  | {
      type: typeof GAME_LOADING_ON
      payload: { loading: boolean }
    }
  | {
      type: typeof GAME_LOADING_OFF
      payload: { loading: boolean }
    }
  | {
      type: typeof GAME_NEW
      payload: { menu: boolean; match: Match; positions: Position[] }
    }
  | {
      type: typeof GAME_APPLY
      payload: { menu: boolean; match: Match }
    }
  | {
      type: typeof GAME_MOVE
      payload: {
        positions: Position[]
        match: Match
      }
    }
  | {
      type: typeof GAME_WINNER
      payload: { menu: boolean; match: Match }
    }
  | {
      type: typeof GAME_HISTORY_BACK
      payload: {
        positions: Position[]
        match: Match
      }
    }
  | {
      type: typeof GAME_MENU
      payload: { menu: boolean }
    }
  | { type: 'setIsError'; payload: boolean }
