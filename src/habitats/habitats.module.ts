import { Module } from '@nestjs/common';
import { HabitatsService } from './habitats.service';
import { HabitatsController } from './habitats.controller';

@Module({
  controllers: [HabitatsController],
  providers: [HabitatsService],
})
export class HabitatsModule {}
