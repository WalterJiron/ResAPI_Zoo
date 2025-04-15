import {
  Controller, Get, Post,
  Body, Patch, Param, Delete, Put
} from '@nestjs/common';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Controller('especie')
export class EspecieController {
  constructor(
    private readonly especieService: EspecieService
  ) { }

  @Auth(Role.Admin)
  @Post()
  async create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especieService.create(createEspecieDto);
  }

  @Auth(Role.Admin)
  @Get()
  async findAll() {
    return this.especieService.findAll();
  }

  @Auth(Role.Admin)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.especieService.findOne(id);
  }

  @Auth(Role.Admin)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especieService.update(id, updateEspecieDto);
  }

  @Auth(Role.Admin)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.especieService.remove(id);
  }

  @Auth(Role.Admin)
  @Put('/Activate/:id')
  async restore(@Param('id') id: string) {
    return this.especieService.restore(id);
  }
}
