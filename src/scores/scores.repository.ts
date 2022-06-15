import { Repository } from 'typeorm';
import { Score } from './entity/score.entity';

export class ScoresRepository extends Repository<Score> {}
