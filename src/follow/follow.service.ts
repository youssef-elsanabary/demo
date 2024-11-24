/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Follow } from './entities/follow.entity';
import { User } from 'src/user/entities/user.entity';
import { FollowingDto } from './dto/create-follow.input';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow) private followModel : typeof Follow ,
    @InjectModel(User) private userModel : typeof User
  ){}
  async follow(userId: number, followingDto : FollowingDto) {
    const {followingId} = followingDto;
    return this.followModel.create({ followerId : userId, followingId });
  }

  async getFollowers(userId: number) {
    const followers = await this.followModel.findAll({
      where : {followingId : userId},
      include : [this.userModel]
    });
    return followers.map(follow => follow.getDataValue('followerId'));
    // return this.followModel.findAll({ where: { followingId: userId } });
  }

  async getFollowing(userId: number) {
    const following = await this.followModel.findAll({
      where :{followerId : userId},
      include : [this.userModel]
    })
    return following.map(follow=>follow.getDataValue('followingId'))
    // return this.followModel.findAll({ where: { followerId: userId } });
  }
}
