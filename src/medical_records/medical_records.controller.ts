import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Request } from "express";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/Guards/access-control.guard";
import { AuthGuard } from "../common/Guards/auth.guard";
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
	@UseGuards(
		new AccessControlGuard(
			{ medical_records: ["superadmin", "head_doctor", "doctor"] },
			"medical_records"
		)
	)
	@UseGuards(AuthGuard)
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
	@UseGuards(new AccessControlGuard(accessMatrix, "medical_records"))
	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.medicalRecordsService.findAll();
		} else if (user.roles.includes("doctor")) {
			return this.medicalRecordsService.findByDoctorId(user.id);
		} else if (user.roles.includes("patient")) {
			return this.medicalRecordsService.findByPatientId(user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Get One Medical Record By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical Record's info",
		type: MedicalRecord,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "medical_records"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string, @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.medicalRecordsService.findOne(+id);
		} else if (user.roles.includes("doctor")) {
			return this.medicalRecordsService.findOneByDoctorId(+id, user.id);
		} else if (user.roles.includes("patient")) {
			return this.medicalRecordsService.findOneByPatientId(+id, user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Update Medical Record By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical Record's updated info",
		type: [MedicalRecord],
	})
	@UseGuards(
		new AccessControlGuard(
			{ medical_records: ["superadmin", "admin"] },
			"medical_records"
		)
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedicalRecordDto: UpdateMedicalRecordDto
	) {
		return this.medicalRecordsService.update(+id, updateMedicalRecordDto);
	}

	@ApiOperation({ summary: "Delete One Medical Record By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard(
			{ medical_records: ["superadmin", "admin"] },
			"medical_records"
		)
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medicalRecordsService.remove(+id);
	}
}
