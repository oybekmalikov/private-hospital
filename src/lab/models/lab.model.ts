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
import { Patient } from "../../patients/models/patient.model";

interface ILabCreationAttr {
	patient_id: number;
	doctor_id: number;
	test_name: string;
	test_date: Date;
	result: string;
	normal_range: string;
}

@Table({ tableName: "lab", freezeTableName: true })
export class Lab extends Model<Lab, ILabCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Lab's unique id number",
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
		example: 1,
		description: "Doctor's ID",
	})
	@ForeignKey(() => Doctor)
	@Column({ type: DataType.INTEGER })
	declare doctor_id: number;
	@ApiProperty({
		example: "Blood Test",
		description: "Name of the lab test",
	})
	@Column({ type: DataType.STRING(100) })
	declare test_name: string;

	@ApiProperty({
		example: "2025-05-01",
		description: "Date of the test",
	})
	@Column({ type: DataType.DATE })
	declare test_date: Date;

	@ApiProperty({
		example: "Hemoglobin: 14.5 g/dL",
		description: "Result of the test",
	})
	@Column({ type: DataType.STRING })
	declare result: string;

	@ApiProperty({
		example: "Normal range",
		description: "Normal range for the test",
	})
	@Column({ type: DataType.STRING(100) })
	declare normal_range: string;
	@BelongsTo(() => Patient)
	patient: Patient;
	@BelongsTo(() => Doctor)
	doctor: Doctor;
}
