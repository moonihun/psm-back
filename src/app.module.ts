import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresConfigService } from './config/database/config.service';
import { UsersModule } from './users/users.module';
import { ScoresModule } from './scores/scores.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UsersModule,
    ScoresModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PostgresConfigService],
})
export class AppModule {}
