import { Module } from '@nestjs/common';
import { GuiaItinerarioService } from './guia-itinerario.service';
import { GuiaItinerarioController } from './guia-itinerario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuiaItinerario } from './entities/guia-itinerario.entity';

@Module({
  imports:[TypeOrmModule.forFeature([GuiaItinerario])],
  controllers: [GuiaItinerarioController],
  providers: [GuiaItinerarioService],
  exports:[TypeOrmModule],
})
export class GuiaItinerarioModule {}
