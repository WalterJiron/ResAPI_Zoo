import { Test, TestingModule } from '@nestjs/testing';
import { CuidadorEspecieService } from './cuidador-especie.service';

describe('CuidadorEspecieService', () => {
  let service: CuidadorEspecieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuidadorEspecieService],
    }).compile();

    service = module.get<CuidadorEspecieService>(CuidadorEspecieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
