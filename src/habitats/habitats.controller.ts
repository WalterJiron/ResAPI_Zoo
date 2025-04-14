import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { CreateHabitatDto } from './dto/create-habitat.dto';
import { UpdateHabitatDto } from './dto/update-habitat.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('habitats')
export class HabitatsController {
  constructor(private readonly habitatsService: HabitatsService) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  create(@Body() createHabitatDto: CreateHabitatDto) {
    return this.habitatsService.create(createHabitatDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.habitatsService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.habitatsService.findOne(+id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHabitatDto: UpdateHabitatDto) {
    return this.habitatsService.update(+id, updateHabitatDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.habitatsService.remove(+id);
  }
}
