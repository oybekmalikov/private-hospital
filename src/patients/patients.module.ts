import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Patient } from "./models/patient.model";
import { PatientsController } from "./patients.controller";
import { PatientsService } from "./patients.service";

@Module({
	imports: [SequelizeModule.forFeature([Patient])],
	controllers: [PatientsController],
	providers: [PatientsService],
})
export class PatientsModule {}
