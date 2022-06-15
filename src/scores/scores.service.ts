import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { CreateHandicapDto } from './dto/create-handicap.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { Handicap } from './entity/handicap.entity';
import { Score } from './entity/score.entity';
import { HandicapsRepository } from './handicaps.repository';
import { ScoresRepository } from './scores.repository';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private scoresRepository: ScoresRepository,

    @InjectRepository(Handicap)
    private handicapsRepository: HandicapsRepository,
  ) {}

  async findAll(): Promise<Score[]> {
    return await this.scoresRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Score> {
    return await this.scoresRepository.findOne({
      where: {
        id,
      },
      relations: {
        user: true,
      },
    });
  }

  async createScore(score: CreateScoreDto, user: User): Promise<Score> {
    const newScore = new Score();
    newScore.date = score.date;
    newScore.first_game = score.first_game;
    newScore.second_game = score.second_game;
    newScore.third_game = score.third_game;
    newScore.round = score.round;
    newScore.user = user;

    return await this.scoresRepository.save(newScore);
  }

  async createHandicap(
    handicap: CreateHandicapDto,
    user: User,
  ): Promise<Handicap> {
    const newHandicap = new Handicap();
    newHandicap.handicap_score = handicap.handicap_score;
    newHandicap.user = user;

    return await this.handicapsRepository.save(newHandicap);
  }
}
