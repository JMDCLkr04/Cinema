import { Resolver, Query, Mutation, Args, Int, Parent, ResolveField } from '@nestjs/graphql';
import { IncidenciasService } from './incidencias.service';
import { Incidencia } from './entities/incidencia.entity';
import { CreateIncidenciaInput } from './dto/create-incidencia.input';
import { UpdateIncidenciaInput } from './dto/update-incidencia.input';
import { HttpServices } from 'src/http/http.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Resolver(() => Incidencia)
export class IncidenciasResolver {
  constructor(private httpServices: HttpServices) {}


  @Query(() => [Incidencia], { name: 'incidencias' })
  findAll() {
    return this.httpServices.findAllIncidencias();
  }

  @Query(() => Incidencia, { name: 'incidencia' })
  findOne(@Args('id', { type: () => Int }) id: string) {
    return this.httpServices.findOneIncidencia(id);
  }

  @ResolveField(() => [Usuario])
  async usuarios(@Parent() incidencia: Incidencia) {
    const usuariosPorIncidencia = await this.httpServices.findAllUsers();
    return usuariosPorIncidencia.filter(u => u.id_usuario === incidencia.id_incidencia);
  }
}