import { Test, TestingModule } from '@nestjs/testing';
import { ItinerarioZonaController } from './itinerario-zona.controller';
import { ItinerarioZonaService } from './itinerario-zona.service';

describe('ItinerarioZonaController', () => {
  let controller: ItinerarioZonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItinerarioZonaController],
      providers: [ItinerarioZonaService],
    }).compile();

    controller = module.get<ItinerarioZonaController>(ItinerarioZonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
