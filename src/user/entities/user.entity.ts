/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AutoIncrement,BelongsToMany, Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Follow } from 'src/follow/entities/follow.entity';
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

  @Field(()=>[User],{nullable : true})
  @BelongsToMany(()=>User,()=>Follow ,'followingId' ,'followerId')
  followers? : User[]
  
  @Field(()=>[User],{nullable:true})
  @BelongsToMany(()=>User,()=>Follow ,'followerId' ,'followingId')
  following? : User[]
}