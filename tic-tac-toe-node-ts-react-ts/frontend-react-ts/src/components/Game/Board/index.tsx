import React from 'react'
import { useSelector } from 'react-redux'

import { selectors } from '../../../store/game'
import { Element } from '../Element'
import './index.css'

export const Board: React.FC = () => {
  const positions = useSelector(selectors.getPositions)

  return (
    <div className="board">
      {Array.from(positions).map((position) => (
        <Element key={`${position.row}-${position.col}`} position={position} />
      ))}
    </div>
  )
}
