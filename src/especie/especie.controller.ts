import {
  Controller, Get, Post,
  Body, Patch, Param, Delete, Put
} from '@nestjs/common';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/role.enum';
import { Especie } from './entities/especie.entity';

@Auth(Role.Admin)
@Controller('especie')
export class EspecieController {
  constructor(
    private readonly especieService: EspecieService
  ) { }


  @Post()
  async create(@Body() createEspecieDto: CreateEspecieDto): Promise<{ message: string, code?: string }> {
    return this.especieService.create(createEspecieDto);
  }


  @Get()
  async findAll() {
    return this.especieService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string){
    return this.especieService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEspecieDto: UpdateEspecieDto): Promise<{ message: string }> {
    return this.especieService.update(id, updateEspecieDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return this.especieService.remove(id);
  }


  @Put('/activate/:id')
  async restore(@Param('id') id: string): Promise<{ message: string }> {
    return this.especieService.restore(id);
  }
}
