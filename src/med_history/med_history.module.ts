import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedHistoryController } from "./med_history.controller";
import { MedHistoryService } from "./med_history.service";
import { MedHistory } from "./models/med_history.model";

@Module({
	imports: [SequelizeModule.forFeature([MedHistory])],
	controllers: [MedHistoryController],
	providers: [MedHistoryService],
})
export class MedHistoryModule {}
