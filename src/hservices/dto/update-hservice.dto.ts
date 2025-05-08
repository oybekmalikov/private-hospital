import { PartialType } from '@nestjs/swagger';
import { CreateHserviceDto } from './create-hservice.dto';

export class UpdateHserviceDto extends PartialType(CreateHserviceDto) {}
