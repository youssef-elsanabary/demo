/* eslint-disable prettier/prettier */
import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email : string

  @Field()
  @IsNotEmpty()
  password : string

  @Field()
  @IsString()
  name : string

  @Field(()=>Int)
  @IsNumber()
  age : number

  @Field()
  @IsPhoneNumber()
  phoneNumber : string
}
