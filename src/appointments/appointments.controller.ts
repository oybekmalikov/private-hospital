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
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./models/appointment.model";

@Controller("appointments")
export class AppointmentsController {
	constructor(private readonly appointmentsService: AppointmentsService) {}

	@ApiOperation({ summary: "Add Appointment" })
	@ApiResponse({
		status: 201,
		description: "Create Appointment",
		type: Appointment,
	})
	@UseGuards(
		new AccessControlGuard(
			{ appointments: ["superadmin", "patient"] },
			"appointments"
		)
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createAppointmentDto: CreateAppointmentDto) {
		return this.appointmentsService.create(createAppointmentDto);
	}

	@ApiOperation({ summary: "Get All Appointments" })
	@ApiResponse({
		status: 200,
		description: "List of Appointments",
		type: [Appointment],
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "appointments"))
	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.appointmentsService.findAll();
		} else if (user.roles.includes("doctor")) {
			return this.appointmentsService.findByDoctorId(user.id);
		} else if (user.roles.includes("patient")) {
			return this.appointmentsService.findByPatientId(user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Get One Appointment By Id" })
	@ApiResponse({
		status: 200,
		description: "Appointment's info",
		type: Appointment,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "appointments"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string, @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.appointmentsService.findOne(+id);
		} else if (user.roles.includes("doctor")) {
			return this.appointmentsService.findOneByDoctorId(+id, user.id);
		} else if (user.roles.includes("patient")) {
			return this.appointmentsService.findOneByPatientId(+id, user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Update Appointment By Id" })
	@ApiResponse({
		status: 200,
		description: "Appointment's updated info",
		type: [Appointment],
	})
	@UseGuards(
		new AccessControlGuard(
			{ appointments: ["superadmin", "admin"] },
			"appointments"
		)
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateAppointmentDto: UpdateAppointmentDto
	) {
		return this.appointmentsService.update(+id, updateAppointmentDto);
	}

	@ApiOperation({ summary: "Delete One Appointment By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard(
			{ appointments: ["superadmin", "admin"] },
			"appointments"
		)
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.appointmentsService.remove(+id);
	}
}
