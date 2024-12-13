/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetInput } from './dto/create-tweet.input';
import { UpdateTweetInput } from './dto/update-tweet.input';
import { InjectModel } from '@nestjs/sequelize';
import { Tweet } from './entities/tweet.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TweetService {
  constructor(
    @InjectModel(Tweet) private readonly tweetModel : typeof Tweet
  ){}

  async create(createTweetInput: CreateTweetInput ) {
    const newTweet =new this.tweetModel({...createTweetInput })
    await newTweet.save();
    return {
      statusCode : 201,
      massege : "tweet created successfully",
      data : newTweet
    };
  }

  async getAllTweet() {
    const allTweet = await this.tweetModel.findAll({include : [User]});
    if(allTweet){
      return {
        statusCode : 201,
        massege : "get all tweet Successfully",
        allData : allTweet
      }
    } else{
      return NotFoundException
    }
  }

  async getTweetById(id: number) {
    const tweet = await this.tweetModel.findByPk(id,{include : User})
    if(tweet){
    return {
      statusCode : 201,
      massege : "get tweet successfully",
      data : tweet
    };
    }else {
      return NotFoundException
    }
  }
  async getAllTweetOfUser(userId : number){
    const tweet = await this.tweetModel.findAll({where : {userId}, include :User})
    if(tweet){
    return {
      statusCode : 201,
      massege : "successfull",
      allData : tweet
    };
    }else {
      return NotFoundException
    }
  }

  async update(id: number, updateTweetInput: UpdateTweetInput) {
    const tweet = await this.tweetModel.findByPk(id)
    if(tweet){
      Object.assign(tweet ,updateTweetInput )
      await tweet.save()
      return {
        statusCode : 201,
      massege : "tweet updated successfully",
      data : tweet
      }
    }
    return NotFoundException;
  }

  async removeTweet(id: number) {
    const tweet = await this.tweetModel.findByPk(id)
    if(tweet){
      await tweet.destroy
    return {
      statusCode : 201,
      massege : "tweet deleted successfully",
      data : tweet
    }
    }else {
      return NotFoundException
    };
  }
}
