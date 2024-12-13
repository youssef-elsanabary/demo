/* eslint-disable prettier/prettier */
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResponseModel } from './dto/create-user.input';



@Resolver(() => UserResponseModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.userService.create(createUserInput);
  // }

  @Query(() => UserResponseModel)
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Query(() => UserResponseModel , {name : 'getUserById'})
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.getUserById(id);
  }

  @Query(() => UserResponseModel, { name: 'getUserByName' })
  getUserByName(@Args('name', { type: () => String }) name: string) {
    return this.userService.getUserByName(name);
  }
  @Query(() => UserResponseModel, { name: 'getUserByEmail' })
  getUserByEmail(@Args('email', { type: () => String }) email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Mutation(() => UserResponseModel)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput , userId : number) {
    return this.userService.update(userId, updateUserInput);
  }

  @Mutation(() => UserResponseModel)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
