/* eslint-disable prettier/prettier */
import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class FollowingDto {
  @Field(() => Int)
  followingId : number;
}
 
@ObjectType()
export class FollowResponseModel {
   @Field(() => Int) 
   statusCode: number; 
   
   @Field() 
   massege: string; 
   
  //  @Field({ nullable: true }) 
  //  data?: any; // Adjust according to the context, e.g., a boolean or a user array 
   
   @Field(() => [User], { nullable: true }) 
   followers?: User[]; 
   
   @Field(() => [User], { nullable: true }) 
   following?: User[]; }