/* eslint-disable prettier/prettier */
import { CreateAuthInput } from './create-auth.input';
import { InputType,PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthInput extends PartialType(CreateAuthInput) {}
