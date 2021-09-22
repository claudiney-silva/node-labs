import React, { useState, useEffect } from 'react'

import {
  getLabel,
  getLevelLabel,
  getModeLabel,
  getWinnerLabel,
  Match,
} from '../services/gameService'
import * as gameApi from '../api/gameApi'

import { Loading } from '../components/Loading'

import './List.css'

export const List: React.FC = () => {
  const [matches, setMatches] = useState([] as Match[])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    gameApi.findAllMatches().then((res: Match[]) => {
      setMatches(res)
      setLoading(false)
    })
  }, [])

  return (
    <div className="List">
      <h1>Jogos no Banco de Dados</h1>
      <p>
        Esta é apenas uma página para testes da API, sem qualquer melhoria de
        interface.
      </p>

      <Loading loading={loading} />

      {!loading && (
        <ul>
          {matches.map((match) => (
            <li key={match.id}>
              ID: <strong>{match.id}</strong>, Modo:{' '}
              <strong>{getModeLabel(match.mode)}</strong>, Nível:{' '}
              <strong>{getLevelLabel(match.level)}</strong>
              {match.winner !== undefined && (
                <strong>, Vencedor: {getWinnerLabel(match.winner)}</strong>
              )}
              <ul className="moves">
                {match.history.map((hist) => (
                  <li key={hist.id}>
                    {getLabel(hist.value)} (Linha: {hist.row} - Coluna:{' '}
                    {hist.col})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
