import React from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../store/game'

import { Menu } from './Menu'
import { Board } from './Board'
import { History } from './History'
import {
  getLabel,
  getLevelLabel,
  getModeLabel,
} from '../../services/gameService'

import { doMenuOpen } from '../../store/game/actions'

import './index.css'

export const Game: React.FC = () => {
  const menu = useSelector(selectors.isMenu)
  const match = useSelector(selectors.getMatch)

  return (
    <div className="game">
      {match && (
        <div className="game-header">
          <span className="game-option">
            Modo de Jogo: {getModeLabel(match.mode)}
          </span>
          <span className="game-option">
            Vez do Jogador: {getLabel(match.player)}
          </span>
          <span className="game-option">
            Nível do Jogo: {getLevelLabel(match.level)}
          </span>
          <button
            type="button"
            className="game-button"
            onClick={() => doMenuOpen()}
          >
            MENU
          </button>
        </div>
      )}
      {menu && <Menu />}
      <div className="game-wrapper">
        <Board />
        <History />
      </div>
    </div>
  )
}
