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
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { MedicinesService } from "./medicines.service";
import { Medicine } from "./models/medicine.model";

@Controller("medicines")
export class MedicinesController {
	constructor(private readonly medicinesService: MedicinesService) {}

	@ApiOperation({ summary: "Add Medicine" })
	@ApiResponse({ status: 201, description: "Create Medicine", type: Medicine })
	@Post()
	@UseGuards(new AccessControlGuard(accessMatrix, "medicines"))
	@UseGuards(AuthGuard)
	create(@Body() createMedicineDto: CreateMedicineDto) {
		return this.medicinesService.create(createMedicineDto);
	}

	@ApiOperation({ summary: "Get All Medicines" })
	@ApiResponse({
		status: 200,
		description: "List of Medicines",
		type: [Medicine],
	})
	@Get()
	findAll() {
		return this.medicinesService.findAll();
	}

	@ApiOperation({ summary: "Get One Medicine By Id" })
	@ApiResponse({ status: 200, description: "Medicine's info", type: Medicine })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.medicinesService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Medicine By Id" })
	@ApiResponse({
		status: 200,
		description: "Medicine's updated info",
		type: [Medicine],
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "medicines"))
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedicineDto: UpdateMedicineDto
	) {
		return this.medicinesService.update(+id, updateMedicineDto);
	}

	@ApiOperation({ summary: "Delete One Medicine By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(new AccessControlGuard(accessMatrix, "medicines"))
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medicinesService.remove(+id);
	}
}
