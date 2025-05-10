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
import { DepartmentsService } from "./departments.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { Department } from "./models/department.model";

@Controller("departments")
export class DepartmentsController {
	constructor(private readonly departmentsService: DepartmentsService) {}

	@ApiOperation({ summary: "Add Department" })
	@ApiResponse({
		status: 201,
		description: "Create Department",
		type: Department,
	})
	@UseGuards(
		new AccessControlGuard(
			{ departments: ["superadmin", "manager"] },
			"departments"
		)
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createDepartmentDto: CreateDepartmentDto) {
		return this.departmentsService.create(createDepartmentDto);
	}

	@ApiOperation({ summary: "Get All Departments" })
	@ApiResponse({
		status: 200,
		description: "List of Departments",
		type: [Department],
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "departments"))
	@UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.departmentsService.findAll();
	}

	@ApiOperation({ summary: "Get One Department By Id" })
	@ApiResponse({
		status: 200,
		description: "Department's info",
		type: Department,
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "departments"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.departmentsService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Department By Id" })
	@ApiResponse({
		status: 200,
		description: "Department's updated info",
		type: [Department],
	})
	@UseGuards(
		new AccessControlGuard(
			{ departments: ["superadmin", "manager"] },
			"departments"
		)
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateDepartmentDto: UpdateDepartmentDto
	) {
		return this.departmentsService.update(+id, updateDepartmentDto);
	}

	@ApiOperation({ summary: "Delete One Department By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard(
			{ departments: ["superadmin", "manager"] },
			"departments"
		)
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.departmentsService.remove(+id);
	}
}
