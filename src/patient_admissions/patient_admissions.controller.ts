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
import { CreatePatientAdmissionDto } from "./dto/create-patient_admission.dto";
import { UpdatePatientAdmissionDto } from "./dto/update-patient_admission.dto";
import { PatientAdmission } from "./models/patient_admission.model";
import { PatientAdmissionsService } from "./patient_admissions.service";

@Controller("patient-admissions")
export class PatientAdmissionsController {
	constructor(
		private readonly patientAdmissionsService: PatientAdmissionsService
	) {}

	@ApiOperation({ summary: "Add Patient Admission" })
	@ApiResponse({
		status: 201,
		description: "Create Patient Admission",
		type: PatientAdmission,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "patient_admissions"))
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createPatientAdmissionDto: CreatePatientAdmissionDto) {
		return this.patientAdmissionsService.create(createPatientAdmissionDto);
	}

	@ApiOperation({ summary: "Get All Patient Admissions" })
	@ApiResponse({
		status: 200,
		description: "List of Patient Admissions",
		type: [PatientAdmission],
	})
	@Get()
	findAll() {
		return this.patientAdmissionsService.findAll();
	}

	@ApiOperation({ summary: "Get One Patient Admission By Id" })
	@ApiResponse({
		status: 200,
		description: "Patient Admission's info",
		type: PatientAdmission,
	})
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.patientAdmissionsService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Patient Admission By Id" })
	@ApiResponse({
		status: 200,
		description: "Patient Admission's updated info",
		type: [PatientAdmission],
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "patient_admissions"))
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updatePatientAdmissionDto: UpdatePatientAdmissionDto
	) {
		return this.patientAdmissionsService.update(+id, updatePatientAdmissionDto);
	}

	@ApiOperation({ summary: "Delete One Patient Admission By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(new AccessControlGuard(accessMatrix, "patient_admissions"))
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.patientAdmissionsService.remove(+id);
	}
}
