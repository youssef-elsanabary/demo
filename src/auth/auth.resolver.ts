/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput } from 'src/user/dto/create-user.input';
import { User } from 'src/user/entities/user.entity';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  register(@Args('createAuthInput') createAuthInput: CreateUserInput) {
    // console.log("Auth Resolver : "+createAuthInput.email);
    return this.authService.register(createAuthInput);
  }

  @Mutation(()=>User)
  login(@Args('email') email:string ,@Args('password') password:string){
    const user = this.authService.validateUser(email,password);
    // console.log("Auth Resolver Login :" + user);
    
    return this.authService.login(user);
  }
}
