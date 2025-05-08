import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Matches,
} from "class-validator";

export class CreatePatientDto {
  @ApiProperty({
    example: "Alice",
    description: "Patient's first name",
  })
  @IsString({ message: "first_name type must be string" })
  @IsNotEmpty({ message: "first_name must be entered" })
  first_name: string;

  @ApiProperty({
    example: "Johnson",
    description: "Patient's last name",
  })
  @IsString({ message: "last_name type must be string" })
  @IsNotEmpty({ message: "last_name must be entered" })
  last_name: string;

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
  @IsStrongPassword({}, { message: "Password must be strong!" })
  password: string;
  @ApiProperty({
    example: "mySecretPassword",
    description: "Patient's confirm password",
  })
  @IsStrongPassword({}, { message: "Confirm pasword not matched" })
  confirm_password: string;

  @ApiProperty({
    example: "+998901234567",
    description: "Patient's phone number",
  })
  @Matches(/^\+998[0-9]{9}$/, {
    message: "Invalid phone number",
  })
  phone: string;

  @ApiProperty({
    example: "female",
    description: "Patient's gender",
  })
  @IsString({ message: "gender type must be string" })
  @IsNotEmpty({ message: "gender must be entered" })
  gender: string;

  @ApiProperty({
    example: "1995-03-22",
    description: "Patient's date of birth",
  })
  @IsDateString({}, { message: "Invalid date format" })
  date_of_birth: Date;
	
  @ApiProperty({
    example: "Tasshkent, Amir Temur st 69",
    description: "Patient's address",
  })
  @IsString({ message: "address type must be string" })
  @IsNotEmpty({ message: "address must be entered" })
  address: string;

  @ApiProperty({
    example: "true/false",
    description: "Patient's is active?",
  })
  @IsBoolean({ message: "is_active must be boolean" })
  is_active: boolean;
}