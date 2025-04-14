import { Test, TestingModule } from '@nestjs/testing';
import { HabitatsController } from './habitats.controller';
import { HabitatsService } from './habitats.service';

describe('HabitatsController', () => {
  let controller: HabitatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitatsController],
      providers: [HabitatsService],
    }).compile();

    controller = module.get<HabitatsController>(HabitatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
