import { PickType } from '@nestjs/swagger';
import { Handicap } from '../entity/handicap.entity';

export class CreateHandicapDto extends PickType(Handicap, [
  'handi_month',
  'first_handi',
  'second_handi',
  'third_handi',
  'user',
] as const) {}
