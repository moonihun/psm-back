import { IsDate, IsNumber } from 'class-validator';

export class CreateScoreDto {
  @IsNumber()
  readonly round: number;

  @IsDate()
  readonly date: Date;

  @IsNumber()
  readonly first_game: number;

  @IsNumber()
  readonly second_game: number;

  @IsNumber()
  readonly third_game: number;

  @IsNumber()
  readonly userId: number;
}
