/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput, UserResponseModel} from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Tweet } from 'src/tweet/entities/tweet.entity';
import { Follow } from 'src/follow/entities/follow.entity';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel : typeof User ){}

  async create(createUserInput: CreateUserInput){
    const hashedPassword = await bcrypt.hash(createUserInput.password,15);
    const user =new this.userModel({...createUserInput , password : hashedPassword});
    await user.save();
    return user;
  }

  async getAllUser(){
    const allUser = await this.userModel.findAll({include : [Tweet]})
    if(allUser){
    return {
      statusCode : 201,
      massege : "data returned successfully",
      allData : allUser
    }
  }else{
    throw new NotFoundException('no users found')
  }
  }

  async getUserById(id: number) {
    const user = await this.userModel.findByPk(id,{include : [Tweet]});
    if(user){
      return {
        statusCode : 200,
        massege : " Found User Data",
        data : user
      }
    }else{
      throw new NotFoundException('user not found')
    }
  }

  async getUserByName(name: string) :Promise<UserResponseModel>{
    const user =await this.userModel.findOne({where : {name},include : [Tweet]});
    if(user){
      return {
        statusCode : 200,
        massege : " Found User Data",
        data : user
      }
    }else{
      throw new NotFoundException('user not found')
    }
  }

  async getUserByEmail(email: string) {  
    const user = await this.userModel.findOne({where : {email},include : [Tweet]});
    if(user){
      return {
        statusCode : 200,
        massege : " Found User Data",
        data : user
      }
    }else{
      throw new NotFoundException('user not found')
    }
  }
  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findOne({where : {id}})
    if(user){
       Object.assign(user,updateUserInput);
       await user.save()
       return {
        statusCode : 200,
        massege : " User Updated",
        data : user
      } 
    }else{
      throw new NotFoundException('user not found')
    }
    
  }

  async remove(id: number) {
    const user = this.userModel.findOne({where : {id}});
    if(user){
      await (await user).destroy
      return "User Deleted"
    }else{
      throw new NotFoundException('user not found')
    }
  }
}
