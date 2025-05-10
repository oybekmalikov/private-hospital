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
import { SelfGuard } from "../common/Guards/self.guard";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./models/patient.model";
import { PatientsService } from "./patients.service";

@Controller("patients")
export class PatientsController {
	constructor(private readonly patientsService: PatientsService) {}

	@ApiOperation({ summary: "Add Patient" })
	@ApiResponse({ status: 201, description: "Create Patient", type: Patient })
	@UseGuards(
		new AccessControlGuard({ patients: ["superadmin", "admin"] }, "patients")
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createPatientDto: CreatePatientDto) {
		return this.patientsService.create(createPatientDto);
	}

	@ApiOperation({ summary: "Get All Patients" })
	@ApiResponse({
		status: 200,
		description: "List of Patients",
		type: [Patient],
	})
	@UseGuards(
		new AccessControlGuard(
			{ patients: ["superadmin", "admin", "head_doctor"] },
			"patients"
		)
	)
	@UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.patientsService.findAll();
	}

	@ApiOperation({ summary: "Get One Patient By Id" })
	@ApiResponse({ status: 200, description: "Patient's info", type: Patient })
	@UseGuards(
		new AccessControlGuard(accessMatrix, "patients"),
		new SelfGuard("id", "id")
	)
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.patientsService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Patient By Id" })
	@ApiResponse({
		status: 200,
		description: "Patient's updated info",
		type: [Patient],
	})
	@UseGuards(
		new AccessControlGuard({ patients: ["superadmin", "admin"] }, "patients")
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updatePatientDto: UpdatePatientDto) {
		return this.patientsService.update(+id, updatePatientDto);
	}

	@ApiOperation({ summary: "Delete One Patient By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard({ patients: ["superadmin", "admin"] }, "patients")
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.patientsService.remove(+id);
	}
	@ApiOperation({ summary: "Activate Patient" })
	@ApiResponse({
		status: 200,
		description: "message, is_active?",
		type: Object,
	})
	@Get("activate/:link")
	activateUser(@Param("link") link: string) {
		return this.patientsService.activation(link);
	}
}
