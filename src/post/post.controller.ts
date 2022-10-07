import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(
    private postService: PostService,
    private userService: UserService,
  ) {}

  @Post()
  async create(
    @Body() data: CreatePostDto,
    @Req() req: { user: { email: string } },
  ) {
    // create post logic
    const user = await this.userService.findOne({ email: req.user.email });
    return this.postService.create({
      ...data,
      author: { connect: { email: user.email } },
    });
  }

  @Get()
  findAll(
    @Query()
    query?: {
      skip?: string;
      take?: string;
    },
  ) {
    return this.postService.findAll({
      skip: Number(query.skip) || undefined,
      take: Number(query.skip) || undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove({ id: Number(id) });
  }
}
