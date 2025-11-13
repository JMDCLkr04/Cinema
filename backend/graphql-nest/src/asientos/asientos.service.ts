import { Injectable } from '@nestjs/common';
import { CreateAsientoInput } from './dto/create-asiento.input';
import { UpdateAsientoInput } from './dto/update-asiento.input';

@Injectable()
export class AsientosService {
  create(createAsientoInput: CreateAsientoInput) {
    return 'This action adds a new asiento';
  }

  findAll() {
    return `This action returns all asientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} asiento`;
  }

  update(id: number, updateAsientoInput: UpdateAsientoInput) {
    return `This action updates a #${id} asiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} asiento`;
  }
}
