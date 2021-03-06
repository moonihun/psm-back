import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
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

@Entity('handicaps')
export class Handicap {
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
  handi_month: string;

  @ApiProperty({
    description: '첫 번째 핸디캡',
    default: 0,
  })
  @Column({ default: 0 })
  first_handi: number;

  @ApiProperty({
    description: '두 번째 핸디캡',
    default: 0,
  })
  @Column({ default: 0 })
  second_handi: number;

  @ApiProperty({
    description: '세 번째 핸디캡',
    default: 0,
  })
  @Column({ default: 0 })
  third_handi: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => User,
    description: '대상자',
    required: true,
  })
  @ManyToOne(() => User, (user) => user.handicaps)
  user: User;
}
