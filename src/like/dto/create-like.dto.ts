import { IsEmpty, IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateLikeDto {
  @ApiPropertyOptional()
  @IsOptional()
  comment?: number;

  @ApiPropertyOptional()
  @IsOptional()
  post?: number;

  @IsEmpty()
  user:
    | Prisma.UserCreateNestedOneWithoutLikeInput
    | Prisma.UserUpdateOneRequiredWithoutLikeNestedInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
