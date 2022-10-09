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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(
    private readonly CommentService: CommentService,
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

    return this.CommentService.create({
      ...data,
      user: { connect: { id: user?.id } },
      post: { connect: { id: post?.id } },
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.CommentService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCommentDto) {
    return this.CommentService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.CommentService.remove({ id: Number(id) });
  }
}
