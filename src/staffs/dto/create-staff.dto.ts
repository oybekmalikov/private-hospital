import { ApiProperty } from "@nestjs/swagger";
import {
	IsBoolean,
	IsDateString,
	IsEmail,
	IsInt,
	IsNotEmpty,
	IsString,
	IsStrongPassword,
	Matches,
} from "class-validator";

export class CreateStaffDto {
	@ApiProperty({
		example: "John",
		description: "Staff's first name",
	})
	@IsString({ message: "first_name type must be string" })
	@IsNotEmpty({ message: "first_name must be entered" })
	first_name: string;

	@ApiProperty({
		example: "Doe",
		description: "Staff's last name",
	})
	@IsString({ message: "last_name type must be string" })
	@IsNotEmpty({ message: "last_name must be entered" })
	last_name: string;

	@ApiProperty({
		example: "staff@example.com",
		description: "Staff's unique email",
	})
	@IsEmail({}, { message: "Invalid email" })
	email: string;

	@ApiProperty({
		example: "mySecretPassword",
		description: "Staff's strong password",
	})
	@IsStrongPassword({}, { message: "Password must be strong!" })
	password: string;

	@ApiProperty({
		example: "+998901234567",
		description: "Staff's phone number",
	})
	@Matches(/^\+998[0-9]{9}$/, {
		message: "Invalid phone number",
	})
	phone: string;

	@ApiProperty({
		example: "male/female",
		description: "Staff's gender",
	})
	@IsString({ message: "gender type must be string" })
	@IsNotEmpty({ message: "gender must be entered" })
	gender: string;

	@ApiProperty({
		example: "1990-01-01",
		description: "Staff's date of birth",
	})
	@IsDateString({}, { message: "Invalid date format" })
	date_of_birth: Date;

	@ApiProperty({
		example: "Nurse",
		description: "Staff's position",
	})
	@IsString({ message: "position type must be string" })
	@IsNotEmpty({ message: "position must be entered" })
	position: string;
	@ApiProperty({
		example: 1,
		description: "Staff's department id",
	})
	@IsInt({ message: "department_id must be an integer" })
	department_id: number;
	@ApiProperty({
		example: "true/false",
		description: "Staff's is active?",
	})
	@IsBoolean({ message: "is_active must be boolean" })
	is_active: boolean;
	@ApiProperty({
		example: "true/false",
		description: "Staff's is Manager?",
	})
	@IsBoolean({ message: "is manager must be boolean" })
	isManager: boolean;
}
