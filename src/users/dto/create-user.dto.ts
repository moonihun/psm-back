import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'test@test.com',
    description: '유저 이메일',
    required: true,
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'honggildong',
    description: '유저 이름',
    required: true,
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'password12!@',
    description: '유저 패스워드',
    required: true,
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    example: 'password12!@',
    description: '유저 패스워드 확인',
    required: true,
  })
  @IsString()
  readonly confirmPassword: string;
}
