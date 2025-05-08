import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Schedule } from "./models/schedule.model";
import { SchedulesController } from "./schedules.controller";
import { SchedulesService } from "./schedules.service";

@Module({
	imports: [SequelizeModule.forFeature([Schedule])],
	controllers: [SchedulesController],
	providers: [SchedulesService],
})
export class SchedulesModule {}
