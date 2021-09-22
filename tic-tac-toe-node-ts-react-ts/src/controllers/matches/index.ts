import { Controller, Middleware, Wrapper, Post, Get, Put, Delete } from '@overnightjs/core';
import { Response, Request } from 'express';
import { validateMiddleware } from '@src/middlewares/validate';
import { asyncHandler } from '@src/util/asyncHandler';
import { History } from '@src/models/historyModel';
import { matchCreateSchema, matchUpdateSchema } from '@src/validations/matchSchemas';
import { matchMapper, MatchDto } from '@src/mappers/matchMapper';
import { matchService } from '@src/services/matchService';
import APIError, { errors } from '@src/services/APIError';

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: Gerenciamento das Partidas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MatchSchema:
 *       type: object
 *       properties:
 *         id:
 *           $ref: '#/definitions/field-id'
 *         player:
 *           type: number
 *           required: true
 *           description: Jogador que está na vez (X===1, O===-1)
 *           example: 1
 *           enum: [1, -1]
 *         mode:
 *           type: number
 *           required: true
 *           description: Modo de Jogo, por exemplo Humano (X) vs Humano (O) === 0, Humano (X) vs Computador (O) === 1, Computador (X) vs Humano (O) === 2, Computador (X) vs Computador (O) === 3
 *           example: 1
 *           enum: [0, 3]
 *         level:
 *           type: number
 *           required: true
 *           description: Nível de Inteligência do Computador, por exemplo - Fácil === 0, Médio === 1 ou Difícil === 2
 *           example: 0
 *           enum: [0, 2]
 *         winner:
 *           type: number
 *           required: false
 *           description: Resultado do Jogo, por exemplo - Ninguem === undefined, Empate === 0, X === 1, O === -1
 *           example: 0
 *           enum: [-1, 0, 1]
 *         history:
 *           type: array
 *           required: true
 *           description: Array com todos os movimentos
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 $ref: '#/definitions/field-id'
 *               row:
 *                 type: number
 *                 required: true
 *                 description: Linha onde foi feita a jogada
 *                 example: 0
 *                 enum: [0, 1, 2]
 *               col:
 *                 type: number
 *                 required: true
 *                 description: Coluna onde foi feita a jogada
 *                 example: 0
 *                 enum: [0, 1, 2]
 *               value:
 *                 type: number
 *                 required: true
 *                 description: Jogador que fez a jogada
 *                 example: 0
 *                 enum: [1,-1]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MatchCreateSchema:
 *       type: object
 *       properties:
 *         player:
 *           type: number
 *           required: true
 *           description: Jogador que está na vez (X===1, O===-1)
 *           example: 1
 *           enum: [1, -1]
 *         mode:
 *           type: number
 *           required: true
 *           description: Modo de Jogo, por exemplo Humano (X) vs Humano (O) === 0, Humano (X) vs Computador (O) === 1, Computador (X) vs Humano (O) === 2, Computador (X) vs Computador (O) === 3
 *           example: 1
 *           enum: [0, 3]
 *         level:
 *           type: number
 *           required: true
 *           description: Nível de Inteligência do Computador, por exemplo - Fácil (0), Médio (1) ou Difícil (2)
 *           example: 0
 *           enum: [0, 2]
 *     MatchUpdateSchema:
 *       type: object
 *       properties:
 *         player:
 *           type: number
 *           required: true
 *           description: Jogador que está na vez (X===1, O===-1)
 *           example: 1
 *           enum: [1, -1]
 *         mode:
 *           type: number
 *           required: true
 *           description: Modo de Jogo, por exemplo Humano (X) vs Humano (O) === 0, Humano (X) vs Computador (O) === 1, Computador (X) vs Humano (O) === 2, Computador (X) vs Computador (O) === 3
 *           example: 1
 *           enum: [0, 3]
 *         level:
 *           type: number
 *           required: true
 *           description: Nível de Inteligência do Computador, por exemplo - Fácil (0), Médio (1) ou Difícil (2)
 *           example: 0
 *           enum: [0, 2]
 *         winner:
 *           type: number
 *           required: false
 *           description: Resultado do Jogo, por exemplo - Ninguem === undefined, Empate === 0, X === 1, O === -1
 *           example: 0
 *           enum: [-1, 0, 1]
 */

@Controller('matches')
export class MatchesController {
  /**
   * @swagger
   * /api/matches:
   *   get:
   *     summary: Lista de todos jogos
   *     description: Lista de todos jogos
   *     tags: [Matches]
   *     responses:
   *       200:
   *         description: Lista de todos jogos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/MatchSchema'
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Get('')
  @Wrapper(asyncHandler)
  public async findAll(req: Request, res: Response): Promise<Response> {
    return res.send(await matchService.findAll());
  }

  /**
   * @swagger
   * /api/matches/{id}:
   *   get:
   *     summary: Retorna um jogo pelo ID
   *     tags: [Matches]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: O ID da partida
   *         example: 60d338476eb30c2774133309
   *     responses:
   *       200:
   *         description: A partida
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MatchSchema'
   *       404:
   *         $ref: '#/definitions/error-404'
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Get(':id')
  @Wrapper(asyncHandler)
  public async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const match = await matchService.findById(id);
    if (!match) {
      throw new APIError({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    }
    return res.send(match);
  }

  /**
   * @swagger
   * /api/matches/{id}:
   *   delete:
   *     summary: Remove o jogo pelo ID
   *     description:  Remove o jogo pelo ID
   *     tags: [Matches]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: O ID do jogo
   *         example: 60d338476eb30c2774133309
   *     responses:
   *       200:
   *         description: Jogo removido
   *       404:
   *         $ref: '#/definitions/error-404'
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Delete(':id')
  @Wrapper(asyncHandler)
  public async deleteById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const match = await matchService.findById(id);
    if (!match) {
      throw new APIError({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    }

    await matchService.deleteById(id);
    return res.send();
  }

  /**
   * @swagger
   * /api/matches:
   *   delete:
   *     summary: Apaga definitivamente todos os jogos
   *     description:  Apaga definitivamente todos os jogos
   *     tags: [Matches]
   *     responses:
   *       200:
   *         description: Jogos removidos
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Delete('')
  @Wrapper(asyncHandler)
  public async deleteAll(req: Request, res: Response): Promise<Response> {
    await matchService.delete({});
    return res.send();
  }

  /**
   * @swagger
   * /api/matches:
   *   post:
   *     summary: Cria um jogo
   *     description: Cria um jogo
   *     tags: [Matches]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/MatchCreateSchema'
   *     responses:
   *       200:
   *         description: Jogo criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MatchSchema'
   *       422:
   *         $ref: '#/definitions/error-422'
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Post('')
  @Middleware(validateMiddleware(matchCreateSchema))
  @Wrapper(asyncHandler)
  public async create(req: Request, res: Response): Promise<Response> {
    const dto: MatchDto = req.body;
    const match = matchMapper.toDomainDto(dto);
    return res.send(await matchService.create(match));
  }

  /**
   * @swagger
   * /api/matches/{id}:
   *  put:
   *    summary: Atualiza o jogo pelo ID
   *    description: Atualiza o jogo pelo ID
   *    tags: [Matches]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *          description: O ID do jogo
   *          example: 60af039c856c6d23b4a584bf
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/MatchUpdateSchema'
   *    responses:
   *       200:
   *         description: O jogo alterado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MatchSchema'
   *       404:
   *         $ref: '#/definitions/error-404'
   *       422:
   *         $ref: '#/definitions/error-422'
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Put(':id')
  @Middleware(validateMiddleware(matchUpdateSchema))
  @Wrapper(asyncHandler)
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dto: MatchDto = req.body;

    const match = await matchService.findById(id);
    if (!match) {
      throw new APIError({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    }

    matchMapper.extractDtoToDomain(match, dto);

    return res.send(await matchService.save(match));
  }

  /**
   * @swagger
   * /api/matches/{id}/history:
   *  put:
   *    summary: Atualiza o jogo e o seu Histório pelo ID
   *    description: Atualiza o jogo e o seu Histório pelo ID
   *    tags: [Matches]
   *    parameters:
   *      - in: path
   *        name: id
   *        schema:
   *          type: string
   *          required: true
   *          description: O ID do jogo
   *          example: 60af039c856c6d23b4a584bf
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/MatchSchema'
   *    responses:
   *       200:
   *         description: O jogo alterado e seu histórico
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MatchSchema'
   *       404:
   *         $ref: '#/definitions/error-404'
   *       422:
   *         $ref: '#/definitions/error-422'
   *       500:
   *         $ref: '#/definitions/error-500'
   */
  @Put(':id/history')
  @Wrapper(asyncHandler)
  public async history(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const dto: MatchDto = req.body;

    const match = await matchService.findById(id);
    if (!match) {
      throw new APIError({
        ...errors.NotFound,
        message: 'Match Not Found',
      });
    }

    matchMapper.extractDtoToDomain(match, dto);

    match.history = [...req.body.history];

    const history: History[] = [...req.body.history];

    return res.send(await matchService.updateHistory(match, history));
  }
}
