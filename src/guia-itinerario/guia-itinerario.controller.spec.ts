import { Test, TestingModule } from '@nestjs/testing';
import { GuiaItinerarioController } from './guia-itinerario.controller';
import { GuiaItinerarioService } from './guia-itinerario.service';

describe('GuiaItinerarioController', () => {
  let controller: GuiaItinerarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuiaItinerarioController],
      providers: [GuiaItinerarioService],
    }).compile();

    controller = module.get<GuiaItinerarioController>(GuiaItinerarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
