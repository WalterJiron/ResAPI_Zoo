import { Test, TestingModule } from '@nestjs/testing';
import { GuiaItinerarioService } from './guia-itinerario.service';

describe('GuiaItinerarioService', () => {
  let service: GuiaItinerarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuiaItinerarioService],
    }).compile();

    service = module.get<GuiaItinerarioService>(GuiaItinerarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
