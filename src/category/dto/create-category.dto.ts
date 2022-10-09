import { Length } from '@nestjs/class-validator';
import { Prisma } from '@prisma/client';

export class CreateCategoryDto {
  @Length(4, 64)
  name: string;

  post?:
    | Prisma.PostCreateNestedOneWithoutCategoryInput
    | Prisma.PostUpdateOneWithoutCategoryNestedInput;

  createdAt?: string | Date;
  updatedAt?: string | Date;
}
