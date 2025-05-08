import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateMedHistoryDto {
  @ApiProperty({
    example: 1,
    description: "Patient's ID",
  })
  @IsInt({ message: "patient_id must be an integer" })
  patient_id: number;

  @ApiProperty({
    example: "2025-01-01",
    description: "Start date",
  })
  @IsDateString({}, { message: "Invalid date format for start_date" })
  start_date: Date;

  @ApiProperty({
    example: "2025-05-01",
    description: "End date",
  })
  @IsDateString({}, { message: "Invalid date format for end_date" })
  end_date: Date;

  @ApiProperty({
    example: "Condition",
    description: "Condition",
  })
  @IsString({ message: "condition type must be string" })
  condition: string;

  @ApiProperty({
    example: "Details of treatment",
    description: "Details",
  })
  @IsString({ message: "details type must be string" })
  details: string;
}