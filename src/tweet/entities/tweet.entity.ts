/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table
export class Tweet extends Model<Tweet> {
  @Field(()=> Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id : number

  @Field()
  @Column
  content : string

  @Field(()=>Int)
  @ForeignKey(()=> User)
  @Column
  userId : number

  @Field(()=>User)
  @BelongsTo(()=> User)
  user : User
}
