import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class DoctorSignInDto {
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
	password: string;
}
