/* eslint-disable prettier/prettier */
import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Tweet } from '../entities/tweet.entity';

@InputType()
export class CreateTweetInput {
 
  @Field()
  content : string

  @Field(()=>Int)
  @IsNotEmpty()
  userId : number
}

@ObjectType()
export class TweetResponseModel {
  @Field(()=>Int , {nullable : true})
  statusCode : number

  @Field({nullable : true})
  massege : string

  @Field(()=> Tweet,{nullable : true})
  data? : Tweet

  @Field(()=>[Tweet],{nullable : true})
  allData? : Tweet[]
}
