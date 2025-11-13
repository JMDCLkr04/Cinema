import { Test, TestingModule } from '@nestjs/testing';
import { SalasResolver } from './salas.resolver';
import { SalasService } from './salas.service';

describe('SalasResolver', () => {
  let resolver: SalasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalasResolver, SalasService],
    }).compile();

    resolver = module.get<SalasResolver>(SalasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
