/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Follow } from './entities/follow.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectModel(Follow) private followModel : typeof Follow ,
    @InjectModel(User) private userModel : typeof User
  ){}
  async follow(followerId : number , followingId : number) {
    await this.followModel.create({ followerId , followingId });
    return{
      statusCode : 201,
      massege : "follow"
    }
  }

  async unfollow(followerId : number , followingId : number){
    await this.followModel.destroy({where : {followerId , followingId}})
    return {
      statusCode : 201,
      massege : "unfollow"
    }
  }
  
  async getFollowers(userId: number) {
    const user = await this.userModel.findByPk(userId , {include :{ model : User ,as : 'followers'}})
    if(user){
      return {
        statusCode : 201,
        massege : "user followers",
        followers :  user.followers
      }
    }
    else{
      return NotFoundException
    }
  }

  async getFollowing(userId: number) {
    const user = await this.userModel.findByPk(userId , {include :{model : User ,as : 'following'}})
    if(user){
      return {
        statusCode : 201,
        massege : "user following",
        following : user.following
      }
    }
    else{
      return NotFoundException
    }
  }
}
