import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { HservicesController } from "./hservices.controller";
import { HservicesService } from "./hservices.service";
import { HService } from "./models/hservice.model";

@Module({
	imports: [SequelizeModule.forFeature([HService])],
	controllers: [HservicesController],
	providers: [HservicesService],
})
export class HservicesModule {}
