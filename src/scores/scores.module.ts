import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entity/score.entity';
import { Handicap } from './entity/handicap.entity';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Handicap, User])],
  providers: [ScoresService, UsersService],
  controllers: [ScoresController],
})
export class ScoresModule {}
