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
import { CategoryService } from 'src/category/category.service';
import { updatedAt } from 'src/helpers/date.helper';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  async create(
    @Body() data: CreatePostDto,
    @Req() req: { user: { email: string } },
  ) {
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

  @Post(':id/category/:categoryId')
  async addCategory(
    @Param() params: { id: string; categoryId: string },
    @Body() data: UpdatePostDto,
  ) {
    const { categoryId, id } = params;

    const category = await this.categoryService.findOne({
      id: Number(categoryId),
    });

    return this.postService.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt,
        category: { connect: { id: category.id } },
      },
    });
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postService.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt,
      },
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove({ id: Number(id) });
  }

  @Delete(':id/category/:categoryId')
  async removeCategory(@Param() params: { id: string; categoryId: string }) {
    const { id, categoryId } = params;

    return this.postService.update({
      where: { id: Number(id) },
      data: { category: { disconnect: { id: Number(categoryId) } } },
    });
  }
}
