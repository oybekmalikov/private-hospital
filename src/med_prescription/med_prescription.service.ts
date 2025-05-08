import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMedPrescriptionDto } from "./dto/create-med_prescription.dto";
import { UpdateMedPrescriptionDto } from "./dto/update-med_prescription.dto";
import { MedPrescription } from "./models/med_prescription.model";

@Injectable()
export class MedPrescriptionService {
	constructor(
		@InjectModel(MedPrescription)
		private readonly medPrescriptionModel: typeof MedPrescription
	) {}
	create(createMedPrescriptionDto: CreateMedPrescriptionDto) {
		return this.medPrescriptionModel.create(createMedPrescriptionDto);
	}

	findAll() {
		return this.medPrescriptionModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.medPrescriptionModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateMedPrescriptionDto: UpdateMedPrescriptionDto) {
		return this.medPrescriptionModel.update(updateMedPrescriptionDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.medPrescriptionModel.destroy({ where: { id } });
	}
}
