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
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import { MedicalRecordsService } from "./medical_records.service";
import { MedicalRecord } from "./models/medical_record.model";

@Controller("medical-records")
export class MedicalRecordsController {
	constructor(private readonly medicalRecordsService: MedicalRecordsService) {}

	@ApiOperation({ summary: "Add Medical Record" })
	@ApiResponse({
		status: 201,
		description: "Create Medical Record",
		type: MedicalRecord,
	})
	@Post()
	create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
		return this.medicalRecordsService.create(createMedicalRecordDto);
	}

	@ApiOperation({ summary: "Get All Medical Records" })
	@ApiResponse({
		status: 200,
		description: "List of Medical Records",
		type: [MedicalRecord],
	})
	@Get()
	findAll() {
		return this.medicalRecordsService.findAll();
	}

	@ApiOperation({ summary: "Get One Medical Record By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical Record's info",
		type: MedicalRecord,
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.medicalRecordsService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Medical Record By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical Record's updated info",
		type: [MedicalRecord],
	})
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedicalRecordDto: UpdateMedicalRecordDto
	) {
		return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
	}

	@ApiOperation({ summary: "Delete One Medical Record By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medicalRecordsService.remove(+id);
	}
}
