import { IsBoolean, IsEmpty, Length } from '@nestjs/class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateRoleDto {
  @ApiProperty()
  @Length(4, 64)
  name: string;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canCreatePost: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canUpdatePost: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canDeletePost: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canSoftDeletePost: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canCreateUser: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canUpdateUser: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canDeleteUser: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canSoftDeleteUser: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canLikeUser: boolean;

  @IsBoolean()
  @ApiPropertyOptional({ default: false })
  canLikePost: boolean;

  @IsEmpty()
  user?: Prisma.UserCreateNestedManyWithoutRoleInput;

  @IsEmpty()
  createdAt?: string | Date;

  @IsEmpty()
  updatedAt?: string | Date;
}
