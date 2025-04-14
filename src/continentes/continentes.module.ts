import { Module } from '@nestjs/common';
import { ContinentesService } from './continentes.service';
import { ContinentesController } from './continentes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Continente } from './entities/continente.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Continente])],
  controllers: [ContinentesController],
  providers: [ContinentesService],
})
export class ContinentesModule {}
