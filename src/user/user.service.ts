import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.insert({
      phone: createUserDto.phone,
      password: createUserDto.password,
      ...createUserDto.name ? {name: createUserDto.name} : {}
    })

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findById(id: typeof UserEntity.prototype.id) {
    const user = this.userRepository.findOneBy({ id })

    return user
  }
}
