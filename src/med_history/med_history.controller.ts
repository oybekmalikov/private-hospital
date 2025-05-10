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
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/Guards/access-control.guard";
import { AuthGuard } from "../common/Guards/auth.guard";
import { CreateMedHistoryDto } from "./dto/create-med_history.dto";
import { UpdateMedHistoryDto } from "./dto/update-med_history.dto";
import { MedHistoryService } from "./med_history.service";
import { MedHistory } from "./models/med_history.model";
import { Request } from 'express'

@Controller("med-history")
export class MedHistoryController {
	constructor(private readonly medHistoryService: MedHistoryService) {}

	@ApiOperation({ summary: "Add Medical History" })
	@ApiResponse({
		status: 201,
		description: "Create Medical History",
		type: MedHistory,
	})
	@UseGuards(
		new AccessControlGuard(
			{ med_history: ["superadmin", "admin", "head_doctor", "doctor"] },
			"med_history"
		)
	)
	@UseGuards(AuthGuard)
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
	@UseGuards(new AccessControlGuard(accessMatrix, "med_history"))
	@UseGuards(AuthGuard)
	@Get()
	findAll( @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.medHistoryService.findAll();
		} else if (user.roles.includes("patient")) {
			return this.medHistoryService.findByPatientId( user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Get One Medical History By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical History's info",
		type: MedHistory,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "med_history"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string, @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("head_doctor")
		) {
			return this.medHistoryService.findOne(+id);
		} else if (user.roles.includes("patient")) {
			return this.medHistoryService.findOneByPatientId(+id, user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Update Medical History By Id" })
	@ApiResponse({
		status: 200,
		description: "Medical History's updated info",
		type: [MedHistory],
	})
	@UseGuards(
		new AccessControlGuard(
			{ med_history: ["superadmin", "admin"] },
			"med_history"
		)
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateMedHistoryDto: UpdateMedHistoryDto
	) {
		return this.medHistoryService.update(+id, updateMedHistoryDto);
	}

	@ApiOperation({ summary: "Delete One Medical History By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard(
			{ med_history: ["superadmin", "admin"] },
			"med_history"
		)
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.medHistoryService.remove(+id);
	}
}
