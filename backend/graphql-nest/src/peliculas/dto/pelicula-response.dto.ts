import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class PeliculaResponseDto {
  @Field(() => String, { nullable: true })
  id_pelicula?: string;

  @Field(() => String, { nullable: true })
  titulo?: string;

  @Field(() => String, { nullable: true })
  genero?: string;

  @Field(() => String, { nullable: true })
  descripcion?: string;

  @Field(() => Int, { nullable: true })
  calificacion?: number;

  @Field(() => Int, { nullable: true })
  duracion?: number;

  // Mapeo de campos alternativos (por si la API usa nombres diferentes)
  static fromApiData(apiData: any): PeliculaResponseDto {
    return {
      id_pelicula: apiData.id_pelicula || apiData.id || undefined,
      titulo: apiData.titulo || apiData.title || undefined,
      genero: apiData.genero || apiData.genre || undefined,
      descripcion: apiData.descripcion || apiData.description || undefined,
      calificacion: apiData.calificacion || apiData.rating || undefined,
      duracion: apiData.duracion || apiData.duration || undefined,
    };
  }
}
