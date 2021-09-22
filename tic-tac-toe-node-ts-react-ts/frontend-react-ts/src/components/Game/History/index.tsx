import React from 'react'
import { useSelector } from 'react-redux'
import { getLabel } from '../../../services/gameService'
import { selectors } from '../../../store/game'
import { doHistoryBack } from '../../../store/game/actions'

import './index.css'

export const History: React.FC = () => {
  const match = useSelector(selectors.getMatch)

  return (
    <div className="history">
      <h4>Histórico</h4>
      {Array.from(match.history).map((hist) => (
        <button
          type="button"
          className="move"
          key={`${hist.row}-${hist.col}`}
          onClick={() => doHistoryBack(hist)}
        >
          <strong>Jogador: {getLabel(hist.value)}</strong>
          <br />
          Linha: {hist.row} Coluna: {hist.col}
        </button>
      ))}
    </div>
  )
}
