import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PatientsModule } from "../patients/patients.module";
import { AuthPatientsController } from "./auth_patients.controller";
import { AuthPatientsService } from "./auth_patients.service";

@Module({
	imports: [PatientsModule, JwtModule.register({ global: true })],
	controllers: [AuthPatientsController],
	providers: [AuthPatientsService],
})
export class AuthPatientsModule {}
