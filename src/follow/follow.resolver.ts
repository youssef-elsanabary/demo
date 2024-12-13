/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import {  FollowResponseModel } from './dto/create-follow.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/_guard/jwt-auth-guard.guard';

@UseGuards(JwtAuthGuard)
@Resolver(() => FollowResponseModel)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => FollowResponseModel)
  async followUser(
    @Args('followerId') followerId: number,
    @Args('followingId') followingId: number
  ){
    return await this.followService.follow(followingId,followerId)
  }
 
  @Mutation(()=>FollowResponseModel)
  async unfollowUser(
    @Args('followerId') followerId: number,
    @Args('followingId') followingId: number
  ){
    return await this.followService.unfollow(followingId,followerId)
  }
  @Query(() => FollowResponseModel)
  async getAllFollowers(@Args('userId',{type: () => Int}) userId : number){
    // const user = context.req.user;
    return this.followService.getFollowers(userId);
  }
  
  @Query(() => FollowResponseModel)
  async getAllFollowing(@Args('userId',{type: () => Int}) userId : number) {
    // const user = context.req.user;
    return this.followService.getFollowing(userId);
  }
}
