import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreatePatientAdmissionDto } from "./dto/create-patient_admission.dto";
import { UpdatePatientAdmissionDto } from "./dto/update-patient_admission.dto";
import { PatientAdmission } from "./models/patient_admission.model";

@Injectable()
export class PatientAdmissionsService {
	constructor(
		@InjectModel(PatientAdmission)
		private readonly patientAdmiisionModel: typeof PatientAdmission
	) {}
	create(createPatientAdmissionDto: CreatePatientAdmissionDto) {
		return this.patientAdmiisionModel.create(createPatientAdmissionDto);
	}

	findAll() {
		return this.patientAdmiisionModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.patientAdmiisionModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updatePatientAdmissionDto: UpdatePatientAdmissionDto) {
		return this.patientAdmiisionModel.update(updatePatientAdmissionDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.patientAdmiisionModel.destroy({ where: { id } });
	}
}
