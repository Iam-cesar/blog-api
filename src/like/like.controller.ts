import {
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
import { CreateLikeDto } from './dto/create-like.dto';
import { LikeHelper } from './like.helper';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController extends LikeHelper {
  constructor(
    protected readonly likeService: LikeService,
    protected readonly userService: UserService,
    protected readonly postService: PostService,
    protected readonly commentService: CommentService,
  ) {
    super();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @ApiTags('Like')
  async create(
    @Body() data: CreateLikeDto,
    @Req() req: { user: { email: string; id: string } },
  ) {
    const { post: postId, comment: commentId } = data;
    const createBody = data;

    this.invalidCommentAndPostException({
      commentId,
      postId,
    });

    this.provideCommentOrPostException({
      commentId,
      postId,
    });

    const user = await this.userService.findByEmailWithPassword({
      email: req.user.email,
    });

    if (!user) throw new UnauthorizedException(MessageHelper.USER_NOT_FOUND);

    if (commentId) {
      return await this.handleCommentLike({
        commentId,
        user: req.user,
        createBody,
      });
    }

    if (postId) {
      return await this.handlePostLike({
        postId,
        user: req.user,
        createBody,
      });
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    const like = await this.likeService.findOne({ id });

    if (!like) throw new NotFoundException(MessageHelper.LIKE_NOT_FOUND);

    return like;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string) {
    const like = await this.likeService.findOne({ id });

    if (!like) throw new NotFoundException(MessageHelper.LIKE_NOT_FOUND);

    return await this.likeService.remove({ id });
  }
}
