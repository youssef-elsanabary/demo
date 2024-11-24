/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AutoIncrement, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@ObjectType()
@Table
export class User extends Model <User>{

  @Field(()=>Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id : number

  @Field()
  @Column
  email : string

  @Field()
  @Column
  password : string

  @Field()
  @Column
  name: string

  @Field(()=>Int,{nullable : true})
  @Column
  age : number

  @Field({nullable : true})
  @Column
  phoneNumber : string

  @Field(()=>[Tweet] ,{nullable : true})
  @HasMany(()=>Tweet)
  tweet : [Tweet]
}