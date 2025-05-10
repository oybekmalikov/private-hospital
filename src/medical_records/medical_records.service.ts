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
	async findByDoctorId(id: number) {
		const data = await this.medicalRecordModel.findAll({
			where: { doctor_id: id },
			include: { all: true },
		});
		if (!data.length) {
			return {
				status: false,
				message: "You don't have any medical record data",
			};
		}
		return data;
	}
	async findByPatientId(id: number) {
		const data = await this.medicalRecordModel.findAll({
			where: { patient_id: id },
			include: { all: true },
		});
		if (!data.length) {
			return {
				status: false,
				message: "You don't have any medical record data",
			};
		}
		return data;
	}
	async findOneByDoctorId(id: number, docId: number) {
		const data = await this.medicalRecordModel.findOne({
			where: { id, doctor_id: docId },
			include: { all: true },
		});
		if (!data) {
			return { status: false, message: "You can access only your own data." };
		}
		return data;
	}
	async findOneByPatientId(id: number, patientId: number) {
		const data = await this.medicalRecordModel.findOne({
			where: { id, patient_id: patientId },
			include: { all: true },
		});
		if (!data) {
			return { status: false, message: "You can access only your own data." };
		}
		return data;
	}
}
