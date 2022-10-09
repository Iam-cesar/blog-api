import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Post()
  async create(
    @Body() data: CreateCommentDto,
    @Req() req: { user: { email: string } },
  ) {
    const { post: postId } = data;
    const user = await this.userService.findOne({ email: req?.user?.email });
    if (!user) throw new UnauthorizedException();

    const post = await this.postService.findOne({ id: Number(postId) });
    if (!post) throw new NotFoundException();

    return this.commentsService.create({
      ...data,
      user: { connect: { id: user?.id } },
      post: { connect: { id: post?.id } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.commentsService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCommentDto) {
    return this.commentsService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove({ id: Number(id) });
  }
}
