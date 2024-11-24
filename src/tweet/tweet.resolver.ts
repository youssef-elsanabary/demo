/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { TweetService } from './tweet.service';
import { Tweet } from './entities/tweet.entity';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { JwtAuthGuard } from 'src/_guard/jwt-auth-guard.guard';
import { UseGuards } from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Resolver(() => Tweet)
export class TweetResolver {
  constructor(private readonly tweetService: TweetService) {}

  @Mutation(() => Tweet)
  createTweet(@Args('createTweetInput') createTweetInput: CreateTweetInput) {
    return this.tweetService.create(createTweetInput);
  }

  @Query(() => [Tweet])
  getAllTweet() {
    return this.tweetService.getAllTweet();
  }

  @Query(() => [Tweet])
  getAllTweetOfUser(@Context() context ) {
    const user = context.req.user
    return this.tweetService.getAllTweetOfUser(user.id);
  }
  
  @Query(() => Tweet, { name: 'tweet' })
  getTweetById(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.getTweetById(id);
  }

  @Mutation(() => Tweet)
  updateTweet(@Args('updateTweetInput') updateTweetInput: UpdateTweetInput , tweetId : number) {
    return this.tweetService.update(tweetId, updateTweetInput);
  }

  @Mutation(() => Tweet)
  removeTweet(@Args('id', { type: () => Int }) id: number) {
    return this.tweetService.removeTweet(id);
  }
}
