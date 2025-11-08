import { Test, TestingModule } from '@nestjs/testing';
import { AsientosResolver } from './asientos.resolver';
import { AsientosService } from './asientos.service';

describe('AsientosResolver', () => {
  let resolver: AsientosResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsientosResolver, AsientosService],
    }).compile();

    resolver = module.get<AsientosResolver>(AsientosResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
