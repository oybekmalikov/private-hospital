import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Medicine } from "../../medicines/models/medicine.model";

interface IMedicineCategoryCreationAttr {
	name: string;
	description: string;
}

@Table({ tableName: "medicine_categories", freezeTableName: true })
export class MedicineCategory extends Model<
	MedicineCategory,
	IMedicineCategoryCreationAttr
> {
	@ApiProperty({
		example: 1,
		description: "Medicine category's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: "Parasetamol",
		description: "Name of the medicine category",
	})
	@Column({ type: DataType.STRING(100) })
	declare name: string;

	@ApiProperty({
		example: "Medicines for pain management",
		description: "Description",
	})
	@Column({ type: DataType.TEXT })
	declare description: string;
	@HasMany(() => Medicine)
	medicines: Medicine[];
}
