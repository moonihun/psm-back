import { User } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('handicaps')
export class Handicap {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  handicap_score: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => User, (user) => user.scores)
  user: User;
}
