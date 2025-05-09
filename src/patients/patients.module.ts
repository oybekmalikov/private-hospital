import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MailModule } from "../mail/mail.module";
import { Patient } from "./models/patient.model";
import { PatientsController } from "./patients.controller";
import { PatientsService } from "./patients.service";

@Module({
	imports: [SequelizeModule.forFeature([Patient]), MailModule],
	controllers: [PatientsController],
	providers: [PatientsService],
	exports: [PatientsService],
})
export class PatientsModule {}
