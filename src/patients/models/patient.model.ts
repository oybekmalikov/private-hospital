import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IPatientCreationDto {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone: string;
	gender: string;
	date_of_birth: Date;
	address: string;
	is_active: boolean;
}

@Table({ tableName: "patients", freezeTableName: true })
export class Patient extends Model<Patient, IPatientCreationDto> {
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
	@Column({ type: DataType.STRING(50) })
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
}
