import { IsDate, IsNumber } from 'class-validator';

export class CreateHandicapDto {
  @IsNumber()
  readonly handicap_score: number;

  @IsDate()
  readonly isActive: boolean;

  @IsNumber()
  readonly userId: number;
}
