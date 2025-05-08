import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { LabController } from "./lab.controller";
import { LabService } from "./lab.service";
import { Lab } from "./models/lab.model";

@Module({
	imports: [SequelizeModule.forFeature([Lab])],
	controllers: [LabController],
	providers: [LabService],
})
export class LabModule {}
