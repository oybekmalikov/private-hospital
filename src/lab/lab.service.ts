import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateLabDto } from "./dto/create-lab.dto";
import { UpdateLabDto } from "./dto/update-lab.dto";
import { Lab } from "./models/lab.model";

@Injectable()
export class LabService {
	constructor(@InjectModel(Lab) private readonly labModel: typeof Lab) {}
	create(createLabDto: CreateLabDto) {
		return this.labModel.create(createLabDto);
	}

	findAll() {
		return this.labModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.labModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateLabDto: UpdateLabDto) {
		return this.labModel.update(updateLabDto, { where: { id } });
	}

	remove(id: number) {
		return this.labModel.destroy({ where: { id } });
	}
	async findByDoctorId(id: number) {
		const data = await this.labModel.findAll({
			where: { doctor_id: id },
			include: { all: true },
		});
		if (!data.length) {
			return { message: "You don't have any labaratory data" };
		}
		return data;
	}
	async findByPatientId(id: number) {
		const data = await this.labModel.findAll({
			where: { patient_id: id },
			include: { all: true },
		});
		if (!data.length) {
			return { message: "You don't have any labaratory data" };
		}
		return data;
	}
	async findOneByDoctorId(id: number, docId: number) {
		const data = await this.labModel.findOne({
			where: { id, doctor_id: docId },
			include: { all: true },
		});
		if (!data) {
			throw new ForbiddenException("You can access only your own data.");
		}
		return data;
	}
	async findOneByPatientId(id: number, patientId: number) {
		const data = await this.labModel.findOne({
			where: { id, patient_id: patientId },
			include: { all: true },
		});
		if (!data) {
			throw new ForbiddenException("You can access only your own data.");
		}
		return data;
	}
}
