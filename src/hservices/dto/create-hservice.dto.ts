import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHserviceDto {
  @ApiProperty({
    example: "Consultation",
    description: "Name of the service",
  })
  @IsString({ message: "name type must be string" })
  @IsNotEmpty({ message: "name must be entered" })
  name: string;

  @ApiProperty({
    example: "health checkup",
    description: "Description of the service",
  })
  @IsString({ message: "description type must be string" })
  @IsNotEmpty({ message: "description must be entered" })
  description: string;

  @ApiProperty({
    example: 150.00,
    description: "Price of the service",
  })
  @IsNumber({}, { message: "price must be a number" })
  price: number;
}