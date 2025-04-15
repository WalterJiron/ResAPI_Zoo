import { Test, TestingModule } from '@nestjs/testing';
import { EspecieHabitatController } from './especie-habitat.controller';
import { EspecieHabitatService } from './especie-habitat.service';

describe('EspecieHabitatController', () => {
  let controller: EspecieHabitatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspecieHabitatController],
      providers: [EspecieHabitatService],
    }).compile();

    controller = module.get<EspecieHabitatController>(EspecieHabitatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
