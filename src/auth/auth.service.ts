/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/_Jwt/JwtPayload';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService : UserService,
    private readonly jwtService :JwtService
  ){}

  async register(createUserDto: CreateUserInput) {
    console.log("auth service 111 : "+ createUserDto.email);
    const user = await this.userService.create(createUserDto);
    // console.log("Auth Service : "+user.email);
     const payload: JwtPayload = { email: user.email };
      return { access_token: this.jwtService.sign(payload), 
      }; 
     } 

 async validateUser(email: string, pass: string){
    const user = await this.userService.getUserByEmail(email);
    console.log("Validate User :" + user.age);
     
    if (user && await bcrypt.compare(pass, user.password )) {
        // const result = user;
        // console.log("result :" + user.email);
         return user;
       }
         return null; 
       } 

 async login(user: any) {
    const payload: JwtPayload = { email: user.email };
     return { access_token: this.jwtService.sign(payload), };
    }
}
