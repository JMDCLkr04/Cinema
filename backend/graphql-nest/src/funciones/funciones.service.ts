import { Injectable } from '@nestjs/common';
import { CreateFuncioneInput } from './dto/create-funcione.input';
import { UpdateFuncioneInput } from './dto/update-funcione.input';

@Injectable()
export class FuncionesService {
  create(createFuncioneInput: CreateFuncioneInput) {
    return 'This action adds a new funcione';
  }

  findAll() {
    return `This action returns all funciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} funcione`;
  }

  update(id: number, updateFuncioneInput: UpdateFuncioneInput) {
    return `This action updates a #${id} funcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} funcione`;
  }
}
