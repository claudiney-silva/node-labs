import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectors } from '../../../store/game'

import {
  Player,
  getLabel,
  Level,
  Mode,
  getModeLabel,
} from '../../../services/gameService'
import { Button } from '../Button'
import './index.css'
import { doCancel, doGameApply, doGameNew } from '../../../store/game/actions'
import { Loading } from '../../Loading'

export const Menu: React.FC = () => {
  const match = useSelector(selectors.getMatch)
  const loading = useSelector(selectors.isLoading)

  const [menuMode, setMenuMode] = useState(match.mode)
  const [menuLevel, setMenuLevel] = useState(match.level)

  return (
    <div className="overlay">
      <div className="menu">
        {match.winner !== Player.NONE && match.winner === Player.TIED && (
          <span>
            <h3>Empatou!</h3>
          </span>
        )}
        {match.winner !== Player.NONE && match.winner !== Player.TIED && (
          <span>
            <h3>Vencedor: {match.winner && getLabel(match.winner)}</h3>
          </span>
        )}

        <h5>Configurações do Jogo</h5>

        <div className={`group ${loading ? 'loading' : ''}`}>
          <div className="group-title">Modo de Jogo:</div>
          <div className="group-options">
            <Button
              active={menuMode === Mode.HUMAN_VS_HUMAN}
              label={getModeLabel(Mode.HUMAN_VS_HUMAN)}
              click={() => {
                setMenuMode(Mode.HUMAN_VS_HUMAN)
              }}
            />
            <Button
              active={menuMode === Mode.HUMAN_VS_COMPUTER}
              label={getModeLabel(Mode.HUMAN_VS_COMPUTER)}
              click={() => {
                setMenuMode(Mode.HUMAN_VS_COMPUTER)
              }}
            />
            <Button
              active={menuMode === Mode.COMPUTER_VS_HUMAN}
              label={getModeLabel(Mode.COMPUTER_VS_HUMAN)}
              click={() => {
                setMenuMode(Mode.COMPUTER_VS_HUMAN)
              }}
            />
            <Button
              active={menuMode === Mode.COMPUTER_VS_COMPUTER}
              label={getModeLabel(Mode.COMPUTER_VS_COMPUTER)}
              click={() => {
                setMenuMode(Mode.COMPUTER_VS_COMPUTER)
              }}
            />
          </div>
        </div>

        {menuMode !== Mode.HUMAN_VS_HUMAN && (
          <div className={`group ${loading ? 'loading' : ''}`}>
            <div className="group-title">Nível de Dificuldade:</div>
            <div className="group-options">
              <Button
                active={menuLevel === Level.EASY}
                label="Fácil"
                click={() => {
                  setMenuLevel(Level.EASY)
                }}
              />
              <Button
                active={menuLevel === Level.MEDIUM}
                label="Médio"
                click={() => {
                  setMenuLevel(Level.MEDIUM)
                }}
              />
              <Button
                active={menuLevel === Level.HARD}
                label="Difícil"
                click={() => {
                  setMenuLevel(Level.HARD)
                }}
              />
            </div>
          </div>
        )}

        <Loading loading={loading} />

        <div className={`group ${loading ? 'loading' : ''}`}>
          <div className="group-options">
            {match.id && !match.winner && (
              <button
                type="button"
                className="menu-button"
                onClick={() => doGameApply(menuMode, menuLevel)}
              >
                APLICAR JOGO ATUAL
              </button>
            )}

            <button
              type="button"
              className="menu-button"
              onClick={() => doGameNew(menuMode, menuLevel)}
            >
              NOVO JOGO
            </button>

            {match.id && !match.winner && (
              <button
                type="button"
                className="menu-button"
                onClick={() => doCancel()}
              >
                CANCELAR
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
