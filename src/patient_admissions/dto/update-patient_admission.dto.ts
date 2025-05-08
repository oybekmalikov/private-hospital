import { PartialType } from '@nestjs/swagger';
import { CreatePatientAdmissionDto } from './create-patient_admission.dto';

export class UpdatePatientAdmissionDto extends PartialType(CreatePatientAdmissionDto) {}
