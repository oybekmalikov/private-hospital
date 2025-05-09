import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { StaffsModule } from "../staffs/staffs.module";
import { AuthStaffsController } from "./auth_staffs.controller";
import { AuthStaffsService } from "./auth_staffs.service";

@Module({
	imports: [StaffsModule, JwtModule.register({ global: true })],
	controllers: [AuthStaffsController],
	providers: [AuthStaffsService],
})
export class AuthStaffsModule {}
