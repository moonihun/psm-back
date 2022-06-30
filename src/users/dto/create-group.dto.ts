import { PickType } from '@nestjs/swagger';
import { Group } from '../entity/group.entity';

export class CreateGroupDto extends PickType(Group, [
  'group_month',
  'group',
  'user',
] as const) {}
