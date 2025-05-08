import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateAppointmentDto {
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
		example: 1,
		description: "Service's ID",
	})
	@IsInt({ message: "service id must be an integer" })
	service_id: number;

	@ApiProperty({
		example: "2025-05-01",
		description: "Date of the appointment",
	})
	@IsDateString({}, { message: "Invalid date format for appointment_date" })
	appointment_date: Date;

	@ApiProperty({
		example: "confirmed",
		description: "Status of the appointment",
	})
	@IsString({ message: "status type must be string" })
	status: string;
	@ApiProperty({
		example: "Additional note",
		description: "NOte of the appointment",
	})
	@IsString({ message: "Note type must be string" })
	note: string;
}
