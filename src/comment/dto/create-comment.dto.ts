import { IsNotEmpty, IsOptional, Length } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateCommentDto {
  @Length(4, 240)
  @ApiProperty()
  content: string;

  @IsOptional()
  user: Prisma.UserCreateNestedOneWithoutCommentInput;

  @IsNotEmpty()
  @ApiProperty()
  post: Prisma.PostCreateNestedOneWithoutCommentInput;

  @ApiPropertyOptional()
  @IsOptional()
  like?: Prisma.LikeCreateNestedManyWithoutCommentInput;

  @IsOptional()
  createdAt?: string | Date;

  @IsOptional()
  updatedAt?: string | Date;
}
