import { Level, Match, MatchModel, Mode, Player } from '@src/models/matchModel';
import { ApiError, errors } from '@src/services/APIError';
import { matchService } from '@src/services/matchService';
import { History } from '@src/models/historyModel';

describe('[Match] Testes Funcionais', () => {
  beforeEach(async () => {
    await MatchModel.deleteMany({});
  });
  describe('Criando um novo Match', () => {
    it('Deve criar com sucesso um novo Match com id', async () => {
      const match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
      };
      const response = await global.testRequest.post('/api/matches').send(match);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: expect.any(String),
      });
    });
    it('Deve retornar erro 422 ao passar o winner como parâmetro', async () => {
      const match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        winner: Player.PLAYER_X, // não permitido criar um match com winner definido
      };
      const response = await global.testRequest.post('/api/matches').send(match);

      expect(response.status).toBe(422);
      expect(response.body).toMatchObject<ApiError>({
        ...errors.Unprocessable,
        data: [{ param: 'winner', message: '"winner" is not allowed' }],
      });
    });
    it('Deve retornar erro 422 ao passar o player fora do range permitido', async () => {
      const match = {
        player: 2, // fora do range permitido
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
      };
      const response = await global.testRequest.post('/api/matches').send(match);

      expect(response.status).toBe(422);
      expect(response.body).toMatchObject<ApiError>({
        ...errors.Unprocessable,
        data: [{ param: 'player', message: '"player" must be less than or equal to 1' }],
      });
    });
    it('Deve retornar erro 422 ao passar o mode fora do range permitido', async () => {
      const match = {
        player: Player.PLAYER_X,
        mode: 4, // fora do range permitido
        level: Level.EASY,
      };
      const response = await global.testRequest.post('/api/matches').send(match);

      expect(response.status).toBe(422);
      expect(response.body).toMatchObject<ApiError>({
        ...errors.Unprocessable,
        data: [{ param: 'mode', message: '"mode" must be less than or equal to 3' }],
      });
    });
    it('Deve retornar erro 422 ao passar o level fora do range permitido', async () => {
      const match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: 3, // fora do range permitido
      };
      const response = await global.testRequest.post('/api/matches').send(match);

      expect(response.status).toBe(422);
      expect(response.body).toMatchObject<ApiError>({
        ...errors.Unprocessable,
        data: [{ param: 'level', message: '"level" must be less than or equal to 2' }],
      });
    });
  });

  describe('Recuperando um match', () => {
    it('Deve retornar com sucesso Match a partir do id', async () => {
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };
      const model = await matchService.create(match);

      const response = await global.testRequest.get(`/api/matches/${model.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: model.id,
        ...match,
      });
    });
    it('Deve retornar erro 404 ao buscar a partir do id', async () => {
      const id = '60af039c856c6d23b4a584bf';

      const response = await global.testRequest.get(`/api/matches/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    });
    it('Deve retornar erro 500 ao buscar a partir de um id fora do padrão', async () => {
      const id = 'fake-id';

      const response = await global.testRequest.get(`/api/matches/${id}`);

      expect(response.status).toBe(500);
      expect(response.body).toMatchObject({
        ...errors.Internal,
        message: `Cast to ObjectId failed for value "${id}" (type string) at path "_id" for model "Match"`,
      });
    });
  });

  describe('Apagando um match', () => {
    it('Deve apagar com sucesso Match a partir do id', async () => {
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };
      const model = await matchService.create(match);

      const response = await global.testRequest.delete(`/api/matches/${model.id}`);
      expect(response.status).toBe(200);
    });
    it('Deve retornar erro 404 ao apagar a partir do id', async () => {
      const id = '60af039c856c6d23b4a584bf';

      const response = await global.testRequest.delete(`/api/matches/${id}`);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    });
    it('Deve apagar com sucesso todos os matches', async () => {
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };
      await matchService.create(match);

      const response = await global.testRequest.delete(`/api/matches`);
      expect(response.status).toBe(200);
    });
  });
  describe('Atualizando um match', () => {
    it('Deve atualizar com sucesso o Match a partir do id', async () => {
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };
      const model = await matchService.create(match);

      match.winner = Player.PLAYER_O;

      const response = await global.testRequest.put(`/api/matches/${model.id}`).send(match);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: model.id,
        ...match,
      });
    });
    it('Deve retornar erro 404 ao atualizar a partir do id', async () => {
      const id = '60af039c856c6d23b4a584bf';
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };

      const response = await global.testRequest.delete(`/api/matches/${id}`).send(match);

      expect(response.status).toBe(404);
      expect(response.body).toMatchObject({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    });
  });
  describe('Atualizando o histórico de um Match', () => {
    it('Deve inserir com sucesso o histórico do Match a partir do id', async () => {
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };
      const model = await matchService.create(match);

      const history: History[] = [
        { row: 0, col: 0, value: Player.PLAYER_X },
        { row: 0, col: 0, value: Player.PLAYER_X },
        { row: 0, col: 0, value: Player.PLAYER_X },
        { row: 0, col: 0, value: Player.PLAYER_X },
      ];
      match.history = history;

      const response = await global.testRequest.put(`/api/matches/${model.id}/history`).send(match);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: model.id,
        ...match,
      });
    });
    it('Deve reduzir com sucesso o histórico do Match a partir do id', async () => {
      const match: Match = {
        player: Player.PLAYER_X,
        mode: Mode.HUMAN_VS_COMPUTER,
        level: Level.EASY,
        history: [],
      };
      const model = await matchService.create(match);

      const history: History[] = [
        { row: 0, col: 0, value: Player.PLAYER_X },
        { row: 0, col: 1, value: Player.PLAYER_O },
        { row: 1, col: 1, value: Player.PLAYER_X },
        { row: 1, col: 1, value: Player.PLAYER_O },
      ];

      match.history = history;
      const response1 = await global.testRequest.put(`/api/matches/${model.id}/history`).send(match);

      expect(response1.status).toBe(200);
      expect(response1.body).toMatchObject({
        id: model.id,
        ...match,
      });
      expect(response1.body.history).toHaveLength(4);

      match.history = history.slice(2);
      const response2 = await global.testRequest.put(`/api/matches/${model.id}/history`).send(match);

      expect(response2.status).toBe(200);
      expect(response2.body).toMatchObject({
        id: model.id,
        ...match,
      });
      expect(response2.body.history).toHaveLength(2);
    });
  });
});
