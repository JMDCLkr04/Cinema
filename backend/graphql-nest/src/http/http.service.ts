import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { Sala } from 'src/salas/entities/sala.entity';
import { Pelicula } from 'src/peliculas/entities/pelicula.entity';
import { Asiento } from 'src/asientos/entities/asiento.entity';
import { Reserva } from 'src/reservas/entities/reserva.entity';
import { ReservaAsiento } from 'src/reserva-asiento/entities/reserva-asiento.entity';
import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
import { Factura } from 'src/facturas/entities/factura.entity';
import { Funcione } from 'src/funciones/entities/funcione.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';


@Injectable()
export class HttpServices {
  private readonly logger = new Logger(HttpServices.name);
  constructor(private readonly httpService: HttpService) {}

  async findAllUsers(): Promise<Usuario[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Usuario[]>('http://localhost:3001/api/usuarios').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findOneUser(id: string): Promise<Usuario> {
    const { data } = await firstValueFrom(
      this.httpService.get<Usuario>(`http://localhost:3001/api/usuarios/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findAllPeliculas(): Promise<Pelicula[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Pelicula[]>('http://localhost:3001/api/peliculas').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findOnePelicula(id: string): Promise<Pelicula> {
    const { data } = await firstValueFrom(
      this.httpService.get<Pelicula>(`http://localhost:3001/api/peliculas/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findAllSalas(): Promise<Sala[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Sala[]>('http://localhost:3001/api/salas').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findOneSala(id: string): Promise<Sala> {
    const { data } = await firstValueFrom(
      this.httpService.get<Sala>(`http://localhost:3001/api/salas/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findAllAsientos(): Promise<Asiento[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Asiento[]>('http://localhost:3001/api/asientos').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findOneAsiento(id: string): Promise<Asiento> {
    const { data } = await firstValueFrom(
      this.httpService.get<Asiento>(`http://localhost:3001/api/asientos/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findAllReservas(): Promise<Reserva[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Reserva[]>('http://localhost:3001/api/reservas').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findOneReserva(id: string): Promise<Reserva> {
    const { data } = await firstValueFrom(
      this.httpService.get<Reserva>(`http://localhost:3001/api/reservas/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllIncidencias(): Promise<Incidencia[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Incidencia[]>('http://localhost:3001/api/incidencias').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findOneIncidencia(id: string): Promise<Incidencia> {
    const { data } = await firstValueFrom(
      this.httpService.get<Incidencia>(`http://localhost:3001/api/incidencias/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findAllFacturas(): Promise<Factura[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Factura[]>('http://localhost:3001/api/facturas').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findOneFactura(id: string): Promise<Factura> {
    const { data } = await firstValueFrom(
      this.httpService.get<Factura>(`http://localhost:3001/api/facturas/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
  async findAllFunciones(): Promise<Funcione[]> {
    const { data } = await firstValueFrom(
      this.httpService.get<Funcione[]>('http://localhost:3001/api/funciones').pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }

  async findOneFuncion(id: string): Promise<Funcione> {
    const { data } = await firstValueFrom(
      this.httpService.get<Funcione>(`http://localhost:3001/api/funciones/${id}`).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw 'An error happened!';
        }),
      ),
    );
    return data;
  }
}

// import { HttpService } from '@nestjs/axios';
// import { Injectable, Logger } from '@nestjs/common';
// import { AxiosError } from 'axios';
// import { catchError, firstValueFrom } from 'rxjs';
// import { Sala } from 'src/salas/entities/sala.entity';
// import { Pelicula } from 'src/peliculas/entities/pelicula.entity';
// import { Asiento } from 'src/asientos/entities/asiento.entity';
// import { Reserva } from 'src/reservas/entities/reserva.entity';
// import { ReservaAsiento } from 'src/reserva-asiento/entities/reserva-asiento.entity';
// import { Incidencia } from 'src/incidencias/entities/incidencia.entity';
// import { Factura } from 'src/facturas/entities/factura.entity'; 
// import { Funcione } from 'src/funciones/entities/funcione.entity';
// import { Usuario } from 'src/usuarios/entities/usuario.entity';


// @Injectable()
// export class HttpServices {
//   private readonly logger = new Logger(HttpServices.name);
//   constructor(private readonly httpService: HttpService) {}

//   async findAllUsers(): Promise<Usuario[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Usuario[]>('http://localhost:3001/api/usuarios').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }
//   async findOneUser(id:string): Promise<Usuario> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Usuario>(`http://localhost:3001/api/usuarios/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }
//   async findAllPeliculas(): Promise<Pelicula[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Pelicula[]>('http://localhost:3001/api/peliculas').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }

//     async findOnePelicula(id:string): Promise<Pelicula> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Pelicula>(`http://localhost:3001/api/peliculas/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }
//   async findAllSalas(): Promise<Sala[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Sala[]>('http://localhost:3001/api/salas').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }
//       async findOneSala(id:string): Promise<Sala> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Sala>(`http://localhost:3001/api/salas/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }
//   async findAllAsientos(): Promise<Asiento[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Asiento[]>('http://localhost:3001/api/asientos').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }
//   async findOneAsiento(id:string): Promise<Asiento> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Asiento>(`http://localhost:3001/api/asientos/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }
//   async findAllReservas(): Promise<Reserva[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Reserva[]>('http://localhost:3001/api/reservas').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }
//   async findOneReserva(id:string): Promise<Reserva> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Reserva>(`http://localhost:3001/api/reservas/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }

//   async findAllIncidencias(): Promise<Incidencia[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Incidencia[]>('http://localhost:3001/api/incidencias').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }
//   async findOneIncidencia(id:string): Promise<Incidencia> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Incidencia>(`http://localhost:3001/api/incidencias/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }

//   async findAllFacturas(): Promise<Factura[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Factura[]>('http://localhost:3001/api/facturas').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }

//   async findOneFactura(id:string): Promise<Factura> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Factura>(`http://localhost:3001/api/facturas/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }
//   async findAllFunciones(): Promise<Funcione[]> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Funcione[]>('http://localhost:3001/api/funciones').pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//   }

//   async findOneFuncion(id:string): Promise<Funcione> {
//     const { data } = await firstValueFrom(
//       this.httpService.get<Funcione>(`http://localhost:3001/api/funciones/${id}`).pipe(
//         catchError((error: AxiosError) => {
//           this.logger.error(error.response?.data);
//           throw 'An error happened!';
//         }),
//       ),
//     );
//     return data;
//     }  
// }