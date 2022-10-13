import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostCategoryDto } from './create-post-category.dto';

export class UpdatePostCategoryDto implements Partial<CreatePostCategoryDto> {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: number;
}
