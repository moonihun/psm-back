import { PickType } from '@nestjs/swagger';
import { Score } from '../entity/score.entity';

export class CreateScoreDto extends PickType(Score, [
  'round_month',
  'round',
  'first_game',
  'second_game',
  'third_game',
  'user',
] as const) {}
