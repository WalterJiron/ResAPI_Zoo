import { Module } from '@nestjs/common';
import { EspecieService } from './especie.service';
import { EspecieController } from './especie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especie } from './entities/especie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Especie])],
  controllers: [EspecieController],
  providers: [EspecieService],
})
export class EspecieModule {}
