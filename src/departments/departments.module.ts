import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { DepartmentsController } from "./departments.controller";
import { DepartmentsService } from "./departments.service";
import { Department } from "./models/department.model";

@Module({
	imports: [SequelizeModule.forFeature([Department])],
	controllers: [DepartmentsController],
	providers: [DepartmentsService],
})
export class DepartmentsModule {}
