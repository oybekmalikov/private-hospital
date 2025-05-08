import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt } from "class-validator";

export class CreatePatientAdmissionDto {
	@ApiProperty({
		example: 1,
		description: "Patient's ID",
	})
	@IsInt({ message: "patient_id must be an integer" })
	patient_id: number;

	@ApiProperty({
		example: 1,
		description: "Room's ID",
	})
	@IsInt({ message: "room_id must be an integer" })
	room_id: number;

	@ApiProperty({
		example: "2025-05-01",
		description: "Admission date",
	})
	@IsDateString({}, { message: "Invalid date format for admission_date" })
	admission_date: Date;

	@ApiProperty({
		example: "2025-05-10",
		description: "Discharge date",
	})
	@IsDateString({}, { message: "Invalid date format for discharge_date" })
	discharge_date: Date;

	@ApiProperty({
		example: 1,
		description: "Doctor's ID",
	})
	@IsInt({ message: "doctor_id must be an integer" })
	doctor_id: number;

	@ApiProperty({
		example: "admitted",
		description: "Status of the admission",
	})
	@IsEnum(["pending", "complated", "failed"], {
		message: "pending/complated/failed",
	})
	status: string;
}
