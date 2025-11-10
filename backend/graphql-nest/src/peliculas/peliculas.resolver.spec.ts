import { Test, TestingModule } from '@nestjs/testing';
import { PeliculasResolver } from './peliculas.resolver';
import { PeliculasService } from './peliculas.service';

describe('PeliculasResolver', () => {
  let resolver: PeliculasResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PeliculasResolver, PeliculasService],
    }).compile();

    resolver = module.get<PeliculasResolver>(PeliculasResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
