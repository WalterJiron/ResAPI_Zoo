import { Module } from '@nestjs/common';
import { CuidadorEspecieService } from './cuidador-especie.service';
import { CuidadorEspecieController } from './cuidador-especie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuidadorEspecie } from './entities/cuidador-especie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuidadorEspecie])],
  controllers: [CuidadorEspecieController],
  providers: [CuidadorEspecieService],
  exports: [TypeOrmModule],
})
export class CuidadorEspecieModule {}
