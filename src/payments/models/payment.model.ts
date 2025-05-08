import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { HService } from "../../hservices/models/hservice.model";
import { Patient } from "../../patients/models/patient.model";

interface IPaymentCreationAttr {
	patient_id: number;
	amount: number;
	service_id: number;
	appointment_id: number;
	date: Date;
	type: string;
	status: string;
}

@Table({ tableName: "payments", freezeTableName: true })
export class Payment extends Model<Payment, IPaymentCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Payment's unique id number",
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
		description: "Amount paid",
	})
	@Column({ type: DataType.DECIMAL(10, 2) })
	declare amount: number;

	@ApiProperty({
		example: 1,
		description: "Service's ID",
	})
	@ForeignKey(() => HService)
	@Column({ type: DataType.INTEGER })
	declare service_id: number;
	@ApiProperty({
		example: 1,
		description: "Appointment's ID",
	})
	@ForeignKey(() => Appointment)
	@Column({ type: DataType.INTEGER })
	declare appointment_id: number;
	@ApiProperty({
		example: "2025-05-01",
		description: "Date of the payment",
	})
	@Column({ type: DataType.DATE })
	declare date: Date;
	@ApiProperty({
		example: "cash",
		description: "Payment type",
	})
	@Column({ type: DataType.ENUM("cash", "card", "online") })
	declare type: string;
	@ApiProperty({
		example: "paid",
		description: "Payment status",
	})
	@Column({ type: DataType.ENUM("paid", "unpaid", "pending") })
	declare status: string;
	@BelongsTo(() => Patient)
	patient: Patient;
	@BelongsTo(() => HService)
	hservice: HService;
	@BelongsTo(() => Appointment)
	appointment: Appointment;
}
