import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLabDto {
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
		example: "Blood Test",
		description: "Name of the lab test",
	})
	@IsString({ message: "test_name type must be string" })
	@IsNotEmpty({ message: "test_name must be entered" })
	test_name: string;

	@ApiProperty({
		example: "2025-05-01",
		description: "Date of the test",
	})
	@IsDateString({}, { message: "Invalid date format for test_date" })
	test_date: Date;

	@ApiProperty({
		example: "Hemoglobin: 14.5 g/dL",
		description: "Result of the test",
	})
	@IsString({ message: "result type must be string" })
	@IsNotEmpty({ message: "result must be entered" })
	result: string;

	@ApiProperty({
		example: "Normal range",
		description: "Normal range for the test",
	})
	@IsString({ message: "normal_range type must be string" })
	@IsNotEmpty({ message: "normal_range must be entered" })
	normal_range: string;
}
