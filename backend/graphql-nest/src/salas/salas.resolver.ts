import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Sala } from './entities/sala.entity';
import { UpdateSalaInput } from './dto/update-sala.input';
import { HttpServices } from 'src/http/http.service';

@Resolver(() => Sala)
export class SalasResolver {
  constructor(private readonly httpServices:HttpServices) {}

  @Query(() => [Sala], { name: 'salas' })
  findAll() {
    return this.httpServices.findAllSalas();
  }

  @Query(() => Sala, { name: 'sala' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.httpServices.findOneSala(id.toString());
  }
}
