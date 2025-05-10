import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MedicalRecordsService } from "../medical_records/medical_records.service";
import { CreateMedPrescriptionDto } from "./dto/create-med_prescription.dto";
import { UpdateMedPrescriptionDto } from "./dto/update-med_prescription.dto";
import { MedPrescription } from "./models/med_prescription.model";

@Injectable()
export class MedPrescriptionService {
	constructor(
		@InjectModel(MedPrescription)
		private readonly medPrescriptionModel: typeof MedPrescription,
		private readonly medicalRecordService: MedicalRecordsService
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
	async findByDoctorId(id: number) {
		const medicalRecordDataforDoctor =
			await this.medicalRecordService.findByDoctorId(id);
		if (
			"status" in medicalRecordDataforDoctor &&
			"message" in medicalRecordDataforDoctor
		) {
			return "You don't have any medical prescription data";
		}
		const result: MedPrescription[] = [];
		const medPrescriptionDataForDoctor =
			await this.medPrescriptionModel.findAll();
		medicalRecordDataforDoctor.forEach((data) => {
			medPrescriptionDataForDoctor.forEach((data2) => {
				if (data.id == data2.med_rec_id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any medical prescription data";
		}
		return result;
	}
	async findByPatientId(id: number) {
		const medicalRecordDataforPatient =
			await this.medicalRecordService.findByPatientId(id);
		if (
			"status" in medicalRecordDataforPatient &&
			"message" in medicalRecordDataforPatient
		) {
			return "You don't have any medical prescription data";
		}
		const result: MedPrescription[] = [];
		const medPrescriptionDataForPatient =
			await this.medPrescriptionModel.findAll();
		medicalRecordDataforPatient.forEach((data) => {
			medPrescriptionDataForPatient.forEach((data2) => {
				if (data.id == data2.med_rec_id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any medical prescription data";
		}
		return result;
	}
	async findOneByDoctorId(id: number, docId: number) {
		const medicalRecordDataforDoctor =
			await this.medicalRecordService.findByDoctorId(docId);
		if (
			"status" in medicalRecordDataforDoctor &&
			"message" in medicalRecordDataforDoctor
		) {
			return "You don't have any medical prescription data";
		}
		const result: MedPrescription[] = [];
		const medPrescriptionDataForDoctor =
			await this.medPrescriptionModel.findAll();
		medicalRecordDataforDoctor.forEach((data) => {
			medPrescriptionDataForDoctor.forEach((data2) => {
				if (data.id == data2.med_rec_id && data2.id == id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any medical prescription data";
		}
		return result;
	}
	async findOneByPatientId(id: number, patientId: number) {
		const medicalRecordDataforPatient =
			await this.medicalRecordService.findByPatientId(patientId);
		if (
			"status" in medicalRecordDataforPatient &&
			"message" in medicalRecordDataforPatient
		) {
			return "You don't have any medical prescription data";
		}
		const result: MedPrescription[] = [];
		const medPrescriptionDataForPatient =
			await this.medPrescriptionModel.findAll();
		medicalRecordDataforPatient.forEach((data) => {
			medPrescriptionDataForPatient.forEach((data2) => {
				if (data.id == data2.med_rec_id && data2.id == id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any medical prescription data";
		}
		return result;
	}
}
