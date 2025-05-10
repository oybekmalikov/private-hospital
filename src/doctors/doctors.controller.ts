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
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./models/doctor.model";

@Controller("doctors")
export class DoctorsController {
	constructor(private readonly doctorsService: DoctorsService) {}

	@ApiOperation({ summary: "Add Doctor" })
	@ApiResponse({ status: 201, description: "Create Doctor", type: Doctor })
	@UseGuards(
		new AccessControlGuard({ doctors: ["superadmin", "admin"] }, "doctors")
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createDoctorDto: CreateDoctorDto) {
		return this.doctorsService.create(createDoctorDto);
	}

	@ApiOperation({ summary: "Get All Doctors" })
	@ApiResponse({ status: 200, description: "List of Doctors", type: [Doctor] })
	@UseGuards(
		new AccessControlGuard(
			{ doctors: ["superadmin", "admin", "head_doctor"] },
			"doctors"
		)
	)
	@UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.doctorsService.findAll();
	}

	@ApiOperation({ summary: "Get One Doctor By Id" })
	@ApiResponse({ status: 200, description: "Doctor's info", type: Doctor })
	@UseGuards(
		new AccessControlGuard(accessMatrix, "doctors"),
		new SelfGuard("id", "id")
	)
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.doctorsService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Doctor By Id" })
	@ApiResponse({
		status: 200,
		description: "Doctor's updated info",
		type: [Doctor],
	})
	@UseGuards(
		new AccessControlGuard({ doctors: ["superadmin", "admin"] }, "doctors")
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
		return this.doctorsService.update(+id, updateDoctorDto);
	}

	@ApiOperation({ summary: "Delete One Doctor By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard({ doctors: ["superadmin", "admin"] }, "doctors")
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.doctorsService.remove(+id);
	}
}
