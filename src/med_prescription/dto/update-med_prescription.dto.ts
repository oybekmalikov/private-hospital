import { PartialType } from '@nestjs/swagger';
import { CreateMedPrescriptionDto } from './create-med_prescription.dto';

export class UpdateMedPrescriptionDto extends PartialType(CreateMedPrescriptionDto) {}
