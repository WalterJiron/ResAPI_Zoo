import { 
  Controller, Get, Post, 
  Body, Patch, Param, Delete, 
  UseGuards, Put 
} from '@nestjs/common';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('especie')
export class EspecieController {
  constructor(
    private readonly especieService: EspecieService
  ) { }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Post()
  async create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especieService.create(createEspecieDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  async findAll() {
    return this.especieService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.especieService.findOne(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especieService.update(id, updateEspecieDto);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.especieService.remove(id);
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Put('/Activate/:id')
  async restore(@Param('id') id: string) {
    return this.especieService.restore(id);
  }
}
