import { Level, Mode, Player } from '@src/models/matchModel';
import { errors } from '@src/services/APIError';
import { matchCreateSchema } from '@src/validations/matchSchemas';
import { validateMiddleware } from '../validate';

const fakeMatch = {
  player: Player.PLAYER_X,
  mode: Mode.HUMAN_VS_COMPUTER,
  level: Level.EASY,
};

const reqFake = {
  headers: {},
  body: { ...fakeMatch },
};

const nextFake = jest.fn();

describe('Validate Middleware', () => {
  it('Validação com sucesso. Deve chamar next() sem parâmetros', async () => {
    validateMiddleware(matchCreateSchema)(reqFake, {}, nextFake);
    expect(nextFake).toHaveBeenCalledWith();
  });

  it(`Erro de Validação. Deve chamar next() com erro`, async () => {
    const reqFakeError = {
      headers: {},
      body: { player: Player.PLAYER_X }, // faltando vários parâmetros
    };

    validateMiddleware(matchCreateSchema)(reqFakeError, {}, nextFake);
    expect(nextFake).toHaveBeenCalledWith(expect.objectContaining({ ...errors.Unprocessable }));
  });
});
