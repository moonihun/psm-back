import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from '../entity/user.entity';

export class CreateUserDto extends PickType(User, [
  'username',
  'password',
] as const) {
  @ApiProperty({
    description: 'confirm password',
    example: '1234',
  })
  @IsString()
  confirmPassword: string;
}
