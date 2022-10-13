import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  Length,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreatePostDto {
  @ApiProperty()
  @Length(4, 255)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @ApiPropertyOptional({ default: false })
  published?: boolean;

  @IsEmpty()
  author: Prisma.UserCreateNestedOneWithoutPostInput;

  @IsOptional()
  @ApiPropertyOptional({ default: false })
  deleted?: boolean;

  @IsOptional()
  createdAt?: string | Date;

  @IsOptional()
  updatedAt?: string | Date;

  @IsOptional()
  @ApiPropertyOptional()
  comment?: Prisma.CommentCreateNestedManyWithoutPostInput;

  @IsOptional()
  @ApiPropertyOptional()
  like?: Prisma.LikeCreateNestedManyWithoutPostInput;

  @IsOptional()
  @ApiPropertyOptional()
  category?:
    | Prisma.CategoryCreateNestedManyWithoutPostInput
    | Prisma.CategoryUpdateManyWithoutPostNestedInput;
}
