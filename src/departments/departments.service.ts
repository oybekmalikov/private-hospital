import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { Department } from "./models/department.model";

@Injectable()
export class DepartmentsService {
	constructor(
		@InjectModel(Department) private readonly departmentModel: typeof Department
	) {}
	create(createDepartmentDto: CreateDepartmentDto) {
		return this.departmentModel.create(createDepartmentDto);
	}

	findAll() {
		return this.departmentModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.departmentModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
		return this.departmentModel.update(updateDepartmentDto, { where: { id } });
	}

	remove(id: number) {
		return this.departmentModel.destroy({ where: { id } });
	}
}
