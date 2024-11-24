/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateTweetInput {
 
  @Field()
  content : string

  @Field(()=>Int)
  @IsNotEmpty()
  userId : number
}
