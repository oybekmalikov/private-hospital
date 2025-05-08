import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { PatientAdmission } from "./models/patient_admission.model";
import { PatientAdmissionsController } from "./patient_admissions.controller";
import { PatientAdmissionsService } from "./patient_admissions.service";

@Module({
	imports: [SequelizeModule.forFeature([PatientAdmission])],
	controllers: [PatientAdmissionsController],
	providers: [PatientAdmissionsService],
})
export class PatientAdmissionsModule {}
