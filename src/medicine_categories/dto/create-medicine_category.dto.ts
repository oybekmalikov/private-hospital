import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateMedicineCategoryDto {
	@ApiProperty({
		example: "Parasetamol",
		description: "Name of the medicine category",
	})
	@IsString({ message: "name type must be string" })
	@IsNotEmpty({ message: "name must be entered" })
	name: string;

	@ApiProperty({
		example: "It helps for headache",
		description: "Description",
	})
	@IsString({ message: "description type must be string" })
	@IsNotEmpty({ message: "description must be entered" })
	description: string;
}
