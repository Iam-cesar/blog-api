import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from '../comment/comment.service';
import { MessageHelper } from '../common/helpers/message.helper';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { UserEntity } from './../user/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeEntity } from './entities/like.entity';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly commentService: CommentService,
  ) {}

  @Post()
  @HttpCode(201)
  @UseGuards(AuthGuard('jwt'))
  @ApiTags('Like')
  async create(
    @Body() data: CreateLikeDto,
    @Req() req: { user: { email: string } },
  ) {
    const { post: postId, comment: commentId } = data;
    const createBody = data;

    this.invalidCommentAndPostException(commentId, postId);

    this.provideCommentOrPostException(commentId, postId);

    const user = await this.userService.findOne({ email: req.user.email });

    if (!user) throw new UnauthorizedException(MessageHelper.USER_NOT_FOUND);

    if (commentId) {
      return await this.handleCommentLike(commentId, req.user, createBody);
    }

    if (postId) {
      return await this.handlePostLike(postId, req.user, createBody);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const like = await this.likeService.findOne({ id });

    if (!like) throw new NotFoundException(MessageHelper.LIKE_NOT_FOUND);

    return like;
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const like = await this.likeService.findOne({ id });

    if (!like) throw new NotFoundException(MessageHelper.LIKE_NOT_FOUND);

    return await this.likeService.remove({ id });
  }

  private provideCommentOrPostException(comment: string, post: string) {
    if (comment && post)
      throw new BadRequestException(MessageHelper.COMMENT_OR_POST_PROVIDE);
  }

  private invalidCommentAndPostException(comment: string, post: string) {
    if (!comment && !post)
      throw new BadRequestException(MessageHelper.COMMENT_AND_POST_INVALID);
  }

  private async commentHasLike(
    user: UserEntity,
    comment: string,
  ): Promise<boolean> {
    const response = await this.commentService.findOne({ id: comment });
    if (!response) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);
    const userLikes = response.like.filter((item) => item.userId === user.id);

    if (userLikes.length > 0) {
      return true;
    }
    return false;
  }

  private async postHasLike(user: UserEntity, post: string): Promise<boolean> {
    const response = await this.postService.findOne({ id: post });
    if (!response) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);
    const userLikes = response.like.filter((item) => item.userId === user.id);

    if (userLikes.length > 0) {
      return true;
    }
    return false;
  }

  private async handleCommentLike(
    comment: string,
    user: { email: string },
    createBody: CreateLikeDto,
  ): Promise<LikeEntity> {
    if (await this.commentHasLike(user, comment)) {
      throw new BadRequestException(MessageHelper.USER_ALREADY_LIKED);
    }

    const commentEntity = await this.commentService.findOne({ id: comment });

    Object.assign(createBody, {
      comment: { connect: { id: commentEntity.id } },
    });

    return await this.likeService.create({
      ...createBody,
      post: undefined,
      user: { connect: { email: user.email } },
    });
  }

  private async handlePostLike(
    post: string,
    user: { email: string },
    createBody: CreateLikeDto,
  ): Promise<LikeEntity> {
    if (await this.postHasLike(user, post)) {
      throw new BadRequestException(MessageHelper.USER_ALREADY_LIKED);
    }

    const postEntity = await this.postService.findOne({ id: post });

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
