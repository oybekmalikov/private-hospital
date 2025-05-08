import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsString } from "class-validator";

export class CreateMedicineDto {
  @ApiProperty({
    example: "Aspirin",
    description: "Name of the medicine",
  })
  @IsString({ message: "name type must be string" })
  name: string;

  @ApiProperty({
    example: "Pain relief",
    description: "Description",
  })
  @IsString({ message: "description type must be string" })
  description: string;

  @ApiProperty({
    example: 1,
    description: "Category's ID",
  })
  @IsInt({ message: "category_id must be an integer" })
  category_id: number;

  @ApiProperty({
    example: 50.00,
    description: "Price",
  })
  @IsInt({ message: "price must be an integer" })
  price: number;

  @ApiProperty({
    example: 100,
    description: "Stock quantity",
  })
  @IsInt({ message: "stock_quantity must be an integer" })
  stock_quantity: number;

  @ApiProperty({
    example: "2025-12-31",
    description: "Expiration date",
  })
  @IsDateString({}, { message: "Invalid date format for exp_date" })
  exp_date: Date;
}