import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table,
} from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";
import { PatientAdmission } from "../../patient_admissions/models/patient_admission.model";
import { RoomType } from "../../room_types/models/room_type.model";

interface IRoomCreationAttr {
	type_id: number;
	room_number: number;
	department_id: number;
	status: string;
	capacity: number;
}

@Table({ tableName: "rooms", freezeTableName: true })
export class Room extends Model<Room, IRoomCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Room's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: 1,
		description: "Room type's ID",
	})
	@ForeignKey(() => RoomType)
	@Column({ type: DataType.INTEGER })
	declare type_id: number;

	@ApiProperty({
		example: 101,
		description: "Room number",
	})
	@Column({ type: DataType.INTEGER })
	declare room_number: number;

	@ApiProperty({
		example: 2,
		description: "Capacity of the room",
	})
	@Column({ type: DataType.INTEGER })
	declare capacity: number;
	@ApiProperty({
		example: "busy",
		description: "Room status",
	})
	@Column({ type: DataType.ENUM("busy", "not busy") })
	declare status: string;
	@ApiProperty({
		example: 1,
		description: "Room's department id",
	})
	@ForeignKey(() => Department)
	@Column({ type: DataType.INTEGER })
	declare department_id: number;
	@BelongsTo(() => Department)
	department: Department;
	@BelongsTo(() => RoomType)
	roomType: RoomType;
	@HasMany(() => PatientAdmission)
	patientAdmissions: PatientAdmission[];
}
