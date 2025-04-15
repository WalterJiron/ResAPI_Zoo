import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) { }

  @Auth(Role.Admin)
  @Post()
  create(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatsService.create(createHabitatDto);
  }

  @Auth(Role.Admin)
  @Get()
  findAll() {
    return this.habitatsService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatsService.findOne(+id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto) {
    return this.habitatsService.update(+id, updateHabitatDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatsService.remove(+id);
  }
}
