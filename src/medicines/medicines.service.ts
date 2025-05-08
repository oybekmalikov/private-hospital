import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMedicineDto } from "./dto/create-medicine.dto";
import { UpdateMedicineDto } from "./dto/update-medicine.dto";
import { Medicine } from "./models/medicine.model";

@Injectable()
export class MedicinesService {
	constructor(
		@InjectModel(Medicine) private readonly medicineModel: typeof Medicine
	) {}
	create(createMedicineDto: CreateMedicineDto) {
		return this.medicineModel.create(createMedicineDto);
	}

	findAll() {
		return this.medicineModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.medicineModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateMedicineDto: UpdateMedicineDto) {
		return this.medicineModel.update(updateMedicineDto, { where: { id } });
	}

	remove(id: number) {
		return this.medicineModel.destroy({ where: { id } });
	}
}
