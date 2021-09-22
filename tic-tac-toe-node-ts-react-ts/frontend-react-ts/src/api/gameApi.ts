import api from '.'
import { Match } from '../services/gameService'

export const findAllMatches = async (): Promise<Match[]> => {
  const res = await api.get('/matches')
  const matches = res.data as Match[]
  return matches
}

export const createNewMatch = async (match: Match): Promise<Match> => {
  const res = await api.post('/matches', match)
  return res.data as Match
}

export const updateMatch = async (match: Match): Promise<void> => {
  await api.put(`/matches/${match.id}`, { ...match, id: undefined })
}

export const updateHistory = async (match: Match): Promise<Match> => {
  const res = await api.put(`/matches/${match.id}/history`, {
    ...match,
    id: undefined,
  })
  return res.data as Match
}

export default { findAllMatches, createNewMatch, updateHistory }
