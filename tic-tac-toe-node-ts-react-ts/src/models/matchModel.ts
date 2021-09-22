/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Document, Schema, Model, model } from 'mongoose';
import { History } from './historyModel';

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

export interface Match {
  id?: string;
  player: Player;
  mode: Mode;
  level: Level;
  winner?: Player;
  history: History[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MatchModelInterface extends Omit<Match, 'id'>, Document {}

const schema = new Schema<MatchModelInterface>(
  {
    player: { type: Number, required: true },
    mode: { type: Number, required: true },
    level: { type: Number, required: true },
    winner: { type: Number },
    history: [
      {
        ref: 'History',
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: MatchModelInterface): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
  }
);

export const MatchModel: Model<MatchModelInterface> = model<MatchModelInterface>('Match', schema);
