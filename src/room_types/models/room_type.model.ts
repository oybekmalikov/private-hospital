import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Room } from "../../rooms/models/room.model";

interface IRoomTypeCreationDto {
	name: string;
	description: string;
	price: number;
}

@Table({ tableName: "room_types", freezeTableName: true })
export class RoomType extends Model<RoomType, IRoomTypeCreationDto> {
	@ApiProperty({
		example: 1,
		description: "Room type's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "VIP Room",
		description: "Room type's name",
	})
	@Column({ type: DataType.STRING(100) })
	declare name: string;

	@ApiProperty({
		example: "Very comfortable room",
		description: "Room description",
	})
	@Column({ type: DataType.TEXT })
	declare description: string;
	@ApiProperty({
		example: 500.0,
		description: "Price of the room type",
	})
	@Column({ type: DataType.DECIMAL(10, 2) })
	declare price: number;
	@HasMany(() => Room)
	room: Room[];
}
