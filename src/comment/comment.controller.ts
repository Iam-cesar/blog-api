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
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { MessageHelper } from '../common/helpers/message.helper';
import { PostService } from '../post/post.service';
import { UserService } from '../user/user.service';
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
  @HttpCode(201)
  @ApiTags('Comment')
  async create(
    @Body() data: CreateCommentDto,
    @Req() req: { user: { email: string } },
  ) {
    const { post: postId } = data;

    const user = await this.userService.findOne({ email: req.user?.email });

    if (!user) throw new UnauthorizedException(MessageHelper.USER_NOT_FOUND);

    const post = await this.postService.findOne({ id: Number(postId) });

    if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

    const comment = await this.CommentService.create({
      ...data,
      user: { connect: { id: user.id } },
      post: { connect: { id: post.id } },
    });

    if (!comment)
      throw new BadRequestException(MessageHelper.COMMENT_BAD_REQUEST);

    return comment;
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.CommentService.findOne({ id });

    if (!comment) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    return comment;
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateCommentDto,
  ) {
    const comment = await this.CommentService.findOne({ id });

    if (!comment) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    return await this.CommentService.update({
      where: { id },
      data,
    });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.CommentService.findOne({ id });

    if (!comment) throw new NotFoundException(MessageHelper.COMMENT_NOT_FOUND);

    return await this.CommentService.remove({ id });
  }
}
