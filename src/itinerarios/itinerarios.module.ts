import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Itinerario } from './entities/itinerario.entity';
import { ItinerarioZonaModule } from '../itinerario-zona/itinerario-zona.module';
import { GuiaItinerarioModule } from '../guia-itinerario/guia-itinerario.module';
import { ItinerariosController } from './itinerarios.controller';
import { ItinerariosService } from './itinerarios.service';
import { ZonasModule } from '../zonas/zonas.module';
import { EmpleadosModule } from '../empleados/empleados.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Itinerario, ]),
    ZonasModule,
    EmpleadosModule,
    // Para las uniones de uno a muchos
    ItinerarioZonaModule,
    GuiaItinerarioModule,
  ],
  controllers: [ItinerariosController],
  providers: [ItinerariosService],
  exports: [TypeOrmModule]
})
export class ItinerariosModule { }