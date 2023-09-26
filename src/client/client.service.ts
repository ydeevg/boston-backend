import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateClientDto } from './dto/create-client.dto'
import { UpdateClientDto } from './dto/update-client.dto'
import { ClientEntity } from './entities/client.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private clientRepository: Repository<ClientEntity>
  ) {}

  create(createClientDto: CreateClientDto) {
    return 'This action adds a new client'
  }

  findAll() {
    return `This action returns all client`
  }

  async findById(id: typeof ClientEntity.prototype.id) {
    const client = await this.clientRepository.findOne({ where: { id } })
    if (!client) throw new NotFoundException()
    return client
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`
  }

  remove(id: number) {
    return `This action removes a #${id} client`
  }
}
