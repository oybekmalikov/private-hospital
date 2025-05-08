import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface IMedHistoryCreationAttr {
	patient_id: number;
	start_date: Date;
	end_date: Date;
	condition: string;
	details: string;
}

@Table({ tableName: "med_history", freezeTableName: true })
export class MedHistory extends Model<MedHistory, IMedHistoryCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Medical history's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: 1,
		description: "Patient's ID",
	})
	@ForeignKey(() => Patient)
	@Column({ type: DataType.INTEGER })
	declare patient_id: number;

	@ApiProperty({
		example: "2025-01-01",
		description: "Start date",
	})
	@Column({ type: DataType.DATE })
	declare start_date: Date;

	@ApiProperty({
		example: "2025-05-01",
		description: "End date",
	})
	@Column({ type: DataType.DATE })
	declare end_date: Date;

	@ApiProperty({
		example: "Chronic illness",
		description: "Condition",
	})
	@Column({ type: DataType.STRING })
	declare condition: string;

	@ApiProperty({
		example: "Details of treatment",
		description: "Details",
	})
	@Column({ type: DataType.TEXT })
	declare details: string;
	@BelongsTo(() => Patient)
	patient: Patient;
}
