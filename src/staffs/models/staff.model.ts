import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";

interface IStaffCreationAttr {
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	phone: string;
	gender: string;
	date_of_birth: Date;
	position: string;
	department_id: number;
	is_active: boolean;
}

@Table({ tableName: "staffs", freezeTableName: true })
export class Staff extends Model<Staff, IStaffCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Staff's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "John",
		description: "Staff's first name",
	})
	@Column({ type: DataType.STRING(100) })
	declare first_name: string;

	@ApiProperty({
		example: "Doe",
		description: "Staff's last name",
	})
	@Column({ type: DataType.STRING(100) })
	declare last_name: string;

	@ApiProperty({
		example: "staff@example.com",
		description: "Staff's unique email",
	})
	@Column({ type: DataType.STRING(100), unique: true })
	declare email: string;

	@ApiProperty({
		example: "mySecretPassword",
		description: "Staff's strong password",
	})
	@Column({ type: DataType.STRING })
	declare password: string;

	@ApiProperty({
		example: "+998901234567",
		description: "Staff's phone number",
	})
	@Column({ type: DataType.STRING(20) })
	declare phone: string;

	@ApiProperty({
		example: "male/female/other",
		description: "Staff's gender",
	})
	@Column({ type: DataType.STRING(20) })
	declare gender: string;

	@ApiProperty({
		example: "1990-01-01",
		description: "Staff's date of birth",
	})
	@Column({ type: DataType.DATE })
	declare date_of_birth: Date;

	@ApiProperty({
		example: "Nurse",
		description: "Staff's position",
	})
	@Column({ type: DataType.STRING(100) })
	declare position: string;

	@ApiProperty({
		example: "true/false",
		description: "Staff's is active?",
	})
	@Column({ type: DataType.BOOLEAN })
	declare is_active: boolean;

	@ApiProperty({
		example: 1,
		description: "Staff's department id",
	})
	@ForeignKey(() => Department)
	@Column({ type: DataType.INTEGER })
	declare department_id: number;

	@ApiProperty({
		example: "...",
		description: "Staff's refresh token",
	})
	@Column({ type: DataType.STRING })
	declare refresh_token: string;
	@BelongsTo(() => Department)
	department: Department;
}
