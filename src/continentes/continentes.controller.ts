import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ContinentesService } from './continentes.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(AuthGuard)
@Controller('continentes')
export class ContinentesController {
  constructor(private readonly continentesService: ContinentesService) {}

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get()
  findAll() {
    return this.continentesService.findAll();
  }

  @Throttle({ api: { limit: 100, ttl: 60000 } })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.continentesService.findOne(id);
  }

}
