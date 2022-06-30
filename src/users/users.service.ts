import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
    @InjectRepository(Group)
    private groupRepository: Repository<Group>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: { scores: true, handicaps: true },
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

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new UnauthorizedException('패스워드가 일치하지 않습니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const { group_month, group, user } = createGroupDto;
    const newGroup = this.groupRepository.create({
      group_month,
      group,
      user,
    });

    return await this.groupRepository.save(newGroup);
  }

  // async signIn(user: CreateUserDto): Promise<User> {
  //   const { username, password } = user;
  //   const signInUser = this.usersRepository.find(username);
  // }
}
