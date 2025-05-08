import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMedicineCategoryDto } from "./dto/create-medicine_category.dto";
import { UpdateMedicineCategoryDto } from "./dto/update-medicine_category.dto";
import { MedicineCategory } from "./models/medicine_category.model";

@Injectable()
export class MedicineCategoriesService {
	constructor(
		@InjectModel(MedicineCategory)
		private readonly medicineCategoryModel: typeof MedicineCategory
	) {}
	create(createMedicineCategoryDto: CreateMedicineCategoryDto) {
		return this.medicineCategoryModel.create(createMedicineCategoryDto);
	}

	findAll() {
		return this.medicineCategoryModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.medicineCategoryModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateMedicineCategoryDto: UpdateMedicineCategoryDto) {
		return this.medicineCategoryModel.update(updateMedicineCategoryDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.medicineCategoryModel.destroy({ where: { id } });
	}
}
