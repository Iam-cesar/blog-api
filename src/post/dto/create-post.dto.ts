import { IsNotEmpty, Length } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreatePostDto {
  @Length(4, 255)
  title: string;

  @IsNotEmpty()
  content: string;

  published?: boolean;

  author: Prisma.UserCreateNestedOneWithoutPostInput;

  deleted?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  comment?: Prisma.CommentCreateNestedManyWithoutPostInput;
  like?: Prisma.LikeCreateNestedManyWithoutPostInput;
  category?: Prisma.CategoryCreateNestedManyWithoutPostInput;
}
