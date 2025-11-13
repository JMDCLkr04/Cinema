import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import { HttpServices } from 'src/http/http.service';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private httpServices:HttpServices) {}
  @Query(() => [Usuario], { name: 'usuarios' })
    findAll() {
      return this.httpServices.findAllUsers();
    }

    @Query(() => Usuario, { name: 'usuario' })
    findOne(@Args('id', { type: () => Int }) id: string) {
      return this.httpServices.findOneUser(id);
    }

    @ResolveField(() => [Usuario])
    async usuarios(@Parent() incidencia: Incidencia) {
      const usuariosPorIncidencia = await this.httpServices.findAllUsers();
      return usuariosPorIncidencia.filter(u => u.id_usuario === incidencia.id_incidencia);
    }
}
