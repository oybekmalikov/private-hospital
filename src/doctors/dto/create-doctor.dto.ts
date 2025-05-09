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

export class CreateDoctorDto {
	@ApiProperty({
		example: "Jane",
		description: "Doctor's first name",
	})
	@IsString({ message: "first_name type must be string" })
	@IsNotEmpty({ message: "first_name must be entered" })
	first_name: string;

	@ApiProperty({
		example: "Smith",
		description: "Doctor's last name",
	})
	@IsString({ message: "last_name type must be string" })
	@IsNotEmpty({ message: "last_name must be entered" })
	last_name: string;

	@ApiProperty({
		example: "doctor@example.com",
		description: "Doctor's unique email",
	})
	@IsEmail({}, { message: "Invalid email" })
	email: string;

	@ApiProperty({
		example: "mySecretPassword",
		description: "Doctor's strong password",
	})
	@IsStrongPassword({}, { message: "Password must be strong!" })
	password: string;

	@ApiProperty({
		example: "+998901234567",
		description: "Doctor's phone number",
	})
	@Matches(/^\+998[0-9]{9}$/, {
		message: "Invalid phone number",
	})
	phone: string;

	@ApiProperty({
		example: "male/female",
		description: "Doctor's gender",
	})
	@IsString({ message: "gender type must be string" })
	@IsNotEmpty({ message: "gender must be entered" })
	gender: string;

	@ApiProperty({
		example: "1985-05-15",
		description: "Doctor's date of birth",
	})
	@IsDateString({}, { message: "Invalid date format" })
	date_of_birth: Date;

	@ApiProperty({
		example: "Cardiologist",
		description: "Doctor's specialization",
	})
	@IsString({ message: "specialization type must be string" })
	@IsNotEmpty({ message: "specialization must be entered" })
	specialization: string;

	@ApiProperty({
		example: 10,
		description: "Doctor's years of experience",
	})
	@IsInt({ message: "experience_year must be an integer" })
	experience_year: number;
	@ApiProperty({
		example: 1,
		description: "Doctor's department id",
	})
	@IsInt({ message: "department id must be an integer" })
	department_id: number;

	@ApiProperty({
		example: "LIC12345",
		description: "Doctor's license number",
	})
	@IsString({ message: "license_no type must be string" })
	@IsNotEmpty({ message: "license_no must be entered" })
	license_no: string;

	@ApiProperty({
		example: "true/false",
		description: "Doctor's is active?",
	})
	@IsBoolean({ message: "is_active must be boolean" })
	is_active: boolean;
	@ApiProperty({
		example: "true/false",
		description: "Doctor's is head doctor?",
	})
	@IsBoolean({ message: "isHeadDoctor must be boolean" })
	isHeadDoctor: boolean;
}
