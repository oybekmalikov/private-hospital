import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppointmentsController } from "./appointments.controller";
import { AppointmentsService } from "./appointments.service";
import { Appointment } from "./models/appointment.model";

@Module({
	imports: [SequelizeModule.forFeature([Appointment])],
	controllers: [AppointmentsController],
	providers: [AppointmentsService],
	exports: [AppointmentsService],
})
export class AppointmentsModule {}
