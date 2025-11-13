import { Injectable } from '@nestjs/common';
import { CreateReservaAsientoInput } from './dto/create-reserva-asiento.input';
import { UpdateReservaAsientoInput } from './dto/update-reserva-asiento.input';

@Injectable()
export class ReservaAsientoService {
  create(createReservaAsientoInput: CreateReservaAsientoInput) {
    return 'This action adds a new reservaAsiento';
  }

  findAll() {
    return `This action returns all reservaAsiento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reservaAsiento`;
  }

  update(id: number, updateReservaAsientoInput: UpdateReservaAsientoInput) {
    return `This action updates a #${id} reservaAsiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} reservaAsiento`;
  }
}
