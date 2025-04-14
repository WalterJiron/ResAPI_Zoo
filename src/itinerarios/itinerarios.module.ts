import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerario } from './entities/itinerario.entity';
import { ItinerarioZona } from './entities/itinerario-zona.entity';
import { GuiaItinerario } from './entities/guia-itinerario.entity';
import { ItinerariosController } from './itinerarios.controller';
import { ItinerariosService } from './itinerarios.service';
import { ZonasModule } from '../zonas/zonas.module';
import { EmpleadosModule } from '../empleados/empleados.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerario, ItinerarioZona, GuiaItinerario]),
    ZonasModule,
    EmpleadosModule
  ],
  controllers: [ItinerariosController],
  providers: [ItinerariosService],
  exports: [TypeOrmModule]
})
export class ItinerariosModule { }