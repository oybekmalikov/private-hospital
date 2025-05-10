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
import { Appointment } from "../../appointments/models/appointment.model";
import { Department } from "../../departments/models/department.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { PatientAdmission } from "../../patient_admissions/models/patient_admission.model";
import { Schedule } from "../../schedules/models/schedule.model";

interface IDoctorCreationAttr {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone: string;
	gender: string;
	date_of_birth: Date;
	specialization: string;
	experience_year: number;
	department_id: number;
	license_no: string;
	is_active: boolean;
	isHeadDoctor: boolean;
}

@Table({ tableName: "doctors", freezeTableName: true })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Doctor's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "Jane",
		description: "Doctor's first name",
	})
	@Column({ type: DataType.STRING(100) })
	declare first_name: string;

	@ApiProperty({
		example: "Smith",
		description: "Doctor's last name",
	})
	@Column({ type: DataType.STRING(100) })
	declare last_name: string;

	@ApiProperty({
		example: "doctor@example.com",
		description: "Doctor's unique email",
	})
	@Column({ type: DataType.STRING(100), unique: true })
	declare email: string;

	@ApiProperty({
		example: "mySecretPassword",
		description: "Doctor's strong password",
	})
	@Column({ type: DataType.STRING })
	declare password: string;

	@ApiProperty({
		example: "+998901234567",
		description: "Doctor's phone number",
	})
	@Column({ type: DataType.STRING(20) })
	declare phone: string;

	@ApiProperty({
		example: "male/female/other",
		description: "Doctor's gender",
	})
	@Column({ type: DataType.STRING(20) })
	declare gender: string;

	@ApiProperty({
		example: "1985-05-15",
		description: "Doctor's date of birth",
	})
	@Column({ type: DataType.DATE })
	declare date_of_birth: Date;

	@ApiProperty({
		example: "Cardiologist",
		description: "Doctor's specialization",
	})
	@Column({ type: DataType.STRING(100) })
	declare specialization: string;

	@ApiProperty({
		example: 10,
		description: "Doctor's years of experience",
	})
	@Column({ type: DataType.INTEGER })
	declare experience_year: number;
	@ApiProperty({
		example: 1,
		description: "Doctor's department id",
	})
	@ForeignKey(() => Department)
	@Column({ type: DataType.INTEGER })
	declare department_id: number;

	@ApiProperty({
		example: "LIC12345",
		description: "Doctor's license number",
	})
	@Column({ type: DataType.STRING(50) })
	declare license_no: string;

	@ApiProperty({
		example: "true/false",
		description: "Doctor's is active?",
	})
	@Column({ type: DataType.BOOLEAN })
	declare is_active: boolean;
	@ApiProperty({
		example: "true/false",
		description: "Doctor's is head doctor?",
	})
	@Column({ type: DataType.BOOLEAN })
	declare isHeadDoctor: boolean;

	@ApiProperty({
		example: "...",
		description: "Doctor's refresh token",
	})
	@Column({ type: DataType.STRING })
	declare refresh_token: string;
	@BelongsTo(() => Department)
	department: Department;
	@HasMany(() => PatientAdmission)
	patientAdmissions: PatientAdmission[];
	@HasMany(() => Schedule)
	schedules: Schedule[];
	@HasMany(() => MedicalRecord)
	medicalRecords: MedicalRecord[];
	@HasMany(() => Appointment)
	appoinment: Appointment[];
}
