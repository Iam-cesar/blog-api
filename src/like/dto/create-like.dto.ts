import { IsEmpty, IsOptional } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreateLikeDto {
  @IsOptional()
  comment?:
    | Prisma.CommentCreateNestedOneWithoutLikeInput
    | Prisma.CommentUpdateOneWithoutLikeNestedInput;

  @IsOptional()
  post?:
    | Prisma.PostCreateNestedOneWithoutLikeInput
    | Prisma.PostUpdateOneWithoutLikeNestedInput;

  @IsEmpty()
  user:
    | Prisma.UserCreateNestedOneWithoutLikeInput
    | Prisma.UserUpdateOneRequiredWithoutLikeNestedInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
