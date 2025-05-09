import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class StaffSignInDto {
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
	password: string;
}
