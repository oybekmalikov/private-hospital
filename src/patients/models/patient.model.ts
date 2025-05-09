import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { MedHistory } from "../../med_history/models/med_history.model";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { PatientAdmission } from "../../patient_admissions/models/patient_admission.model";
import { Payment } from "../../payments/models/payment.model";

interface IPatientCreationAttr {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	confirm_password: string;
	phone: string;
	gender: string;
	date_of_birth: Date;
	address: string;
	is_active: boolean;
}

@Table({ tableName: "patients", freezeTableName: true })
export class Patient extends Model<Patient, IPatientCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Patient's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "Alice",
		description: "Patient's first name",
	})
	@Column({ type: DataType.STRING(100) })
	declare first_name: string;

	@ApiProperty({
		example: "Johnson",
		description: "Patient's last name",
	})
	@Column({ type: DataType.STRING(100) })
	declare last_name: string;

	@ApiProperty({
		example: "patient@example.com",
		description: "Patient's unique email",
	})
	@Column({ type: DataType.STRING(100), unique: true })
	declare email: string;

	@ApiProperty({
		example: "mySecretPassword",
		description: "Patient's strong password",
	})
	@Column({ type: DataType.STRING })
	declare password: string;

	@ApiProperty({
		example: "+998901234567",
		description: "Patient's phone number",
	})
	@Column({ type: DataType.STRING(20) })
	declare phone: string;

	@ApiProperty({
		example: "female",
		description: "Patient's gender",
	})
	@Column({ type: DataType.STRING(20) })
	declare gender: string;

	@ApiProperty({
		example: "1995-03-22",
		description: "Patient's date of birth",
	})
	@Column({ type: DataType.DATE })
	declare date_of_birth: Date;
	@ApiProperty({
		example: "Tasshkent, Amir Temur st 69",
		description: "Patient's address",
	})
	@Column({ type: DataType.STRING })
	declare address: string;
	@ApiProperty({
		example: "true/false",
		description: "Patient's is active?",
	})
	@Column({ type: DataType.BOOLEAN })
	declare is_active: boolean;

	@ApiProperty({
		example: "...",
		description: "Patient's refresh token",
	})
	@Column({ type: DataType.STRING })
	declare refresh_token: string;
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	declare activation_link: string;
	@HasMany(() => PatientAdmission)
	patientAdmissions: PatientAdmission[];
	@HasMany(() => Payment)
	payments: Payment[];
	@HasMany(() => MedicalRecord)
	medicalRecords: MedicalRecord[];
	@HasMany(() => MedHistory)
	medHistories: MedHistory[];
}
