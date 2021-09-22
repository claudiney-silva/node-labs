import Joi from 'joi';

const player = Joi.number().required().min(-2).max(1);
const level = Joi.number().required().min(0).max(2);
const mode = Joi.number().required().min(0).max(3);
const winner = Joi.number().min(-1).max(1);
const history = Joi.array();

// SCHEMAS
export const matchCreateSchema = Joi.object({
  player,
  level,
  mode,
  history,
});

export const matchUpdateSchema = Joi.object({
  player,
  level,
  mode,
  winner,
  history,
});
