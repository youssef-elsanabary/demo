/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userModel : typeof User ){}

  async create(createUserInput: CreateUserInput) {
    console.log( "userService :  " + createUserInput.email);
    
    const hashedPassword = await bcrypt.hash(createUserInput.password,15);
    const user =new this.userModel({...createUserInput , password : hashedPassword});
    console.log('Create User DTO:' + user.id)
    return user.save();
  }

  async getAllUser(){
    return await this.userModel.findAll()
  }

  async getUserById(id: number) {
    const user = this.userModel.findByPk(id);
    if(user){
      return await user
    }else{
      return NotFoundException
    }
  }

  async getUserByName(name: string) {
    const user = this.userModel.findOne({where : {name}});
    if(user){
      return await user
    }else{
      return NotFoundException
    }
  }

  async getUserByEmail(email: string) {
    console.log("email :" + email);
    
    const user = this.userModel.findOne({where : {email}});
    console.log("email 1 :" +(await user).email);
    
    if(user)
      return await user
   
  }
  async update(id: number, updateUserInput: UpdateUserInput) {
    const user = await this.userModel.findOne({where : {id}})
    if(user){
       Object.assign(user,updateUserInput);
       return user.save()
    }else{
      return NotFoundException;
    }
    
  }

  async remove(id: number) {
    const user = this.userModel.findOne({where : {id}});
    if(user){
      await (await user).destroy
      return "User Deleted"
    }else{
      return NotFoundException
    }
  }
}
