import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) { }

  @Post()
  create(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatsService.create(createHabitatDto);
  }

  @Get()
  findAll() {
    return this.habitatsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto) {
    return this.habitatsService.update(+id, updateHabitatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatsService.remove(+id);
  }
}
