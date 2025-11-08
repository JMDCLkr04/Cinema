import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FuncionesService } from './funciones.service';
import { Funcione } from './entities/funcione.entity';
import { CreateFuncioneInput } from './dto/create-funcione.input';
import { UpdateFuncioneInput } from './dto/update-funcione.input';

@Resolver(() => Funcione)
export class FuncionesResolver {
  constructor(private readonly funcionesService: FuncionesService) {}

  @Mutation(() => Funcione)
  createFuncione(@Args('createFuncioneInput') createFuncioneInput: CreateFuncioneInput) {
    return this.funcionesService.create(createFuncioneInput);
  }

  @Query(() => [Funcione], { name: 'funciones' })
  findAll() {
    return this.funcionesService.findAll();
  }

  @Query(() => Funcione, { name: 'funcione' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.funcionesService.findOne(id);
  }

  @Mutation(() => Funcione)
  updateFuncione(@Args('updateFuncioneInput') updateFuncioneInput: UpdateFuncioneInput) {
    return this.funcionesService.update(updateFuncioneInput.id, updateFuncioneInput);
  }

  @Mutation(() => Funcione)
  removeFuncione(@Args('id', { type: () => Int }) id: number) {
    return this.funcionesService.remove(id);
  }
}
