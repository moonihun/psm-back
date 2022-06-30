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

  // @Get(':id')
  // findOne(@Param('id') id: number): Promise<Score> {
  //   return this.scoresService.findOne(id);
  // }

  @Get()
  getScore() {
    return this.scoresService.getScore();
  }

  @Get('group/:group')
  getScoreByGroup(@Param('group') group: string) {
    return this.scoresService.getScoreByGroup(group);
  }

  @Get('month/:month')
  getScoreByMonth(@Param('month') month: string) {
    return this.scoresService.getScoreByMonth(month);
  }

  @Get(':group/:month')
  getScoreByGroupAndMonth(
    @Param('group') group: string,
    @Param('month') month: string,
  ) {
    return this.scoresService.getScoreByGroupAndMonth(group, month);
  }

  // @Get('agroup/:month')
  // getAgroupScoreByMonth(@Param('month') month: string) {
  //   return this.scoresService.getScoreByMonth(month);
  // }

  // @Get('bgroup')
  // getBgroupScore() {
  //   return this.scoresService.getBgroupScore();
  // }

  // @Get('bgroup/:month')
  // getBgroupScoreByMonth(@Param('month') month: string) {
  //   return this.scoresService.getBgroupScoreByMonth(month);
  // }

  @Post()
  async createScore(@Body() score: CreateScoreDto): Promise<Score> {
    return this.scoresService.createScore(score);
  }

  @Post('/handicap')
  async createHandicap(@Body() handicap: CreateHandicapDto): Promise<Handicap> {
    return this.scoresService.createHandicap(handicap);
  }
}
