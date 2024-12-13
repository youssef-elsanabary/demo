/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateUserInput, UserResponseModel } from 'src/user/dto/create-user.input';
import { CreateAuthInput } from './dto/create-auth.input';

@Resolver(() => UserResponseModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponseModel)
  register(@Args('createAuthInput') createAuthInput: CreateUserInput) {
    return this.authService.register(createAuthInput);
  }

  @Mutation(()=>UserResponseModel)
  login(@Args('authDto') authDto : CreateAuthInput){
    return this.authService.login(authDto)
  }
}
