import { IsNotEmpty, IsOptional, Length } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreatePostDto {
  @Length(4, 255)
  title: string;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  published?: boolean;

  author: Prisma.UserCreateNestedOneWithoutPostInput;

  @IsOptional()
  deleted?: boolean;

  @IsOptional()
  createdAt?: string | Date;

  @IsOptional()
  updatedAt?: string | Date;

  @IsOptional()
  comment?: Prisma.CommentCreateNestedManyWithoutPostInput;

  @IsOptional()
  like?: Prisma.LikeCreateNestedManyWithoutPostInput;

  @IsOptional()
  category?:
    | Prisma.CategoryCreateNestedManyWithoutPostInput
    | Prisma.CategoryUpdateManyWithoutPostNestedInput;
}
