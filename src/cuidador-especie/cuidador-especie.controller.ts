import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CuidadorEspecieService } from './cuidador-especie.service';
import { CreateCuidadorEspecieDto } from './dto/create-cuidador-especie.dto';
import { UpdateCuidadorEspecieDto } from './dto/update-cuidador-especie.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/role.enum';
import { DeleteRestoreCuidadorEspecieDto } from './dto/delete-restore-cuidador-especie-dto';

@Auth(Role.Admin)
@Controller('cuidador-especie')
export class CuidadorEspecieController {
  constructor(private readonly cuidadorEspecieService: CuidadorEspecieService) {}

  @Post()
  create(@Body() createCuidadorEspecieDto: CreateCuidadorEspecieDto): Promise<{ message: string}> {
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

  @Patch()
  update( @Body() updateCuidadorEspecieDto: UpdateCuidadorEspecieDto): Promise<{ message: string}> {
    return this.cuidadorEspecieService.update( updateCuidadorEspecieDto);
  }

  @Delete()
  remove(@Body() deleteCuidadorEspecieDto: DeleteRestoreCuidadorEspecieDto): Promise<{ message: string}> {
    return this.cuidadorEspecieService.remove(deleteCuidadorEspecieDto); 
  }

  @Put('/activate')
  restore(@Body() restoreCuidadorEspecieDto: DeleteRestoreCuidadorEspecieDto): Promise<{ message: string}> {
    return this.cuidadorEspecieService.restore(restoreCuidadorEspecieDto);
  }
  
}
