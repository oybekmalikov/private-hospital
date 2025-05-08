import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicinesController } from "./medicines.controller";
import { MedicinesService } from "./medicines.service";
import { Medicine } from "./models/medicine.model";

@Module({
	imports: [SequelizeModule.forFeature([Medicine])],
	controllers: [MedicinesController],
	providers: [MedicinesService],
})
export class MedicinesModule {}
