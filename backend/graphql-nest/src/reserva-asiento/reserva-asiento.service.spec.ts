import { Test, TestingModule } from '@nestjs/testing';
import { ReservaAsientoService } from './reserva-asiento.service';

describe('ReservaAsientoService', () => {
  let service: ReservaAsientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaAsientoService],
    }).compile();

    service = module.get<ReservaAsientoService>(ReservaAsientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
