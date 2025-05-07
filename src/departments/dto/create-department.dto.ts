import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateDepartmentDto {
  @ApiProperty({
    example: "Cardiology",
    description: "Department's name",
  })
  @IsString({ message: "name type must be string" })
  @IsNotEmpty({ message: "name must be entered" })
  name: string;

  @ApiProperty({
    example: "Department specializing in heart-related issues",
    description: "Department's description",
  })
  @IsString({ message: "description type must be string" })
  @IsNotEmpty({ message: "description must be entered" })
  description: string;

  @ApiProperty({
    example: "Building A, Floor 3",
    description: "Department's location",
  })
  @IsString({ message: "location type must be string" })
  @IsNotEmpty({ message: "location must be entered" })
  location: string;
  @ApiProperty({
    example: "true/false",
    description: "Department's is active?",
  })
  @IsBoolean({ message: "is_active must be boolean" })
  is_active: boolean;
}