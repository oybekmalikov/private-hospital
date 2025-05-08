import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateMedHistoryDto } from "./dto/create-med_history.dto";
import { UpdateMedHistoryDto } from "./dto/update-med_history.dto";
import { MedHistoryService } from "./med_history.service";
import { MedHistory } from "./models/med_history.model";

@Controller("med-history")
export class MedHistoryController {
	constructor(private readonly medHistoryService: MedHistoryService) {}

	@ApiOperation({ summary: "Add Medical History" })
	@ApiResponse({
		status: 201,
		description: "Create Medical History",
		type: MedHistory,
	})
	@Post()
	create(@Body() createMedHistoryDto: CreateMedHistoryDto) {
		return this.medHistoryService.create(createMedHistoryDto);
	}

	@ApiOperation({ summary: "Get All Medical Histories" })
	@ApiResponse({
		status: 200,
		description: "List of Medical Histories",
		type: [MedHistory],
	})
	@Get()
	findAll() {
		return this.medHistoryService.findAll();
	}

	@ApiOperation({ summary: "Get One Medical History By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical History's info",
		type: MedHistory,
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.medHistoryService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Medical History By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical History's updated info",
		type: [MedHistory],
	})
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedHistoryDto: UpdateMedHistoryDto
	) {
		return this.medHistoryService.update(+id, updateMedHistoryDto);
	}

	@ApiOperation({ summary: "Delete One Medical History By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medHistoryService.remove(+id);
	}
}
