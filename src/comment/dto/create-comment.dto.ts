import { IsNotEmpty, IsOptional, Length } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreateCommentDto {
  @Length(4, 240)
  content: string;

  @IsOptional()
  user: Prisma.UserCreateNestedOneWithoutCommentInput;

  @IsNotEmpty()
  post: Prisma.PostCreateNestedOneWithoutCommentInput;

  @IsOptional()
  like?: Prisma.LikeCreateNestedManyWithoutCommentInput;

  @IsOptional()
  createdAt?: string | Date;

  @IsOptional()
  updatedAt?: string | Date;
}
