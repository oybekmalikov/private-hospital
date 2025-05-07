import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorsController } from "./doctors.controller";
import { DoctorsService } from "./doctors.service";
import { Doctor } from "./models/doctor.model";

@Module({
	imports: [SequelizeModule.forFeature([Doctor])],
	controllers: [DoctorsController],
	providers: [DoctorsService],
})
export class DoctorsModule {}
