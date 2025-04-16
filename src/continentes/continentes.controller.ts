import { Controller, Get, Param } from '@nestjs/common';
import { ContinentesService } from './continentes.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Auth(Role.Admin)
@Controller('continentes')
export class ContinentesController {
  constructor(private readonly continentesService: ContinentesService) {}

  @Get()
  findAll() {
    return this.continentesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.continentesService.findOne(id);
  }

}
