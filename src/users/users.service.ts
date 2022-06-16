import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
        scores: true,
        handicaps: true,
      },
    });
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        scores: true,
        handicaps: true,
      },
    });
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
}
