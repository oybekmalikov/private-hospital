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
import { Room } from "../../rooms/models/room.model";

interface IPatientAdmissionCreationAttr {
	patient_id: number;
	room_id: number;
	admission_date: Date;
	discharge_date: Date;
	doctor_id: number;
	status: string;
}

@Table({ tableName: "patient_admissions", freezeTableName: true })
export class PatientAdmission extends Model<
	PatientAdmission,
	IPatientAdmissionCreationAttr
> {
	@ApiProperty({
		example: 1,
		description: "Patient admission's unique id number",
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
		description: "Room's ID",
	})
	@ForeignKey(() => Room)
	@Column({ type: DataType.INTEGER })
	declare room_id: number;

	@ApiProperty({
		example: "2025-05-01",
		description: "Admission date",
	})
	@Column({ type: DataType.DATE })
	declare admission_date: Date;

	@ApiProperty({
		example: "2025-05-10",
		description: "Discharge date",
	})
	@Column({ type: DataType.DATE })
	declare discharge_date: Date;

	@ApiProperty({
		example: 1,
		description: "Doctor's ID",
	})
	@ForeignKey(() => Doctor)
	@Column({ type: DataType.INTEGER })
	declare doctor_id: number;

	@ApiProperty({
		example: "admitted",
		description: "Status of the admission",
	})
	@Column({ type: DataType.STRING })
	declare status: string;
	@BelongsTo(() => Patient)
	patient: Patient;
	@BelongsTo(() => Room)
	room: Room;
	@BelongsTo(() => Doctor)
	doctor: Doctor;
}
