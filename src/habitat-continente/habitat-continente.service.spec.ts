import { Test, TestingModule } from '@nestjs/testing';
import { HabitatContinenteService } from './habitat-continente.service';

describe('HabitatContinenteService', () => {
  let service: HabitatContinenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HabitatContinenteService],
    }).compile();

    service = module.get<HabitatContinenteService>(HabitatContinenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
