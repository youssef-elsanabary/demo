/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet) private readonly tweetModel : typeof Tweet
  ){}

  async create(createTweetInput: CreateTweetInput ) {
    const newTweet =new this.tweetModel({...createTweetInput })
    await this.tweetModel.create(newTweet);
    console.log("new tweet :" +newTweet.userId);
    
    // newTweet.save();
    return newTweet;
  }

  async getAllTweet() {
    return await this.tweetModel.findAll();
  }

  async getTweetById(id: number) {
    const tweet = await this.tweetModel.findByPk(id)
    if(tweet){
    return tweet;
    }else {
      return NotFoundException
    }
  }
  async getAllTweetOfUser(userId : number){
    const tweet = await this.tweetModel.findAll({where : {userId}})
    if(tweet){
    return tweet;
    }else {
      return NotFoundException
    }
  }

  async update(id: number, updateTweetInput: UpdateTweetInput) {
    const tweet = await this.tweetModel.findByPk(id)
    if(tweet){
      Object.assign(tweet ,updateTweetInput )
      return tweet.save()
    }
    return NotFoundException;
  }

  async removeTweet(id: number) {
    const tweet = await this.tweetModel.findByPk(id)
    if(tweet){
    return (await tweet).destroy;
    }else {
      return NotFoundException
    };
  }
}
