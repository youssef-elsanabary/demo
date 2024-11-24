/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';

@Module({
  imports : [SequelizeModule.forFeature([Tweet])],
  providers: [TweetResolver, TweetService],
})
export class TweetModule {}
