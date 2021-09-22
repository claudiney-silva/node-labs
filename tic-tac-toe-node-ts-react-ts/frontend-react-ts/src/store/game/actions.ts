import store from '../../store'
import * as gameApi from '../../api/gameApi'

import { actionTypes } from '.'
import {
  getInitialState,
  getPlayerWinner,
  Level,
  Match,
  Mode,
  Player,
  Position,
  processMove,
} from '../../services/gameService'

export const doLoadingOn = () => {
  store.dispatch({
    type: actionTypes.GAME_LOADING_ON,
    payload: {
      loading: true,
    },
  })
}

export const doLoadingOff = () => {
  store.dispatch({
    type: actionTypes.GAME_LOADING_OFF,
    payload: {
      loading: false,
    },
  })
}

export const doMenuOpen = () => {
  store.dispatch({
    type: actionTypes.GAME_MENU,
    payload: {
      menu: true,
    },
  })
}

export const doMove = (pos: Position) => {
  const { match, positions } = store.getState().game

  const position = positions.filter(
    (f: Position) => f.row === pos.row && f.col === pos.col
  )[0]

  // se já foi definido, finaliza a execução
  if (position.value !== 0) {
    return
  }

  if (position.col === -1) {
    return
  }

  position.value = match.player

  // passa a vez para o próximo jogador
  const newPlayer =
    match.player === Player.PLAYER_X ? Player.PLAYER_O : Player.PLAYER_X

  match.history.push(position)

  // atualiza o histórico
  gameApi.updateHistory({ ...match, player: newPlayer }).then((res) => {
    store.dispatch({
      type: actionTypes.GAME_MOVE,
      payload: { positions, match: { ...res } },
    })

    // verifica se houve vencedor
    const newWinner = getPlayerWinner(positions)
    if (newWinner !== Player.NONE) {
      doLoadingOn()

      gameApi.updateMatch({ ...match, winner: newWinner }).then(() => {
        doLoadingOff()
        store.dispatch({
          type: actionTypes.GAME_WINNER,
          payload: { menu: true, match: { ...match, winner: newWinner } },
        })
      })
    } else {
      doProcessMove(newPlayer, match.mode, match.level, positions)
    }
  })
}

const doProcessMove = (
  player: Player,
  mode: Mode,
  level: Level,
  positions: Position[]
) => {
  const nextMove = processMove(player, mode, level, positions)
  if (nextMove.col !== -1) {
    // dá um intervalo para que consigamos ver o movimento do computador
    setTimeout(() => {
      doMove(nextMove)
    }, 500)
  }
}

export const doGameApply = (mode: Mode, level: Level) => {
  const { positions, match } = store.getState().game

  const updatedMatch = {
    ...match,
    level,
    mode,
  }

  doLoadingOn()

  gameApi.updateMatch(updatedMatch).then(() => {
    doLoadingOff()

    store.dispatch({
      type: actionTypes.GAME_APPLY,
      payload: {
        menu: false,
        match: { ...updatedMatch },
      },
    })

    doProcessMove(updatedMatch.player, mode, level, positions)
  })
}

export const doGameNew = (mode: Mode, level: Level) => {
  doLoadingOn()

  const match: Match = {
    player: Player.PLAYER_X,
    level,
    mode,
    history: [],
  }

  gameApi.createNewMatch(match).then((res) => {
    doLoadingOff()
    const positions = getInitialState()

    store.dispatch({
      type: actionTypes.GAME_NEW,
      payload: {
        menu: false,
        match: res,
        positions,
      },
    })

    // const { positions, match } = store.getState().game
    doProcessMove(match.player, mode, level, positions)
  })
}

export const doCancel = () => {
  store.dispatch({
    type: actionTypes.GAME_MENU,
    payload: {
      menu: false,
    },
  })
}

export const doHistoryBack = (position: Position) => {
  const { match } = store.getState().game

  const newHistory = match.history.slice(0, match.history.indexOf(position))
  const newPositions = getInitialState().map((pos) => {
    const existingHistory = newHistory.filter(
      (hist: Position) => hist.row === pos.row && hist.col === pos.col
    )[0]
    if (existingHistory) {
      return existingHistory
    }
    return pos
  })

  // atualiza o histórico
  gameApi
    .updateHistory({ ...match, player: position.value, history: newHistory })
    .then((res) => {
      store.dispatch({
        type: actionTypes.GAME_HISTORY_BACK,
        payload: {
          positions: newPositions,
          match: { ...res },
          // match: { ...match, player: position.value, history: newHistory },
        },
      })

      // const newMatch = store.getState().game.match

      doProcessMove(res.player, res.mode, res.level, newPositions)
    })
}
