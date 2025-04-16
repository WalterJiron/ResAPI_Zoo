import { Test, TestingModule } from '@nestjs/testing';
import { CuidadorEspecieController } from './cuidador-especie.controller';
import { CuidadorEspecieService } from './cuidador-especie.service';

describe('CuidadorEspecieController', () => {
  let controller: CuidadorEspecieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuidadorEspecieController],
      providers: [CuidadorEspecieService],
    }).compile();

    controller = module.get<CuidadorEspecieController>(CuidadorEspecieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
