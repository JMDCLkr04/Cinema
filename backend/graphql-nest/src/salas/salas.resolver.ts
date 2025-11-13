import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SalasService } from './salas.service';
import { Sala } from './entities/sala.entity';
import { CreateSalaInput } from './dto/create-sala.input';
import { UpdateSalaInput } from './dto/update-sala.input';

@Resolver(() => Sala)
export class SalasResolver {
  constructor(private readonly salasService: SalasService) {}

  @Mutation(() => Sala)
  createSala(@Args('createSalaInput') createSalaInput: CreateSalaInput) {
    return this.salasService.create(createSalaInput);
  }

  @Query(() => [Sala], { name: 'salas' })
  findAll() {
    return this.salasService.findAll();
  }

  @Query(() => Sala, { name: 'sala' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salasService.findOne(id);
  }

  @Mutation(() => Sala)
  updateSala(@Args('updateSalaInput') updateSalaInput: UpdateSalaInput) {
    return this.salasService.update(updateSalaInput.id, updateSalaInput);
  }

  @Mutation(() => Sala)
  removeSala(@Args('id', { type: () => Int }) id: number) {
    return this.salasService.remove(id);
  }
}
