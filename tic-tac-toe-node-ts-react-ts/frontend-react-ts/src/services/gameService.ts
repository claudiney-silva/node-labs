export interface Match {
  id?: string
  player: Player
  mode: Mode
  level: Level
  winner?: Player
  history: Position[]
}

export interface Position {
  id?: string
  row: number
  col: number
  value: number
}

export enum Mode {
  HUMAN_VS_HUMAN = 0,
  HUMAN_VS_COMPUTER = 1,
  COMPUTER_VS_HUMAN = 2,
  COMPUTER_VS_COMPUTER = 3,
}

export enum Player {
  PLAYER_X = 1,
  PLAYER_O = -1,
  TIED = 0,
  NONE = -2,
}

export enum Level {
  EASY = 0,
  MEDIUM = 1,
  HARD = 2,
}

export const getInitialState = () => {
  // preenche o array de posições sem encadeamento de FOR
  return Array(9)
    .fill(0)
    .map((value, index) => {
      // determina a linha, retornando 0 | 1 | 2
      const row = Math.floor(index / 3)

      // determinha a coluna, retornando (0 | 0.3333 | 0.6666) * 3
      const col = Math.round((index / 3 - row) * 3)
      return { row, col, value }
    })
}

export const getLabel = (value: number) => {
  const player = []
  player[Player.PLAYER_X] = 'X'
  player[Player.PLAYER_O] = 'O'
  return player[value]
}

export const getWinnerLabel = (value: number) => {
  const player = []
  player[Player.NONE] = 'Nenhum'
  player[Player.TIED] = 'Empate'
  player[Player.PLAYER_X] = 'X'
  player[Player.PLAYER_O] = 'O'
  return player[value] ? player[value] : player[Player.NONE]
}

export const getLevelLabel = (value: number) => {
  const level = []
  level[Level.EASY] = 'FÁCIL'
  level[Level.MEDIUM] = 'MÉDIO'
  level[Level.HARD] = 'DIFÍCIL'
  return level[value]
}

export const getModeLabel = (value: number) => {
  const mode = []
  mode[Mode.HUMAN_VS_HUMAN] = 'Humano (X) vs Humano (O)'
  mode[Mode.HUMAN_VS_COMPUTER] = 'Humano (X) vs Computador (O)'
  mode[Mode.COMPUTER_VS_HUMAN] = 'Computador (X) vs Humano (O)'
  mode[Mode.COMPUTER_VS_COMPUTER] = 'Computador (X) vs Computador (O)'
  return mode[value]
}

export const isTied = (positions: Position[]): boolean => {
  for (let i = 0; i < 3; i += 1) {
    const row = positions.filter(
      (position) => position.row === i && position.value !== 0
    )

    // '< 3' se ainda há espaços para preencher
    // 'filter' se o tamanho do array 'mudar' ou 'zerar' é porque está
    // com valores iguais e ainda há chance de ganhar
    const rowUnique = row.filter((position) => position.value === 1)

    if (
      row.length < 3 &&
      (row.length === rowUnique.length || rowUnique.length === 0)
    ) {
      return false
    }

    const col = positions.filter(
      (position) => position.col === i && position.value !== 0
    )

    // '< 3' se ainda há espaços para preencher
    // 'filter' se o tamanho do array 'mudar' ou 'zerar' é porque está
    // com valores iguais e ainda há chance de ganhar
    const colUnique = col.filter((position) => position.value === 1)

    if (
      col.length < 3 &&
      (col.length === colUnique.length || colUnique.length === 0)
    ) {
      return false
    }
  }

  // calculo da diagonal 1
  const diagonal1 = positions.filter(
    (position) => position.row === position.col && position.value !== 0
  )
  const diagonal1Unique = diagonal1.filter((position) => position.value === 1)

  // '< 3' se ainda há espaços para preencher
  // 'filter' se o tamanho do array 'mudar' ou 'zerar' é porque está
  // com valores iguais e ainda há chance de ganhar
  if (
    diagonal1.length < 3 &&
    (diagonal1.length === diagonal1Unique.length ||
      diagonal1Unique.length === 0)
  ) {
    return false
  }

  // calculo da diagonal 2
  const diagonal2 = positions.filter(
    (position) =>
      ((position.row === 0 && position.col === 2) ||
        (position.row === 1 && position.col === 1) ||
        (position.row === 2 && position.col === 0)) &&
      position.value !== 0
  )

  const diagonal2Unique = diagonal2.filter((position) => position.value === 1)

  // '< 3' se ainda há espaços para preencher
  // 'filter' se o tamanho do array 'mudar' ou 'zerar' é porque está
  // com valores iguais e ainda há chance de ganhar
  if (
    diagonal2.length < 3 &&
    (diagonal2.length === diagonal2Unique.length ||
      diagonal2Unique.length === 0)
  ) {
    return false
  }

  return true
}

export const getPlayerWinner = (positions: Position[]): number => {
  for (let i = 0; i < 3; i += 1) {
    // filtra usando o 'i', mapeia somente valores e soma. Se o resultado for 3 ou -3 há um ganhador
    const row = positions
      .filter((position) => position.row === i)
      .map((a) => a.value)
      .reduce((a, b) => a + b)

    if (row === 3) return Player.PLAYER_X
    if (row === -3) return Player.PLAYER_O

    // filtra usando o 'i', mapeia somente valores e soma. Se o resultado for 3 ou -3 há um ganhador
    const col = positions
      .filter((position) => position.col === i)
      .map((a) => a.value)
      .reduce((a, b) => a + b)

    if (col === 3) return Player.PLAYER_X
    if (col === -3) return Player.PLAYER_O
  }

  // calculo da diagonal 1
  const diagonal1 = positions
    .filter((position) => position.row === position.col)
    .map((a) => a.value)
    .reduce((a, b) => a + b)

  if (diagonal1 === 3) return Player.PLAYER_X
  if (diagonal1 === -3) return Player.PLAYER_O

  // calculo da diagonal 2
  const diagonal2 = positions
    .filter(
      (position) =>
        (position.row === 0 && position.col === 2) ||
        (position.row === 1 && position.col === 1) ||
        (position.row === 2 && position.col === 0)
    )
    .map((a) => a.value)
    .reduce((a, b) => a + b)

  if (diagonal2 === 3) return Player.PLAYER_X
  if (diagonal2 === -3) return Player.PLAYER_O

  // calcula se houve empate
  if (isTied(positions)) return Player.TIED

  return Player.NONE
}

// Nível fácil joga aleatóriamente
const processMoveLevelEasy = (
  player: Player,
  positions: Position[]
): Position => {
  let position
  do {
    position = positions[Math.floor(Math.random() * (positions.length - 0))]
  } while (position.value !== 0)

  return position
}

// Nível médio tenta evitar do adversário ganhar
const processMoveLevelMedium = (
  player: Player,
  positions: Position[]
): Position => {
  for (let i = 0; i < 3; i += 1) {
    // verifica por linha
    const row = positions.filter(
      (position) => position.row === i && position.value !== player
    )
    const rowCount = row
      .map((pos) => pos.value)
      .reduce((count, value) => (value === player * -1 ? count + 1 : count))
    if (row.length === 3 && rowCount === 2) {
      return row.filter((position) => position.value === 0)[0]
    }

    // verifica por coluna
    const col = positions.filter(
      (position) => position.col === i && position.value !== player
    )
    const colCount = col
      .map((pos) => pos.value)
      .reduce((count, value) => (value === player * -1 ? count + 1 : count))
    if (col.length === 3 && colCount === 2) {
      return col.filter((position) => position.value === 0)[0]
    }
  }

  // calculo da diagonal 1
  const diagonal1 = positions.filter(
    (position) => position.row === position.col && position.value !== player
  )
  const diagonal1Count = diagonal1
    .map((pos) => pos.value)
    .reduce((count, value) => (value === player * -1 ? count + 1 : count))
  if (diagonal1.length === 3 && diagonal1Count === 2) {
    return diagonal1.filter((position) => position.value === 0)[0]
  }

  // calculo da diagonal 2
  const diagonal2 = positions.filter(
    (position) =>
      ((position.row === 0 && position.col === 2) ||
        (position.row === 1 && position.col === 1) ||
        (position.row === 2 && position.col === 0)) &&
      position.value !== player
  )
  const diagonal2Count = diagonal2
    .map((pos) => pos.value)
    .reduce((count, value) => (value === player * -1 ? count + 1 : count))
  if (diagonal2.length === 3 && diagonal2Count === 2) {
    return diagonal2.filter((position) => position.value === 0)[0]
  }

  // se não achar nenhum, usa o nível médio
  return processMoveLevelEasy(player, positions)
}

// Nível hard tenta ganhar, se não for possível pula para o médio
const processMoveLevelHard = (
  player: Player,
  positions: Position[]
): Position => {
  for (let i = 0; i < 3; i += 1) {
    // verifica por linha
    const row = positions.filter(
      (position) => position.row === i && position.value !== player * -1
    )
    const rowCount = row
      .map((pos) => pos.value)
      .reduce((count, value) => (value === player ? count + 1 : count))
    if (row.length === 3 && rowCount === 2) {
      return row.filter((position) => position.value === 0)[0]
    }

    // verifica por coluna
    const col = positions.filter(
      (position) => position.col === i && position.value !== player * -1
    )
    const colCount = col
      .map((pos) => pos.value)
      .reduce((count, value) => (value === player ? count + 1 : count))
    if (col.length === 3 && colCount === 2) {
      return col.filter((position) => position.value === 0)[0]
    }
  }

  // calculo da diagonal 1
  const diagonal1 = positions.filter(
    (position) =>
      position.row === position.col && position.value !== player * -1
  )
  const diagonal1Count = diagonal1
    .map((pos) => pos.value)
    .reduce((count, value) => (value === player ? count + 1 : count))
  if (diagonal1.length === 3 && diagonal1Count === 2) {
    return diagonal1.filter((position) => position.value === 0)[0]
  }

  // calculo da diagonal 2
  const diagonal2 = positions.filter(
    (position) =>
      ((position.row === 0 && position.col === 2) ||
        (position.row === 1 && position.col === 1) ||
        (position.row === 2 && position.col === 0)) &&
      position.value !== player * -1
  )
  const diagonal2Count = diagonal2
    .map((pos) => pos.value)
    .reduce((count, value) => (value === player ? count + 1 : count))
  if (diagonal2.length === 3 && diagonal2Count === 2) {
    return diagonal2.filter((position) => position.value === 0)[0]
  }

  // se não achar nenhum, usa o nível médio
  return processMoveLevelMedium(player, positions)
}

export const processMove = (
  player: Player,
  mode: Mode,
  level: Level,
  positions: Position[]
): Position => {
  let position: Position = { row: -1, col: -1, value: 0 }

  const levelFunctions = []
  levelFunctions[Level.EASY] = processMoveLevelEasy
  levelFunctions[Level.MEDIUM] = processMoveLevelMedium
  levelFunctions[Level.HARD] = processMoveLevelHard

  switch (true) {
    case mode === Mode.HUMAN_VS_COMPUTER && player === Player.PLAYER_O:
      position = levelFunctions[level](player, positions)
      break

    case mode === Mode.COMPUTER_VS_HUMAN && player === Player.PLAYER_X:
      position = levelFunctions[level](player, positions)
      break

    case mode === Mode.COMPUTER_VS_COMPUTER:
      position = levelFunctions[level](player, positions)
      break

    default:
      break
  }

  return position
}
