import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CommentService } from '../comment/comment.service';
import { MessageHelper } from '../common/helpers/message.helper';
import { PostService } from '../post/post.service';
import { LikeEntity } from './entities/like.entity';
import { LikeService } from './like.service';

export class LikeHelper {
  protected readonly postService = new PostService();
  protected readonly commentService = new CommentService();
  protected readonly likeService = new LikeService();

  protected provideCommentOrPostException({ commentId, postId }) {
    if (commentId && postId)
      throw new BadRequestException(MessageHelper.COMMENT_OR_POST_PROVIDE);
  }

  protected invalidCommentAndPostException({ commentId, postId }) {
    if (!commentId && !postId)
      throw new BadRequestException(MessageHelper.COMMENT_AND_POST_INVALID);
  }

  protected async commentHasLike({ user, commentId }): Promise<boolean> {
    const commentResponse = await this.commentService.findOne({
      id: commentId,
    });

    if (!commentResponse)
      throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    const userLikes = commentResponse.like.filter(
      (item) => item.user.id === user.id,
    );

    if (userLikes.length > 0) {
      return true;
    }
    return false;
  }

  protected async postHasLike({ user, postId }): Promise<boolean> {
    const postResponse = await this.postService.findOne({ id: postId });

    if (!postResponse)
      throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

    const userLikes = postResponse.like.filter(
      (item) => item.user.id === user.id,
    );

    if (userLikes.length > 0) {
      return true;
    }
    return false;
  }

  protected async handleCommentLike({
    commentId,
    user,
    createBody,
  }): Promise<LikeEntity> {
    if (await this.commentHasLike({ user, commentId })) {
      throw new BadRequestException(MessageHelper.USER_ALREADY_LIKED);
    }

    const commentEntity = await this.commentService.findOne({ id: commentId });

    Object.assign(createBody, {
      comment: { connect: { id: commentEntity.id } },
    });

    return await this.likeService.create({
      ...createBody,
      post: undefined,
      user: { connect: { email: user.email } },
    });
  }

  protected async handlePostLike({
    postId,
    user,
    createBody,
  }): Promise<LikeEntity> {
    if (await this.postHasLike({ user, postId })) {
      throw new BadRequestException(MessageHelper.USER_ALREADY_LIKED);
    }

    const postEntity = await this.postService.findOne({ id: postId });

    Object.assign(createBody, {
      post: { connect: { id: postEntity.id } },
    });

    return await this.likeService.create({
      ...createBody,
      comment: undefined,
      user: { connect: { email: user.email } },
    });
  }
}
