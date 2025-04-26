import { Test, TestingModule } from '@nestjs/testing';
import { DetalleEmpleadoService } from './detalle-empleado.service';

describe('DetalleEmpleadoService', () => {
  let service: DetalleEmpleadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DetalleEmpleadoService],
    }).compile();

    service = module.get<DetalleEmpleadoService>(DetalleEmpleadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
