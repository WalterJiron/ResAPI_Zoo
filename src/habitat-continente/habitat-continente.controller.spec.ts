import { Test, TestingModule } from '@nestjs/testing';
import { HabitatContinenteController } from './habitat-continente.controller';
import { HabitatContinenteService } from './habitat-continente.service';

describe('HabitatContinenteController', () => {
  let controller: HabitatContinenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitatContinenteController],
      providers: [HabitatContinenteService],
    }).compile();

    controller = module.get<HabitatContinenteController>(HabitatContinenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
