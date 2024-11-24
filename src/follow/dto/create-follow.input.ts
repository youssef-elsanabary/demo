/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class FollowingDto {
  @Field(() => Int)
  followingId : number;
}
 