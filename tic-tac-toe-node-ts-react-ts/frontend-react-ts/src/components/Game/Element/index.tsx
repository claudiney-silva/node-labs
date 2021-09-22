import React from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../../store/game'

import { Position, getLabel, Mode, Player } from '../../../services/gameService'
import { doMove } from '../../../store/game/actions'
import './index.css'

interface Props {
  position: Position
}

export const Element: React.FC<Props> = ({ position }: Props) => {
  const match = useSelector(selectors.getMatch)

  const isEnabled = () => {
    if (match.mode === Mode.COMPUTER_VS_COMPUTER) return false

    if (
      match.mode === Mode.HUMAN_VS_COMPUTER &&
      match.player === Player.PLAYER_O
    )
      return false

    if (
      match.mode === Mode.COMPUTER_VS_HUMAN &&
      match.player === Player.PLAYER_X
    )
      return false

    return true
  }

  return (
    <button
      type="button"
      className={`element ${isEnabled() ? '' : 'disabled'}`}
      onClick={() => doMove(position)}
    >
      {getLabel(position.value)}
    </button>
  )
}
