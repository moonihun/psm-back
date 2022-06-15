import { Handicap } from 'src/scores/entity/handicap.entity';
import { Score } from 'src/scores/entity/score.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  average: number;

  @Column({ default: false })
  isFemale: boolean;

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];

  @OneToMany(() => Handicap, (handicap) => handicap.user)
  handicaps: Handicap[];
}
