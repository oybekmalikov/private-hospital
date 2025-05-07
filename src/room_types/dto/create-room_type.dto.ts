import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomTypeDto {
	@ApiProperty({
		example: "VIP Room",
		description: "Room type's name",
	})
	@IsString({ message: "name type must be string" })
	@IsNotEmpty({ message: "name must be entered" })
	name: string;
	@ApiProperty({
		example: "Very comfortable room",
		description: "Room description",
	})
	@IsString({ message: "description type must be string" })
	@IsNotEmpty({ message: "description must be entered" })
	description: string;

	@ApiProperty({
		example: 500.0,
		description: "Price of the room type",
	})
	@IsNumber({}, { message: "price must be a number" })
	price: number;
}
