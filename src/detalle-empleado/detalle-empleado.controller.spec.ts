import { Test, TestingModule } from '@nestjs/testing';
import { DetalleEmpleadoController } from './detalle-empleado.controller';
import { DetalleEmpleadoService } from './detalle-empleado.service';

describe('DetalleEmpleadoController', () => {
  let controller: DetalleEmpleadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DetalleEmpleadoController],
      providers: [DetalleEmpleadoService],
    }).compile();

    controller = module.get<DetalleEmpleadoController>(DetalleEmpleadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
