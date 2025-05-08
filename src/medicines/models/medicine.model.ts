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
import { MedPrescription } from "../../med_prescription/models/med_prescription.model";
import { MedicineCategory } from "../../medicine_categories/models/medicine_category.model";

interface IMedicineCreationAttr {
	name: string;
	description: string;
	category_id: number;
	price: number;
	stock_quantity: number;
	exp_date: Date;
}

@Table({ tableName: "medicines", freezeTableName: true })
export class Medicine extends Model<Medicine, IMedicineCreationAttr> {
	@ApiProperty({
		example: 1,
		description: "Medicine's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "Aspirin",
		description: "Name of the medicine",
	})
	@Column({ type: DataType.STRING(100) })
	declare name: string;

	@ApiProperty({
		example: "Pain relief",
		description: "Description",
	})
	@Column({ type: DataType.TEXT })
	declare description: string;

	@ApiProperty({
		example: 1,
		description: "Category's ID",
	})
	@ForeignKey(() => MedicineCategory)
	@Column({ type: DataType.INTEGER })
	declare category_id: number;

	@ApiProperty({
		example: 50.0,
		description: "Price",
	})
	@Column({ type: DataType.DECIMAL(10, 2) })
	declare price: number;

	@ApiProperty({
		example: 100,
		description: "Stock quantity",
	})
	@Column({ type: DataType.INTEGER })
	declare stock_quantity: number;

	@ApiProperty({
		example: "2025-12-31",
		description: "Expiration date",
	})
	@Column({ type: DataType.DATE })
	declare exp_date: Date;
	@HasMany(() => MedPrescription)
	medPrescriptions: MedPrescription[];
	@BelongsTo(() => MedicineCategory)
	medicineCategory: MedicineCategory;
}
