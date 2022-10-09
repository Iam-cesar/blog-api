import { IsEmpty } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @IsEmpty()
  post: Prisma.PostCreateNestedOneWithoutCommentInput;
}
