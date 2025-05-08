import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";

export class CreateMedPrescriptionDto {
  @ApiProperty({
    example: 1,
    description: "Medicine's ID",
  })
  @IsInt({ message: "med_id must be an integer" })
  med_id: number;

  @ApiProperty({
    example: 1,
    description: "Medical record's ID",
  })
  @IsInt({ message: "med_rec_id must be an integer" })
  med_rec_id: number;

  @ApiProperty({
    example: "10mg",
    description: "Dosage",
  })
  @IsString({ message: "dosage type must be string" })
  dosage: string;

  @ApiProperty({
    example: "Twice daily",
    description: "Frequency",
  })
  @IsString({ message: "frequency type must be string" })
  frequency: string;

  @ApiProperty({
    example: 30,
    description: "Quantity",
  })
  @IsInt({ message: "quantity must be an integer" })
  quantity: number;

  @ApiProperty({
    example: "Take with food",
    description: "Instructions",
  })
  @IsString({ message: "instructions type must be string" })
  instructions: string;
}