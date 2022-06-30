import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHandicapDto } from './dto/create-handicap.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { ScoreView } from './entity/score.view.entity';
import { Handicap } from './entity/handicap.entity';
import { Score } from './entity/score.entity';
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
