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
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Schedule } from "./models/schedule.model";
import { SchedulesService } from "./schedules.service";

@Controller("schedules")
export class SchedulesController {
	constructor(private readonly schedulesService: SchedulesService) {}

	@ApiOperation({ summary: "Add Schedule" })
	@ApiResponse({ status: 201, description: "Create Schedule", type: Schedule })
	@Post()
	create(@Body() createScheduleDto: CreateScheduleDto) {
		return this.schedulesService.create(createScheduleDto);
	}

	@ApiOperation({ summary: "Get All Schedules" })
	@ApiResponse({
		status: 200,
		description: "List of Schedules",
		type: [Schedule],
	})
	@Get()
	findAll() {
		return this.schedulesService.findAll();
	}

	@ApiOperation({ summary: "Get One Schedule By Id" })
	@ApiResponse({ status: 200, description: "Schedule's info", type: Schedule })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.schedulesService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Schedule By Id" })
	@ApiResponse({
		status: 200,
		description: "Schedule's updated info",
		type: [Schedule],
	})
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateScheduleDto: UpdateScheduleDto
	) {
		return this.schedulesService.update(+id, updateScheduleDto);
	}

	@ApiOperation({ summary: "Delete One Schedule By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.schedulesService.remove(+id);
	}
}
