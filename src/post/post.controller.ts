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
import { CategoryService } from '../category/category.service';
import { FindAllQueryDto } from '../common/helpers/dto/findAllQuery.dto';
import { MessageHelper } from '../common/helpers/message.helper';
import { exceptionIfPostDontBelongsToUser } from '../common/utils/userPermissionToContent';
import { UserService } from '../user/user.service';
import { CreatePostCategoryDto } from './dto/create-post-category.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostCategoryDto } from './dto/update-post-category.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
@ApiTags('Post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  async create(
    @Body() data: CreatePostDto,
    @Req() req: { user: { email: string } },
  ) {
    try {
      if (!req?.user)
        throw new UnauthorizedException(MessageHelper.UNAUTHORIZED_REQUEST);

      const user = await this.userService.findOne({ email: req.user.email });

      if (!user) throw new NotFoundException(MessageHelper.USER_NOT_FOUND);

      const post = await this.postService.create({
        ...data,
        author: { connect: { email: user.email } },
      });

      if (!post) throw new BadRequestException(MessageHelper.POST_BAD_REQUEST);

      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  @HttpCode(200)
  async findAll(@Query() query?: FindAllQueryDto) {
    try {
      const post = await this.postService.findAll({
        skip: Number(query?.skip) || undefined,
        take: Number(query?.take) || undefined,
      });

      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get('by-author')
  @UseGuards(AuthGuard('jwt'))
  async findAllByAuthor(
    @Req() req: { user: { id: string } },
    @Query() query?: FindAllQueryDto,
  ) {
    try {
      const post = await this.postService.findAllByAuthor(req.user.id, {
        skip: Number(query?.skip) || undefined,
        take: Number(query?.take) || undefined,
      });

      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string) {
    try {
      const post = await this.postService.findOne({ id });

      if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

      return post;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/category/:categoryId')
  async addCategory(
    @Param() params: CreatePostCategoryDto,
    @Req() req: { user: { id: string } },
  ) {
    try {
      const { categoryId, id } = params;

      const post = await this.postService.findOne({ id });

      if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

      exceptionIfPostDontBelongsToUser({ user: req.user, post });

      const category = await this.categoryService.findOne({
        id: categoryId,
      });

      if (!category)
        throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

      return await this.postService.update({
        where: { id },
        data: { category: { connect: { id: category.id } } },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
    @Req() req: { user: { id: string } },
  ) {
    try {
      const post = await this.postService.findOne({ id });

      if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

      exceptionIfPostDontBelongsToUser({ user: req.user, post });

      return await this.postService.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    try {
      const post = await this.postService.findOne({ id });

      if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

      exceptionIfPostDontBelongsToUser({ user: req.user, post });

      return await this.postService.remove({ id });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id/category/:categoryId')
  @HttpCode(200)
  async removeCategory(
    @Param() params: UpdatePostCategoryDto,
    @Req() req: { user: { id: string } },
  ) {
    try {
      const { id, categoryId } = params;

      const post = await this.postService.findOne({ id });

      if (!post) throw new NotFoundException(MessageHelper.POST_NOT_FOUND);

      exceptionIfPostDontBelongsToUser({ user: req.user, post });

      const category = await this.categoryService.findOne({
        id: categoryId,
      });

      if (!category)
        throw new NotFoundException(MessageHelper.CATEGORY_NOT_FOUND);

      return await this.postService.update({
        where: { id },
        data: { category: { disconnect: { id: categoryId } } },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
