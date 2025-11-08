import { Injectable } from '@nestjs/common';
import { CreateSalaInput } from './dto/create-sala.input';
import { UpdateSalaInput } from './dto/update-sala.input';

@Injectable()
export class SalasService {
  create(createSalaInput: CreateSalaInput) {
    return 'This action adds a new sala';
  }

  findAll() {
    return `This action returns all salas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sala`;
  }

  update(id: number, updateSalaInput: UpdateSalaInput) {
    return `This action updates a #${id} sala`;
  }

  remove(id: number) {
    return `This action removes a #${id} sala`;
  }
}
