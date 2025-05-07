import { PartialType } from '@nestjs/swagger';
import { CreateRoomTypeDto } from './create-room_type.dto';

export class UpdateRoomTypeDto extends PartialType(CreateRoomTypeDto) {}
