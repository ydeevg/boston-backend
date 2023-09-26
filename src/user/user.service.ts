import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserEntity } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.insert({
      phone: createUserDto.phone,
      password: createUserDto.password,
      ...(createUserDto.name ? { name: createUserDto.name } : {}),
    })

    return user
  }

  async findAll() {
    const users = await this.userRepository.find({ relations: ['roles', 'tenant', 'points'] })

    return users.map((user) => user.toResponse())
  }

  async update(id: typeof UserEntity.prototype.id, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  async remove(id: typeof UserEntity.prototype.id) {
    return `This action removes a #${id} user`
  }

  async findById(id: typeof UserEntity.prototype.id) {
    const user = this.userRepository.findOne({ where: { id }, relations: ['roles', 'tenant', 'points'] })

    return user
  }

  async findByPhone(phone: typeof UserEntity.prototype.phone) {
    const user = await this.userRepository.findOne({ where: { phone }, relations: ['roles', 'tenant', 'points'] })

    return user
  }
}
