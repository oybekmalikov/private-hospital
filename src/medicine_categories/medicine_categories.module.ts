import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MedicineCategoriesController } from "./medicine_categories.controller";
import { MedicineCategoriesService } from "./medicine_categories.service";
import { MedicineCategory } from "./models/medicine_category.model";

@Module({
	imports: [SequelizeModule.forFeature([MedicineCategory])],
	controllers: [MedicineCategoriesController],
	providers: [MedicineCategoriesService],
})
export class MedicineCategoriesModule {}
