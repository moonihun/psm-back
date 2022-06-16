import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('User')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiOperation({
    summary: '모든 유저 조회',
    description: '모든 유저 조회하기',
  })
  @Get()
  async getUsers(): Promise<any[]> {
    return await this.userService.findAll();
  }

  @ApiOperation({
    summary: '특정 유저 조회',
    description: 'ID를 통한 유저 조회',
  })
  @Get('/:id')
  async getOneUser(@Param('id') id: number): Promise<User> {
    return await this.userService.findOne(id);
  }

  @ApiOperation({
    summary: '유저 생성',
    description: '유저 생성하기',
  })
  @Post('signup')
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.createUser(user);
  }
}
