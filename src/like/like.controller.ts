import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from 'src/comment/comment.service';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
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
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() data: CreateLikeDto,
    @Req() req: { user: { email: string } },
  ) {
    const { post, comment } = data;
    const createBody = data;

    const user = await this.userService.findOne({ email: req.user.email });

    if (!!post) {
      const postEntity = await this.postService.findOne({ id: Number(post) });
      Object.assign(createBody, { post: { connect: { id: postEntity.id } } });
    }

    if (!!comment) {
      const commentEntity = await this.commentService.findOne({
        id: Number(comment),
      });

      Object.assign(createBody, {
        comment: { connect: { id: commentEntity.id } },
      });
    }

    return this.likeService.create({
      ...createBody,
      user: { connect: { email: user.email } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.likeService.findOne({ id: Number(id) });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.likeService.remove({ id: Number(id) });
  }
}
