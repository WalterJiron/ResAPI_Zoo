import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Habitat } from './entities/habitat.entity';
import { HabitatContinenteModule } from '../habitat-continente/habitat-continente.module';
import { EspecieHabitatModule } from '../especie-habitat/especie-habitat.module';
import { HabitatsService } from './habitats.service';
import { HabitatsController } from './habitats.controller';
import { ZonasModule } from '../zonas/zonas.module';
import { ContinentesModule } from '../continentes/continentes.module';
import { EspecieModule } from '../especie/especie.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Habitat]),
    ZonasModule,
    ContinentesModule,
    EspecieModule,
    EspecieHabitatModule,   // Para las tablas de union 
    HabitatContinenteModule,
  ],
  controllers: [HabitatsController],
  providers: [HabitatsService],
  exports: [TypeOrmModule]
})
export class HabitatsModule {}
