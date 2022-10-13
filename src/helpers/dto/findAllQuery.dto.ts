import { IsOptional } from '@nestjs/class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindAllQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  skip?: number;

  @ApiPropertyOptional()
  @IsOptional()
  take?: number;
}
