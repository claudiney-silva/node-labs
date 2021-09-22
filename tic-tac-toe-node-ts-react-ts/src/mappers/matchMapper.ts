/* eslint-disable no-param-reassign */
import { Level, Match, Mode, Player } from '@src/models/matchModel';

export interface MatchDto {
  id?: string;
  player: Player;
  mode: Mode;
  level: Level;
  winner?: Player;
}

class MatchMapper {
  public toDomainDto(dto: MatchDto): Match {
    const domain: Match = {
      id: dto.id,
      player: Object.values(Player).includes(dto.player as Player) ? dto.player : Player.PLAYER_X,
      mode: Object.values(Mode).includes(dto.mode as Mode) ? dto.mode : Mode.HUMAN_VS_COMPUTER,
      level: Object.values(Level).includes(dto.level as Level) ? dto.level : Level.EASY,
      winner: Object.values(Player).includes(dto.winner as Player) ? dto.winner : undefined,
      history: [],
    };
    return domain;
  }

  public extractDtoToDomain(match: Match, dto: MatchDto): Match {
    match.player = Object.values(Player).includes(dto.player as Player) ? dto.player : Player.PLAYER_X;
    match.mode = Object.values(Mode).includes(dto.mode as Mode) ? dto.mode : Mode.HUMAN_VS_COMPUTER;
    match.level = Object.values(Level).includes(dto.level as Level) ? dto.level : Level.EASY;
    match.winner = Object.values(Player).includes(dto.winner as Player) ? dto.winner : undefined;
    return match;
  }
}

// MAPPER - SINGLETON
export const matchMapper = new MatchMapper();
