/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Follow } from './entities/follow.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Follow]),UserModule ],
  providers: [FollowResolver, FollowService],
})
export class FollowModule {}
