import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { AsientosService } from './asientos.service';
import { Asiento } from './entities/asiento.entity';
import { CreateAsientoInput } from './dto/create-asiento.input';
import { UpdateAsientoInput } from './dto/update-asiento.input';
import { HttpService } from 'src/http/http.service';

@Resolver(() => Asiento)
export class AsientosResolver {
  constructor(
    private readonly asientosService: AsientosService) {}


  @Query(() => [Asiento], { name: 'asientos' })
  findAll() {
    return this.asientosService.findAll();
  }

  @Query(() => Asiento, { name: 'asiento' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.asientosService.findOne(id);
  }
}
