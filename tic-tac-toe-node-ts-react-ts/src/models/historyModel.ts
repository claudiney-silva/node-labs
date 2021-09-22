/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { Document, Schema, Model, model } from 'mongoose';

export interface History {
  id?: string;
  row: number;
  col: number;
  value: number;
}

export interface HistoryModelInterface extends Omit<History, 'id'>, Document {}

const schema = new Schema<HistoryModelInterface>(
  {
    row: { type: Number, required: true },
    col: { type: Number, required: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret: HistoryModelInterface): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const HistoryModel: Model<HistoryModelInterface> = model<HistoryModelInterface>('History', schema);
