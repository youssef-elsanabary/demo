/* eslint-disable prettier/prettier */
import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

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


@ObjectType()
export class UserResponseModel{
  @Field(()=> Int , {nullable : true})
  statusCode : number

  @Field({nullable : true})
  massege: string

  @Field({nullable : true})
  token? : string
  
  @Field(()=> User ,{nullable : true})
  data? : User

  @Field(()=> [User] ,{nullable : true})
  allData? : User[]
}