import { Test, TestingModule } from '@nestjs/testing';
import { ItinerarioZonaService } from './itinerario-zona.service';

describe('ItinerarioZonaService', () => {
  let service: ItinerarioZonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItinerarioZonaService],
    }).compile();

    service = module.get<ItinerarioZonaService>(ItinerarioZonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
