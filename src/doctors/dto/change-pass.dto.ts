import { IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
	@IsStrongPassword({}, { message: "Password is not strong enough" })
	password: string;
	confirm: string;
}
