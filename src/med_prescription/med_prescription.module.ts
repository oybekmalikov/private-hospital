import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicalRecordsModule } from "../medical_records/medical_records.module";
import { MedPrescriptionsController } from "./med_prescription.controller";
import { MedPrescriptionService } from "./med_prescription.service";
import { MedPrescription } from "./models/med_prescription.model";

@Module({
	imports: [
		SequelizeModule.forFeature([MedPrescription]),
		MedicalRecordsModule,
	],
	controllers: [MedPrescriptionsController],
	providers: [MedPrescriptionService],
})
export class MedPrescriptionModule {}
