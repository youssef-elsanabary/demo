/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { FollowService } from './follow.service';
import { Follow } from './entities/follow.entity';
import { FollowingDto } from './dto/create-follow.input';
import { UseGuards } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/_guard/jwt-auth-guard.guard';

  @UseGuards(JwtAuthGuard)
  @Resolver(() => Follow)
export class FollowResolver {
  constructor(private readonly followService: FollowService) {}

  @Mutation(() => Boolean)
  async followUser(
    @Args('createFollowDto') createFollowDto: FollowingDto,
    @Context() context,
  ): Promise<boolean> {
    const user = context.req.user;
    await this.followService.follow(user.id, createFollowDto);
    return true;
  }
 
  @Query(() => [User])
  async listFollowers(@Context() context){
    const user = context.req.user;
    return this.followService.getFollowers(user.id);
  }
  
  @Query(() => [User])
  async listFollowing(@Context() context) {
    const user = context.req.user;
    return this.followService.getFollowing(user.id);
  }
}
