import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRoomDto {
	@ApiProperty({
		example: 1,
		description: "Room type's ID",
	})
	@IsInt({ message: "type_id must be an integer" })
	type_id: number;

	@ApiProperty({
		example: 101,
		description: "Room number",
	})
	@IsNumber({}, { message: "room_number must be a number" })
	@IsNotEmpty({ message: "room_number must be entered" })
	room_number: number;

	@ApiProperty({
		example: 1,
		description: "Room's department id",
	})
	@IsInt({ message: "department id must be integer" })
	department_id: number;

	@ApiProperty({
		example: 2,
		description: "Capacity of the room",
	})
	@IsNumber({}, { message: "capacity must be a number" })
	capacity: number;

	@ApiProperty({
		example: "busy",
		description: "Room status",
	})
	@IsEnum(["busy", "not busy"])
	status: string;
}
