import { Test, TestingModule } from '@nestjs/testing';
import { FacturasResolver } from './facturas.resolver';
import { FacturasService } from './facturas.service';

describe('FacturasResolver', () => {
  let resolver: FacturasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacturasResolver, FacturasService],
    }).compile();

    resolver = module.get<FacturasResolver>(FacturasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
