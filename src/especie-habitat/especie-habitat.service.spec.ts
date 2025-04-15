import { Test, TestingModule } from '@nestjs/testing';
import { EspecieHabitatService } from './especie-habitat.service';

describe('EspecieHabitatService', () => {
  let service: EspecieHabitatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EspecieHabitatService],
    }).compile();

    service = module.get<EspecieHabitatService>(EspecieHabitatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
