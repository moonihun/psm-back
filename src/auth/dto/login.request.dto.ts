import { PickType } from '@nestjs/swagger';
import { User } from 'src/users/entity/user.entity';

export class LoginRequestDto extends PickType(User, [
  'username',
  'password',
] as const) {}
