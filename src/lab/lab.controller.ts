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
import { CreateLabDto } from "./dto/create-lab.dto";
import { UpdateLabDto } from "./dto/update-lab.dto";
import { LabService } from "./lab.service";
import { Lab } from "./models/lab.model";

@Controller("labaratory")
export class LabController {
	constructor(private readonly labsService: LabService) {}

	@ApiOperation({ summary: "Add Lab Record" })
	@ApiResponse({ status: 201, description: "Create Lab Record", type: Lab })
	@UseGuards(
		new AccessControlGuard(
			{ lab: ["superadmin", "admin", "head_doctor"] },
			"lab"
		)
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createLabDto: CreateLabDto) {
		return this.labsService.create(createLabDto);
	}

	@ApiOperation({ summary: "Get All Lab Records" })
	@ApiResponse({ status: 200, description: "List of Lab Records", type: [Lab] })
	@UseGuards(new AccessControlGuard(accessMatrix, "lab"))
	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.labsService.findAll();
		} else if (user.roles.includes("doctor")) {
			return this.labsService.findByDoctorId(user.id);
		} else if (user.roles.includes("patient")) {
			return this.labsService.findByPatientId(user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Get One Lab Record By Id" })
	@ApiResponse({ status: 200, description: "Lab Record's info", type: Lab })
	@UseGuards(new AccessControlGuard(accessMatrix, "lab"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string, @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.labsService.findOne(+id);
		} else if (user.roles.includes("doctor")) {
			return this.labsService.findOneByDoctorId(+id, user.id);
		} else if (user.roles.includes("patient")) {
			return this.labsService.findOneByPatientId(+id, user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Update Lab Record By Id" })
	@ApiResponse({
		status: 200,
		description: "Lab Record's updated info",
		type: [Lab],
	})
	@UseGuards(new AccessControlGuard({ lab: ["superadmin", "admin"] }, "lab"))
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateLabDto: UpdateLabDto) {
		return this.labsService.update(+id, updateLabDto);
	}

	@ApiOperation({ summary: "Delete One Lab Record By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(new AccessControlGuard({ lab: ["superadmin", "admin"] }, "lab"))
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.labsService.remove(+id);
	}
}
