import { Match, MatchModel } from '@src/models/matchModel';
import { History, HistoryModel } from '@src/models/historyModel';

class MatchService {
  public async create(match: Match): Promise<Match> {
    const model = new MatchModel(match);
    return model.save();
  }

  public async findById(id: string): Promise<Match> {
    return <Match>await MatchModel.findById(id).populate('history');
  }

  public async deleteById(id: string): Promise<void> {
    await MatchModel.deleteOne({ _id: id });
  }

  public async save(match: Match): Promise<Match> {
    const model = new MatchModel(match);
    return model.save();
  }

  public async updateHistory(match: Match, history: History[]): Promise<Match> {
    const model = new MatchModel(match);
    model.history = [];
    history.forEach(hist => {
      const historyModel = new HistoryModel(hist);
      historyModel.save();
      model.history.push(historyModel);
    });
    return model.save();
  }

  public async delete(params: Partial<Match>): Promise<void> {
    await MatchModel.deleteMany(params);
  }

  public async findAll(): Promise<Match[]> {
    return MatchModel.find({}).populate('history');
  }
}

export const matchService = new MatchService();
