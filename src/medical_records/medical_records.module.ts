import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicalRecordsController } from "./medical_records.controller";
import { MedicalRecordsService } from "./medical_records.service";
import { MedicalRecord } from "./models/medical_record.model";

@Module({
	imports: [SequelizeModule.forFeature([MedicalRecord])],
	controllers: [MedicalRecordsController],
	providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
