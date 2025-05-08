import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Appointment } from "../../appointments/models/appointment.model";
import { Payment } from "../../payments/models/payment.model";

interface IHServiceCreationDto {
	name: string;
	description: string;
	price: number;
}

@Table({ tableName: "services", freezeTableName: true })
export class HService extends Model<HService, IHServiceCreationDto> {
	@ApiProperty({
		example: 1,
		description: "Service's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "Consultation",
		description: "Name of the service",
	})
	@Column({ type: DataType.STRING(100) })
	declare name: string;

	@ApiProperty({
		example: "General health checkup",
		description: "Description of the service",
	})
	@Column({ type: DataType.STRING })
	declare description: string;

	@ApiProperty({
		example: 150.0,
		description: "Price of the service",
	})
	@Column({ type: DataType.DECIMAL(10, 2) })
	declare price: number;
	@HasMany(() => Appointment)
	appointment: Appointment[];
	@HasMany(() => Payment)
	payment: Payment[];
}
