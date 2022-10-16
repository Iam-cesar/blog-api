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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from '../category/category.service';
import { updatedAt } from '../helpers/date.helper';
import { FindAllQueryDto } from '../helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../helpers/message.helper';
import { UserService } from '../user/user.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@UseGuards(AuthGuard('jwt'))
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() data: CreatePostDto,
    @Req() req: { user: { email: string } },
  ) {
    if (!req.user)
      throw new BadRequestException(MessageHelper.USER_BAD_REQUEST);

    const user = await this.userService.findOne({ email: req.user.email });

    if (!user) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    const post = await this.postService.create({
      ...data,
      author: { connect: { email: user.email } },
    });

    if (!post)
      throw new BadRequestException(MessageHelper.CATEGORY_BAD_REQUEST);

    return post;
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() query?: FindAllQueryDto) {
    const post = await this.postService.findAll({
      skip: Number(query?.skip) || undefined,
      take: Number(query?.skip) || undefined,
    });

    if (!post) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return post;
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne({ id });

    if (!post) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return post;
  }

  @Post(':id/category/:categoryId')
  async addCategory(
    @Param() params: CreatePostCategoryDto,
    @Body() data: UpdatePostDto,
  ) {
    const { categoryId, id } = params;

    const post = await this.postService.findOne({ id: Number(id) });

    if (!post) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    const category = await this.categoryService.findOne({
      id: Number(categoryId),
    });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.postService.update({
      where: { id: Number(id) },
      data: {
        ...data,
        updatedAt,
        category: { connect: { id: Number(category.id) } },
      },
    });
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePostDto,
  ) {
    const post = await this.postService.findOne({ id });

    if (!post) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.postService.update({
      where: { id },
      data: {
        ...data,
        updatedAt,
      },
    });
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.findOne({ id });

    if (!post) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.postService.remove({ id });
  }

  @Delete(':id/category/:categoryId')
  @HttpCode(200)
  async removeCategory(@Param() params: UpdatePostCategoryDto) {
    const { id, categoryId } = params;

    const post = await this.postService.findOne({ id: Number(id) });

    if (!post) throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    const category = await this.categoryService.findOne({
      id: Number(categoryId),
    });

    if (!category)
      throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

    return await this.postService.update({
      where: { id: Number(id) },
      data: { category: { disconnect: { id: Number(categoryId) } } },
    });
  }
}
