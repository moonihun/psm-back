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

export enum GroupEnum {
  A = 'A',
  B = 'B',
}

@Entity('groups')
export class Group {
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
  group_month: string;

  @ApiProperty({
    example: 'A or B',
    description: '그룹',
  })
  @Column({ type: 'enum', enum: GroupEnum, default: GroupEnum.A })
  group: GroupEnum;

  @ApiProperty({
    example: 166,
    description: '당월 에버리지',
  })
  @Column({ default: 0 })
  average: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    type: () => User,
    description: '대상자',
    required: true,
  })
  @ManyToOne(() => User, (user) => user.groups)
  user: User;
}
