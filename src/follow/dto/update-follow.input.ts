import { FollowingDto } from './create-follow.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFollowInput extends PartialType(FollowingDto) {
}
