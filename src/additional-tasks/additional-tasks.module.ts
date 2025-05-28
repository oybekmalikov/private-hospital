import { Module } from "@nestjs/common";
import { AppointmentsModule } from "../appointments/appointments.module";
import { DoctorsModule } from "../doctors/doctors.module";
import { SchedulesModule } from "../schedules/schedules.module";
import { AdditionalTasksController } from "./additional-tasks.controller";
import { AdditionalTasksService } from "./additional-tasks.service";

@Module({
	imports: [SchedulesModule, AppointmentsModule, DoctorsModule],
	controllers: [AdditionalTasksController],
	providers: [AdditionalTasksService],
})
export class AdditionalTasksModule {}
