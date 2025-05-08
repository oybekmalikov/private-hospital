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
import { Doctor } from "../../doctors/models/doctor.model";
import { MedPrescription } from "../../med_prescription/models/med_prescription.model";
import { Patient } from "../../patients/models/patient.model";

interface IMedicalRecordCreationAttr {
	patient_id: number;
	doctor_id: number;
	diagnosis: string;
	treatment: string;
	visit_date: Date;
	notes: string;
}

@Table({ tableName: "medical_records", freezeTableName: true })
export class MedicalRecord extends Model<
	MedicalRecord,
	IMedicalRecordCreationAttr
> {
	@ApiProperty({
		example: 1,
		description: "Medical record's unique id number",
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
		example: "Hypertension",
		description: "Diagnosis",
	})
	@Column({ type: DataType.STRING })
	declare diagnosis: string;

	@ApiProperty({
		example: "Medication",
		description: "Treatment",
	})
	@Column({ type: DataType.STRING })
	declare treatment: string;

	@ApiProperty({
		example: "2025-05-01",
		description: "Visit date",
	})
	@Column({ type: DataType.DATE })
	declare visit_date: Date;

	@ApiProperty({
		example: "Patient stable",
		description: "Notes",
	})
	@Column({ type: DataType.TEXT })
	declare notes: string;
	@BelongsTo(() => Patient)
	patient: Patient;
	@BelongsTo(() => Doctor)
	doctor: Doctor;
	@HasMany(() => MedPrescription)
	medPrescriptions: MedPrescription[];
}
