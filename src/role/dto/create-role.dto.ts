import {
  IsBoolean,
  IsEmpty,
  IsOptional,
  Length,
} from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateRoleDto {
  @ApiProperty()
  @IsOptional()
  @Length(4, 64)
  name: string;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canCreatePost: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canUpdatePost: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canDeletePost: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canSoftDeletePost: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canCreateUser: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canUpdateUser: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canDeleteUser: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canSoftDeleteUser: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canLikeUser: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiPropertyOptional({ default: false })
  canLikePost: boolean;

  @IsOptional()
  user?:
    | Prisma.UserCreateNestedManyWithoutRoleInput
    | Prisma.UserUpdateManyWithWhereWithoutRoleInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
