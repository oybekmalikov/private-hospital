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
import { Patient } from "../../patients/models/patient.model";
import { Payment } from "../../payments/models/payment.model";
import { HService } from '../../hservices/models/hservice.model'

interface IAppointmentCreationAttr {
	patient_id: number;
	doctor_id: number;
	service_id: number;
	appointment_date: Date;
	status: string;
	note: string;
}

@Table({ tableName: "appointments", freezeTableName: true })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Appointment's unique id number",
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
		example: 1,
		description: "Service's ID",
	})
	@ForeignKey(()=>HService)
	@Column({ type: DataType.INTEGER })
	declare service_id: number;
	@ApiProperty({
		example: "2025-05-01",
		description: "Date of the appointment",
	})
	@Column({ type: DataType.DATE })
	declare appointment_date: Date;

	@ApiProperty({
		example: "Additional note",
		description: "Note of the appointment",
	})
	@Column({ type: DataType.TEXT })
	declare note: string;

	@ApiProperty({
		example: "confirmed",
		description: "Status of the appointment",
	})
	@Column({ type: DataType.STRING })
	declare status: string;
	@BelongsTo(() => Patient)
	patient: Patient;
	@BelongsTo(() => Doctor)
	doctor: Doctor;
	@HasMany(() => Payment)
	payments: Payment[];
	@BelongsTo(()=>HService)
	hservice:HService
}
