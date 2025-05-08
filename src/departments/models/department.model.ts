import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";
import { Room } from "../../rooms/models/room.model";
import { Staff } from "../../staffs/models/staff.model";

interface IDepartmentCreationAttr {
	name: string;
	description: string;
	location: string;
	is_active: boolean;
}

@Table({ tableName: "departments", freezeTableName: true })
export class Department extends Model<Department, IDepartmentCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Department's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "Cardiology",
		description: "Department's name",
	})
	@Column({ type: DataType.STRING(100) })
	declare name: string;

	@ApiProperty({
		example: "Department specializing in heart-related issues",
		description: "Department's description",
	})
	@Column({ type: DataType.STRING })
	declare description: string;

	@ApiProperty({
		example: "Building A, Floor 3",
		description: "Department's location",
	})
	@Column({ type: DataType.STRING(100) })
	declare location: string;

	@ApiProperty({
		example: "true/false",
		description: "Department's is active?",
	})
	@Column({ type: DataType.BOOLEAN })
	declare is_active: boolean;
	@HasMany(() => Staff)
	staff: Staff[];
	@HasMany(() => Doctor)
	doctors: Doctor[];
	@HasMany(() => Room)
	room: Room[];
}
