import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CommentService } from '../comment/comment.service';
import { MessageHelper } from '../helpers/message.helper';
import { PostService } from '../post/post.service';
import { db } from '../prisma/utils/db.server';
import { UserService } from '../user/user.service';
import { UserEntity } from './../user/entities/user.entity';
import { CreateLikeDto } from './dto/create-like.dto';
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
    const { post, comment } = data;
    const createBody = data;

    this.invalidCommentAndPostException(comment, post);

    this.provideCommentOrPostException(comment, post);

    const user = await this.userService.findOne({ email: req.user?.email });

    if (!user) throw new UnauthorizedException(MessageHelper.USER_NOT_FOUND);

    if (comment) {
      return await this.handleCommentLike(comment, req.user, createBody);
    }

    if (post) {
      return await this.handlePostLike(post, req.user, createBody);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const like = await this.likeService.findOne({ id });

    if (!like) throw new NotFoundException(MessageHelper.LIKE_NOT_FOUND);

    return like;
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const like = await this.likeService.findOne({ id });

    if (!like) throw new NotFoundException(MessageHelper.LIKE_NOT_FOUND);

    return await this.likeService.remove({ id });
  }

  private provideCommentOrPostException(comment, post) {
    if (comment && post)
      throw new BadRequestException(MessageHelper.COMMENT_OR_POST_PROVIDE);
  }

  private invalidCommentAndPostException(comment, post) {
    if (!comment && !post)
      throw new BadRequestException(MessageHelper.COMMENT_AND_POST_INVALID);
  }

  private async commentHasLike(
    user: UserEntity,
    commentId: Prisma.CommentCreateNestedOneWithoutLikeInput,
  ) {
    return await db.comment.findFirst({
      where: {
        id: Number(commentId),
        like: { some: { user: { email: user?.email } } },
      },
      select: { id: true },
    });
  }

  private async postHasLike(
    user: UserEntity,
    postId: Prisma.PostCreateNestedOneWithoutLikeInput,
  ) {
    return await db.post.findFirst({
      where: {
        id: Number(postId),
        like: { some: { user: { email: user?.email } } },
      },
      select: { id: true },
    });
  }

  private async handleCommentLike(
    comment: Prisma.CommentCreateNestedOneWithoutLikeInput,
    user: { email: string },
    createBody: CreateLikeDto,
  ) {
    if (await this.commentHasLike(user, comment)) {
      return null;
    }

    const commentEntity = await this.commentService.findOne({
      id: Number(comment),
    });

    if (!commentEntity)
      throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

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
    post: Prisma.PostCreateNestedOneWithoutLikeInput,
    user: { email: string },
    createBody: CreateLikeDto,
  ) {
    if (await this.postHasLike(user, post)) {
      return null;
    }

    const postEntity = await this.postService.findOne({ id: Number(post) });

    if (!postEntity) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

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
