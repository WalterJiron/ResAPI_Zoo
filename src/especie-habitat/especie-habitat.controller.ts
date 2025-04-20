import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { EspecieHabitatService } from './especie-habitat.service';
import { CreateEspecieHabitatDto } from './dto/create-especie-habitat.dto';
import { UpdateEspecieHabitatDto } from './dto/update-especie-habitat.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { DeleteRestoreEspecieHabitatDto } from './dto/delete-restore-especie-habitad-dto';

@Auth(Role.Admin)
@Controller('especi-habitat')
export class EspecieHabitatController {
  constructor(private readonly especieHabitatService: EspecieHabitatService) {}

  @Post()
  create(@Body() createEspecieHabitatDto: CreateEspecieHabitatDto) {
    return this.especieHabitatService.create(createEspecieHabitatDto);
  }

  @Get()
  findAll() {
    return this.especieHabitatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especieHabitatService.findOne(id);
  }

  @Patch()
  update( @Body() updateEspecieHabitatDto: UpdateEspecieHabitatDto) {
    return this.especieHabitatService.update(updateEspecieHabitatDto);
  }

  @Delete()
  remove(@Body() deleteEspecieHabitatDto: DeleteRestoreEspecieHabitatDto){
    return this.especieHabitatService.remove(deleteEspecieHabitatDto);
  }
  

  @Put('/activate')
  restore(@Body() RestoreEspecieHabitatDto: DeleteRestoreEspecieHabitatDto) {
    return this.especieHabitatService.restore(RestoreEspecieHabitatDto);
  }
}
