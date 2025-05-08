import { ApiProperty } from "@nestjs/swagger";
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from "sequelize-typescript";
import { MedicalRecord } from "../../medical_records/models/medical_record.model";
import { Medicine } from "../../medicines/models/medicine.model";

interface IMedPrescriptionCreationAttr {
	med_id: number;
	med_rec_id: number;
	dosage: string;
	frequency: string;
	quantity: number;
	instructions: string;
}

@Table({ tableName: "med_prescription", freezeTableName: true })
export class MedPrescription extends Model<
	MedPrescription,
	IMedPrescriptionCreationAttr
> {
	@ApiProperty({
		example: 1,
		description: "Prescription's unique id number",
	})
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	declare id: number;

	@ApiProperty({
		example: 1,
		description: "Medicine's ID",
	})
	@ForeignKey(() => Medicine)
	@Column({ type: DataType.INTEGER })
	declare med_id: number;

	@ApiProperty({
		example: 1,
		description: "Medical record's ID",
	})
	@ForeignKey(() => MedicalRecord)
	@Column({ type: DataType.INTEGER })
	declare med_rec_id: number;

	@ApiProperty({
		example: "10mg",
		description: "Dosage",
	})
	@Column({ type: DataType.STRING })
	declare dosage: string;

	@ApiProperty({
		example: "Twice daily",
		description: "Frequency",
	})
	@Column({ type: DataType.STRING })
	declare frequency: string;

	@ApiProperty({
		example: 30,
		description: "Quantity",
	})
	@Column({ type: DataType.INTEGER })
	declare quantity: number;

	@ApiProperty({
		example: "Take with food",
		description: "Instructions",
	})
	@Column({ type: DataType.TEXT })
	declare instructions: string;
	@BelongsTo(() => MedicalRecord)
	medicalRecord: MedicalRecord;
	@BelongsTo(() => Medicine)
	medicine: Medicine;
}
