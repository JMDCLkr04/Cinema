import { Test, TestingModule } from '@nestjs/testing';
import { FuncionesResolver } from './funciones.resolver';
import { FuncionesService } from './funciones.service';

describe('FuncionesResolver', () => {
  let resolver: FuncionesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionesResolver, FuncionesService],
    }).compile();

    resolver = module.get<FuncionesResolver>(FuncionesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
