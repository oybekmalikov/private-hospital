import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/Guards/access-control.guard";
import { AuthGuard } from "../common/Guards/auth.guard";
import { CreateMedicineCategoryDto } from "./dto/create-medicine_category.dto";
import { UpdateMedicineCategoryDto } from "./dto/update-medicine_category.dto";
import { MedicineCategoriesService } from "./medicine_categories.service";
import { MedicineCategory } from "./models/medicine_category.model";

@Controller("medicine-categories")
export class MedicineCategoriesController {
	constructor(
		private readonly medicineCategoriesService: MedicineCategoriesService
	) {}

	@ApiOperation({ summary: "Add Medicine Category" })
	@ApiResponse({
		status: 201,
		description: "Create Medicine Category",
		type: MedicineCategory,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "medicine_categories"))
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createMedicineCategoryDto: CreateMedicineCategoryDto) {
		return this.medicineCategoriesService.create(createMedicineCategoryDto);
	}

	@ApiOperation({ summary: "Get All Medicine Categories" })
	@ApiResponse({
		status: 200,
		description: "List of Medicine Categories",
		type: [MedicineCategory],
	})
	@Get()
	findAll() {
		return this.medicineCategoriesService.findAll();
	}

	@ApiOperation({ summary: "Get One Medicine Category By Id" })
	@ApiResponse({
		status: 200,
		description: "Medicine Category's info",
		type: MedicineCategory,
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.medicineCategoriesService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Medicine Category By Id" })
	@ApiResponse({
		status: 200,
		description: "Medicine Category's updated info",
		type: [MedicineCategory],
	})
	@Patch(":id")
	@UseGuards(new AccessControlGuard(accessMatrix, "medicine_categories"))
	@UseGuards(AuthGuard)
	update(
		@Param("id") id: string,
		@Body() updateMedicineCategoryDto: UpdateMedicineCategoryDto
	) {
		return this.medicineCategoriesService.update(
			+id,
			updateMedicineCategoryDto
		);
	}

	@ApiOperation({ summary: "Delete One Medicine Category By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(new AccessControlGuard(accessMatrix, "medicine_categories"))
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medicineCategoriesService.remove(+id);
	}
}
