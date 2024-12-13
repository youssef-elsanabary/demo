/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/_Jwt/JwtPayload';
import { CreateUserInput, UserResponseModel } from 'src/user/dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { CreateAuthInput } from './dto/create-auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService : UserService,
    private readonly jwtService :JwtService
  ){}

  async register(createUserDto: CreateUserInput): Promise<UserResponseModel> {
    const user = await this.userService.create(createUserDto);
    const payload: JwtPayload = { email: user.email , id : user.id};
    const token = this.jwtService.sign(payload); 
      return {
        statusCode : 201, 
        massege : "User Created Successfully",
        token : token,
        data : user
      }
     } 

 async validateUser(email: string, pass: string){
    const user = await this.userService.getUserByEmail(email);
    if (user && await bcrypt.compare(pass, user.data.password )) {
         return user.data
       }else{
        throw new UnauthorizedException('Email or password not valid')
       } 
       } 

 async login(authDto : CreateAuthInput): Promise<UserResponseModel> {
  const {email , password} = authDto;
  const user = await this.validateUser(email,password);
  if(user){
    const payload: JwtPayload = { email: user.email , id : user.id};
    const token = this.jwtService.sign(payload) ;
     return {
      statusCode : 201,
      massege : " Successfull Login",
      token : token,
      data : user
     }
    }
    }
}
