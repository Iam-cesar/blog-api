import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreatePostCategoryDto } from './create-post-category.dto';

export class UpdatePostCategoryDto implements Partial<CreatePostCategoryDto> {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  categoryId: string;
}
