import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(@Body() data: CreateProfileDto) {
    return this.profileService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProfileDto) {
    return this.profileService.update({ where: { id: Number(id) }, data });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove({ id: Number(id) });
  }
}
