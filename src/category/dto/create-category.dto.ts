import { IsEmpty, Length } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateCategoryDto {
  @ApiProperty()
  @Length(4, 64)
  name: string;

  @ApiPropertyOptional()
  post?:
    | Prisma.PostCreateNestedOneWithoutCategoryInput
    | Prisma.PostUpdateOneWithoutCategoryNestedInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
