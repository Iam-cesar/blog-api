import { IsEmpty, IsNumber, IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateLikeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  comment?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
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
