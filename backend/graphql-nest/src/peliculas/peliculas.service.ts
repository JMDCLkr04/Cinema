import { Injectable } from '@nestjs/common';
import { CreatePeliculaInput } from './dto/create-pelicula.input';
import { UpdatePeliculaInput } from './dto/update-pelicula.input';

@Injectable()
export class PeliculasService {
  create(createPeliculaInput: CreatePeliculaInput) {
    return 'This action adds a new pelicula';
  }

  findAll() {
    return `This action returns all peliculas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pelicula`;
  }

  update(id: number, updatePeliculaInput: UpdatePeliculaInput) {
    return `This action updates a #${id} pelicula`;
  }

  remove(id: number) {
    return `This action removes a #${id} pelicula`;
  }
}
