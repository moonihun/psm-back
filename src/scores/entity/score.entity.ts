import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Round {
  ONE = '1',
  TWO = '2',
}

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: '2206',
    description: '라운드 날짜',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  @Index()
  round_month: string;

  @ApiProperty({
    example: '1 or 2',
    description: '라운드',
    required: true,
  })
  @IsEnum(Round)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Round })
  @Index()
  round: Round;

  @ApiProperty({
    description: '첫 번째 게임 점수',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ default: 0 })
  first_game: number;

  @ApiProperty({
    description: '두 번째 게임 점수',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ default: 0 })
  second_game: number;

  @ApiProperty({
    description: '세 번째 게임 점수',
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Column({ default: 0 })
  third_game: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => User,
    description: '대상자',
    required: true,
  })
  @ManyToOne(() => User, (user) => user.scores)
  user: User;

  @Column()
  userId: number;
}
