import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuidadorEspecieService } from './cuidador-especie.service';
import { CreateCuidadorEspecieDto } from './dto/create-cuidador-especie.dto';
import { UpdateCuidadorEspecieDto } from './dto/update-cuidador-especie.dto';
import { SkipThrottle } from '@nestjs/throttler';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('cuidador-especie')
export class CuidadorEspecieController {
  constructor(private readonly cuidadorEspecieService: CuidadorEspecieService) {}

  @Post()
  create(@Body() createCuidadorEspecieDto: CreateCuidadorEspecieDto) {
    return this.cuidadorEspecieService.create(createCuidadorEspecieDto);
  }

  @Get()
  findAll() {
    return this.cuidadorEspecieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuidadorEspecieService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuidadorEspecieDto: UpdateCuidadorEspecieDto) {
    return this.cuidadorEspecieService.update(+id, updateCuidadorEspecieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuidadorEspecieService.remove(+id);
  }
}
