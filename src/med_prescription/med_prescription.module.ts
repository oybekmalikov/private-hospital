import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedPrescriptionsController } from "./med_prescription.controller";
import { MedPrescriptionService } from "./med_prescription.service";
import { MedPrescription } from "./models/med_prescription.model";

@Module({
	imports: [SequelizeModule.forFeature([MedPrescription])],
	controllers: [MedPrescriptionsController],
	providers: [MedPrescriptionService],
})
export class MedPrescriptionModule {}
