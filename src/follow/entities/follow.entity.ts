/* eslint-disable prettier/prettier */
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
@Table
export class Follow extends Model<Follow> {
  @Field(()=> Int)
  @PrimaryKey
  @AutoIncrement
  @Column
  id : number
  
  @Field(()=> Int)
  @ForeignKey(()=> User)
  @Column
  followerId : number

  @Field(()=> Int)
  @ForeignKey(()=> User)
  @Column
  followingId : number
}
