import { Module } from '@nestjs/common';
import { HabitatContinenteService } from './habitat-continente.service';
import { HabitatContinenteController } from './habitat-continente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HabitatContinente } from './entities/habitat-continente.entity';

@Module({
  imports:[TypeOrmModule.forFeature([HabitatContinente])],
  controllers: [HabitatContinenteController],
  providers: [HabitatContinenteService],
  exports:[TypeOrmModule],
})
export class HabitatContinenteModule {}
