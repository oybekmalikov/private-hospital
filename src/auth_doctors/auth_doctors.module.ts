import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DoctorsModule } from "../doctors/doctors.module";
import { AuthDoctorsController } from "./auth_doctors.controller";
import { AuthDoctorsService } from "./auth_doctors.service";

@Module({
	imports: [DoctorsModule, JwtModule.register({ global: true })],
	controllers: [AuthDoctorsController],
	providers: [AuthDoctorsService],
})
export class AuthDoctorsModule {}
