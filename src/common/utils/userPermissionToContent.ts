import { UnauthorizedException } from '@nestjs/common';
import { MessageHelper } from '../helpers/message.helper';

export const exceptionIfPostDontBelongsToUser = ({ user, post }) => {
  if (user.id !== post.author.id)
    throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);
};

export const exceptionIfProfileDontBelongsToUser = ({ user, profile }) => {
  if (user.id !== profile.userId)
    throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);
};

export const exceptionIfContentDontBelongsToUser = ({ user, content }) => {
  if (user.id !== content.id)
    throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);
};
