import { Module } from '@nestjs/common';
import { EspecieHabitatService } from './especie-habitat.service';
import { EspecieHabitatController } from './especie-habitat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecieHabitat } from './entities/especie-habitat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EspecieHabitat])],
  controllers: [EspecieHabitatController],
  providers: [EspecieHabitatService],
  exports:[TypeOrmModule],
})
export class EspecieHabitatModule {}
