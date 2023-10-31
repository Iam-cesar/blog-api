import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { FindAllQueryDto } from '../common/helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../common/helpers/message.helper';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IReqUserProps } from './types';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @ApiTags('Comment')
  async create(
    @Body() data: CreateCommentDto,
    @Req() req: { user: IReqUserProps },
  ) {
    const { post: postId, commentId } = data;

    const user = await this.userService.findOne({
      email: req.user?.email,
      id: req.user?.id,
    });

    if (!user) throw new UnauthorizedException(MessageHelper.USER_NOT_FOUND);

    const post = await this.postService.findOne({ id: postId as string });

    if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);
    delete data.commentId;

    if (!!commentId) await this.createReply({ commentId, data, post, user });

    const comment = await this.commentService.create({
      ...data,
      user: { connect: { id: user.id } },
      post: { connect: { id: post.id } },
    });

    if (!comment)
      throw new BadRequestException(MessageHelper.COMMENT_BAD_REQUEST);

    return comment;
  }

  private async createReply({ commentId, data, user, post }) {
    const comment = await this.commentService.update({
      data: {
        replys: {
          create: {
            ...data,
            user: { connect: { id: user.id } },
            post: { connect: { id: post.id } },
          },
        },
      },
      where: { id: commentId },
    });

    if (!comment)
      throw new BadRequestException(MessageHelper.COMMENT_BAD_REQUEST);

    return comment;
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const comment = await this.commentService.findOne({ id });

    if (!comment) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    return comment;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('post/:postId')
  @HttpCode(200)
  async findAllByPost(
    @Param('postId') postId: string,
    @Query() query?: FindAllQueryDto,
  ) {
    if (!postId) {
      return new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);
    }

    const post = await this.commentService.findAllByPost(
      { post: { id: postId } },
      {
        skip: Number(query?.skip) || undefined,
        take: Number(query?.take) || undefined,
      },
    );

    return post;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.CommentCreateInput,
  ) {
    const comment = await this.commentService.findOne({ id });

    if (!comment) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    return await this.commentService.update({
      where: { id },
      data,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const comment = await this.commentService.findOne({ id });

    if (!comment) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    return await this.commentService.remove({ id });
  }
}
