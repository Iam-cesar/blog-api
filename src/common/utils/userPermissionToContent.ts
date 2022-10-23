import { UnauthorizedException } from '@nestjs/common';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { MessageHelper } from '../helpers/message.helper';
import { ProfileEntity } from './../../profile/entities/profile.entity';

export const exceptionIfPostDontBelongsToUser = (
  user: { id: number },
  content: PostEntity,
) => {
  if (user.id !== content.author.id)
    throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);
};

export const exceptionIfProfileDontBelongsToUser = (
  user: { id: number },
  content: ProfileEntity,
) => {
  if (user.id !== content.userId)
    throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);
};

export const exceptionIfUserDontBelongsToUser = (
  user: { id: number },
  content: UserEntity,
) => {
  if (user.id !== content.id)
    throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);
};
