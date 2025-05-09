import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class PatientSignInDto {
	@ApiProperty({
		example: "patient@example.com",
		description: "Patient's unique email",
	})
	@IsEmail({}, { message: "Invalid email" })
	email: string;
	@ApiProperty({
		example: "mySecretPassword",
		description: "Patient's strong password",
	})
	password: string;
}
