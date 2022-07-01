import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHandicapDto } from './dto/create-handicap.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreView } from './entity/score.view.entity';
import { Handicap } from './entity/handicap.entity';
import { Round, Score } from './entity/score.entity';
import { ScoresRepository } from './scores.repository';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: ScoresRepository,

    @InjectRepository(Handicap)
    private handicapsRepository: Repository<Handicap>,

    @InjectRepository(ScoreView)
    private scoreViewRepository: Repository<ScoreView>,
  ) {}

  async findAll(): Promise<Score[]> {
    return await this.scoresRepository.find();
  }

  // async findOne(id: number): Promise<Score> {
  //   return await this.scoresRepository.findOne({
  //     where: {
  //       id,
  //     },
  //     relations: {
  //       user: true,
  //     },
  //   });
  // }
  async getScore() {
    return await this.scoreViewRepository.find();
  }

  async getScoreByGroup(group: string) {
    return await this.scoreViewRepository.find({
      where: {
        group,
      },
    });
  }

  async getScoreByMonth(month: string) {
    return await this.scoreViewRepository.find({
      where: {
        month,
      },
    });
  }

  async getScoreByGroupAndMonth(group: string, month: string) {
    return await this.scoreViewRepository.find({
      where: {
        group,
        month,
      },
    });
  }

  async createScore(score: CreateScoreDto): Promise<Score> {
    const { first_game, second_game, third_game, round_month, round, user } =
      score;

    const newScore = this.scoresRepository.create({
      first_game,
      second_game,
      third_game,
      round_month,
      round,
      user,
    });

    return await this.scoresRepository.save(newScore);
  }

  async scoretest(body: any) {
    const { gameData, month, round } = body;

    let newRound;
    if (round === 'ONE') {
      newRound = '1';

      gameData.map(async (data) => {
        if (isNaN(parseInt(data.game1))) {
          data.game1 = 0;
        } else {
          data.game1 = parseInt(data.game1);
        }
        if (isNaN(parseInt(data.game2))) {
          data.game2 = 0;
        } else {
          data.game2 = parseInt(data.game2);
        }
        if (isNaN(parseInt(data.game3))) {
          data.game3 = 0;
        } else {
          data.game3 = parseInt(data.game3);
        }

        const scoreR1 = this.scoresRepository.create({
          round_month: month,
          round: newRound,
          first_game: data.game1,
          second_game: data.game2,
          third_game: data.game3,
          userId: parseInt(data.id),
        });

        const scoreR2 = this.scoresRepository.create({
          round_month: month,
          round: Round.TWO,
          first_game: 0,
          second_game: 0,
          third_game: 0,
          userId: parseInt(data.id),
        });
        try {
          await this.scoresRepository.save(scoreR1);
          await this.scoresRepository.save(scoreR2);
        } catch (error) {
          throw new InternalServerErrorException();
        }
      });
    } else if (round === 'TWO') {
      newRound = '2';
      gameData.map(async (data) => {
        if (isNaN(parseInt(data.game1))) {
          data.game1 = 0;
        } else {
          data.game1 = parseInt(data.game1);
        }
        if (isNaN(parseInt(data.game2))) {
          data.game2 = 0;
        } else {
          data.game2 = parseInt(data.game2);
        }
        if (isNaN(parseInt(data.game3))) {
          data.game3 = 0;
        } else {
          data.game3 = parseInt(data.game3);
        }
        const foundScore = this.scoresRepository.findOne({
          where: { round_month: month, round: Round.TWO, userId: data.id },
        });

        try {
          await this.scoresRepository.update((await foundScore).id, {
            first_game: data.game1,
            second_game: data.game2,
            third_game: data.game3,
          });
        } catch (error) {
          throw new InternalServerErrorException();
        }
      });
    } else {
      throw new InternalServerErrorException();
    }
  }

  async createHandicap(handicap: CreateHandicapDto): Promise<Handicap> {
    const { handi_month, first_handi, second_handi, third_handi, user } =
      handicap;
    const newHandicap = this.handicapsRepository.create({
      handi_month,
      first_handi,
      second_handi,
      third_handi,
      user,
    });

    return await this.handicapsRepository.save(newHandicap);
  }
}
