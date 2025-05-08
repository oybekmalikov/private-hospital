import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMedicalRecordDto } from "./dto/create-medical_record.dto";
import { UpdateMedicalRecordDto } from "./dto/update-medical_record.dto";
import { MedicalRecord } from "./models/medical_record.model";

@Injectable()
export class MedicalRecordsService {
	constructor(
		@InjectModel(MedicalRecord)
		private readonly medicalRecordModel: typeof MedicalRecord
	) {}
	create(createMedicalRecordDto: CreateMedicalRecordDto) {
		return this.medicalRecordModel.create(createMedicalRecordDto);
	}

	findAll() {
		return this.medicalRecordModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.medicalRecordModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
		return this.medicalRecordModel.update(updateMedicalRecordDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.medicalRecordModel.destroy({ where: { id } });
	}
}
