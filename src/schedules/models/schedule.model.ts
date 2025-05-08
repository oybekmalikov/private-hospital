import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.model";

interface IScheduleCreationAttr {
	doctor_id: number;
	weekday: string;
	start_time: string;
	end_time: string;
}

@Table({ tableName: "schedules", freezeTableName: true })
export class Schedule extends Model<Schedule, IScheduleCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Schedule's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: 1,
		description: "Doctor's ID",
	})
	@ForeignKey(() => Doctor)
	@Column({ type: DataType.INTEGER })
	declare doctor_id: number;

	@ApiProperty({
		example: "Monday",
		description: "Day of the week for the schedule",
	})
	@Column({ type: DataType.STRING(20) })
	declare weekday: string;

	@ApiProperty({
		example: "09:00",
		description: "Start time of the schedule",
	})
	@Column({ type: DataType.STRING(10) })
	declare start_time: string;

	@ApiProperty({
		example: "17:00",
		description: "End time of the schedule",
	})
	@Column({ type: DataType.STRING(10) })
	declare end_time: string;
	@BelongsTo(() => Doctor)
	doctor: Doctor;
}
