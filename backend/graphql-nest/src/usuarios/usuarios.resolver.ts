import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Usuario } from './entities/usuario.entity';
import { UsuariosService } from './usuarios.service';


@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private httpServices:UsuariosService) {}
  @Query(() => [Usuario], { name: 'usuarios' })
  findAll() {
    return this.httpServices.findAll();
  }

  @Query(() => Usuario, { name: 'usuario' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.httpServices.findOne(id);
  }
}
