import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Handicap } from 'src/scores/entity/handicap.entity';
import { Score } from 'src/scores/entity/score.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'testuser',
    description: 'name',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column({ unique: true })
  @Index()
  username: string;

  @ApiProperty({
    example: '1234',
    description: 'password',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  password: string;

  @Column({ default: 0 })
  high_score: number;

  @Column({ default: 0 })
  how_many_wins: number;

  @Column({ default: false })
  is_female: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];

  @OneToMany(() => Handicap, (handicap) => handicap.user)
  handicaps: Handicap[];

  @OneToMany(() => Group, (group) => group.user)
  groups: Group[];
}
