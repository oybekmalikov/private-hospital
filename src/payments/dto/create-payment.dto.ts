import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNumber } from "class-validator";

export class CreatePaymentDto {
	@ApiProperty({
		example: 1,
		description: "Patient's ID",
	})
	@IsInt({ message: "patient_id must be an integer" })
	patient_id: number;

	@ApiProperty({
		example: 1,
		description: "Amount paid",
	})
	@IsNumber({}, { message: "amount must be a number" })
	amount: number;
	@ApiProperty({
		example: 1,
		description: "Service's ID",
	})
	@IsInt({ message: "service_id must be an integer" })
	service_id: number;
	@ApiProperty({
		example: 1,
		description: "Appointment's ID",
	})
	@IsInt({ message: "appointment_id must be an integer" })
	appointment_id: number;
	@ApiProperty({
		example: "2025-05-01",
		description: "Date of the payment",
	})
	@IsDateString({}, { message: "Invalid date format for date" })
	date: Date;
	@ApiProperty({
		example: "cash",
		description: "Type of the payment",
	})
	@IsEnum(["cash", "card", "online"], { message: "Wrong type format" })
	type: string;
	@ApiProperty({
		example: "paid",
		description: "Satatus of the payment",
	})
	@IsEnum(["paid", "unpaid", "pending"], { message: "Wrong status format" })
	status: string;
}
