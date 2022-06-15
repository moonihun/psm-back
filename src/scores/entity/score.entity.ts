import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  round: number;

  @CreateDateColumn()
  date: Date;

  @Column({ default: 0 })
  first_game: number;

  @Column({ default: 0 })
  second_game: number;

  @Column({ default: 0 })
  third_game: number;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}
