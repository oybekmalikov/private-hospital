import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateMedicalRecordDto {
	@ApiProperty({
		example: 1,
		description: "Patient's ID",
	})
	@IsInt({ message: "patient_id must be an integer" })
	patient_id: number;

	@ApiProperty({
		example: 1,
		description: "Doctor's ID",
	})
	@IsInt({ message: "doctor_id must be an integer" })
	doctor_id: number;

	@ApiProperty({
		example: "Hypertension",
		description: "Diagnosis",
	})
	@IsString({ message: "diagnosis type must be string" })
	diagnosis: string;

	@ApiProperty({
		example: "Medication",
		description: "Treatment",
	})
	@IsString({ message: "treatment type must be string" })
	treatment: string;

	@ApiProperty({
		example: "2025-05-01",
		description: "Visit date",
	})
	@IsDateString({}, { message: "Invalid date format for visit_date" })
	visit_date: Date;

	@ApiProperty({
		example: "Patient stable",
		description: "Notes",
	})
	@IsString({ message: "notes type must be string" })
	notes: string;
}
