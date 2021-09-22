import {
  getInitialState,
  Level,
  Mode,
  Player,
} from '../../services/gameService'
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
import { GameState, GameActionTypes } from './types'

const initialState: GameState = {
  loading: false,
  menu: true,
  match: {
    player: Player.NONE,
    level: Level.EASY,
    mode: Mode.HUMAN_VS_COMPUTER,
    winner: Player.NONE,
    history: [],
  },
  positions: getInitialState(),
  helperText: '',
  isError: false,
}

export default (state = initialState, action: GameActionTypes) => {
  switch (action.type) {
    case GAME_LOADING_ON:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    case GAME_LOADING_OFF:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    case GAME_MENU:
      return {
        ...state,
        menu: action.payload.menu,
        helperText: '',
        isError: false,
      }

    case GAME_NEW:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    case GAME_APPLY:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    case GAME_MOVE:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    case GAME_WINNER:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    case GAME_HISTORY_BACK:
      return {
        ...state,
        ...action.payload,
        helperText: '',
        isError: false,
      }

    default:
      return state
  }
}
