import { SystemState } from '../index'

export const isLoading = (state: SystemState) => state.game.loading
export const isMenu = (state: SystemState) => state.game.menu
export const getPositions = (state: SystemState) => state.game.positions
export const getMatch = (state: SystemState) => state.game.match
