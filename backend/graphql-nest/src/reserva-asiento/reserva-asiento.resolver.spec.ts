import { Test, TestingModule } from '@nestjs/testing';
import { ReservaAsientoResolver } from './reserva-asiento.resolver';
import { ReservaAsientoService } from './reserva-asiento.service';

describe('ReservaAsientoResolver', () => {
  let resolver: ReservaAsientoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservaAsientoResolver, ReservaAsientoService],
    }).compile();

    resolver = module.get<ReservaAsientoResolver>(ReservaAsientoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
