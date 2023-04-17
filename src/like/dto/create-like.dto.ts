import { IsEmpty, IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateLikeDto {
  @ApiPropertyOptional()
  @IsOptional()
  comment?: Prisma.CommentCreateNestedOneWithoutLikeInput;

  @ApiPropertyOptional()
  @IsOptional()
  post?: Prisma.PostCreateNestedOneWithoutLikeInput;

  @IsEmpty()
  user:
    | Prisma.UserCreateNestedOneWithoutLikeInput
    | Prisma.UserUpdateOneRequiredWithoutLikeNestedInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
