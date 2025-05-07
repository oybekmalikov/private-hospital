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
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Staff } from "./models/staff.model";
import { StaffsService } from "./staffs.service";

@Controller("staffs")
export class StaffsController {
	constructor(private readonly staffsService: StaffsService) {}

	@ApiOperation({ summary: "Add Staff" })
	@ApiResponse({ status: 201, description: "Create Staff", type: Staff })
	@Post()
	create(@Body() createStaffDto: CreateStaffDto) {
		return this.staffsService.create(createStaffDto);
	}

	@ApiOperation({ summary: "Get All Staffs" })
	@ApiResponse({ status: 200, description: "List of Staffs", type: [Staff] })
	@Get()
	findAll() {
		return this.staffsService.findAll();
	}

	@ApiOperation({ summary: "Get One Staff By Id" })
	@ApiResponse({ status: 200, description: "Staff's info", type: Staff })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.staffsService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Staff By Id" })
	@ApiResponse({
		status: 200,
		description: "Staff's updated info",
		type: [Staff],
	})
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
		return this.staffsService.update(+id, updateStaffDto);
	}

	@ApiOperation({ summary: "Delete One Staff By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.staffsService.remove(+id);
	}
}
