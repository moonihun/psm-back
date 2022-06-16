import { Handicap } from 'src/scores/entity/handicap.entity';
import { Score } from 'src/scores/entity/score.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Group {
  A = 'A',
  B = 'B',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  average: number;

  @Column({ default: false })
  isFemale: boolean;

  @Column({ type: 'enum', enum: Group })
  group: Group;

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];

  @OneToMany(() => Handicap, (handicap) => handicap.user)
  handicaps: Handicap[];
}
