import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateHandicapDto } from './dto/create-handicap.dto';
import { CreateScoreDto } from './dto/create-score.dto';
import { Handicap } from './entity/handicap.entity';
import { Score } from './entity/score.entity';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(
    private scoresService: ScoresService,
    private usersService: UsersService,
  ) {}

  @Get()
  findAll(): Promise<Score[]> {
    return this.scoresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Score> {
    return this.scoresService.findOne(id);
  }

  @Post()
  async createScore(@Body() score: CreateScoreDto): Promise<Score> {
    const user = await this.usersService.findOne(score.userId);
    return this.scoresService.createScore(score, user);
  }

  @Post('/handicap')
  async createHandicap(@Body() handicap: CreateHandicapDto): Promise<Handicap> {
    const user = await this.usersService.findOne(handicap.userId);
    return this.scoresService.createHandicap(handicap, user);
  }
}
