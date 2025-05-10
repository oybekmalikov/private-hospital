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
import { CreateMedPrescriptionDto } from "./dto/create-med_prescription.dto";
import { UpdateMedPrescriptionDto } from "./dto/update-med_prescription.dto";
import { MedPrescriptionService } from "./med_prescription.service";
import { MedPrescription } from "./models/med_prescription.model";

@Controller("med-prescriptions")
export class MedPrescriptionsController {
	constructor(
		private readonly medPrescriptionsService: MedPrescriptionService
	) {}

	@ApiOperation({ summary: "Add Medication Prescription" })
	@ApiResponse({
		status: 201,
		description: "Create Medication Prescription",
		type: MedPrescription,
	})
	@UseGuards(
		new AccessControlGuard(
			{ med_prescription: ["superadmin", "head_doctor", "doctor"] },
			"med_prescription"
		)
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createMedPrescriptionDto: CreateMedPrescriptionDto) {
		return this.medPrescriptionsService.create(createMedPrescriptionDto);
	}

	@ApiOperation({ summary: "Get All Medication Prescriptions" })
	@ApiResponse({
		status: 200,
		description: "List of Medication Prescriptions",
		type: [MedPrescription],
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "med_prescription"))
	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.medPrescriptionsService.findAll();
		} else if (user.roles.includes("doctor")) {
			return this.medPrescriptionsService.findByDoctorId(user.id);
		} else if (user.roles.includes("patient")) {
			return this.medPrescriptionsService.findByPatientId(user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Get One Medication Prescription By Id" })
	@ApiResponse({
		status: 200,
		description: "Medication Prescription's info",
		type: MedPrescription,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "med_prescription"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string, @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.medPrescriptionsService.findOne(+id);
		} else if (user.roles.includes("doctor")) {
			return this.medPrescriptionsService.findOneByDoctorId(+id, user.id);
		} else if (user.roles.includes("patient")) {
			return this.medPrescriptionsService.findOneByPatientId(+id, user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Update Medication Prescription By Id" })
	@ApiResponse({
		status: 200,
		description: "Medication Prescription's updated info",
		type: [MedPrescription],
	})
	@UseGuards(
		new AccessControlGuard(
			{ med_prescription: ["superadmin", "admin"] },
			"med_prescription"
		)
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedPrescriptionDto: UpdateMedPrescriptionDto
	) {
		return this.medPrescriptionsService.update(+id, updateMedPrescriptionDto);
	}

	@ApiOperation({ summary: "Delete One Medication Prescription By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard(
			{ med_prescription: ["superadmin", "admin"] },
			"med_prescription"
		)
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medPrescriptionsService.remove(+id);
	}
}
