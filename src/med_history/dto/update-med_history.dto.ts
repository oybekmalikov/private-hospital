import { PartialType } from '@nestjs/swagger';
import { CreateMedHistoryDto } from './create-med_history.dto';

export class UpdateMedHistoryDto extends PartialType(CreateMedHistoryDto) {}
