import { Module } from '@nestjs/common';
import { ItinerarioZonaService } from './itinerario-zona.service';
import { ItinerarioZonaController } from './itinerario-zona.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItinerarioZona } from './entities/itinerario-zona.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ItinerarioZona])],
  controllers: [ItinerarioZonaController],
  providers: [ItinerarioZonaService],
  exports:[TypeOrmModule],
})
export class ItinerarioZonaModule {}
