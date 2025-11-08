import { join } from 'path';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AsientosModule } from './asientos/asientos.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { SalasModule } from './salas/salas.module';
import { FuncionesModule } from './funciones/funciones.module';
import { ReservasModule } from './reservas/reservas.module';
import { ReservaAsientoModule } from './reserva-asiento/reserva-asiento.module';
import { FacturasModule } from './facturas/facturas.module';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    }),
    AsientosModule,
    UsuariosModule,
    PeliculasModule,
    SalasModule,
    FuncionesModule,
    ReservasModule,
    ReservaAsientoModule,
    FacturasModule,
    IncidenciasModule,
    HttpModule,
  ],
})
export class AppModule {}
