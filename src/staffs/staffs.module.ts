import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Staff } from "./models/staff.model";
import { StaffsController } from "./staffs.controller";
import { StaffsService } from "./staffs.service";

@Module({
	imports: [SequelizeModule.forFeature([Staff])],
	controllers: [StaffsController],
	providers: [StaffsService],
})
export class StaffsModule {}
