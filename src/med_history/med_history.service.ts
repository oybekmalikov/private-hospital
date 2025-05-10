import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateMedHistoryDto } from "./dto/create-med_history.dto";
import { UpdateMedHistoryDto } from "./dto/update-med_history.dto";
import { MedHistory } from "./models/med_history.model";

@Injectable()
export class MedHistoryService {
	constructor(
		@InjectModel(MedHistory) private readonly medHistoryModel: typeof MedHistory
	) {}
	create(createMedHistoryDto: CreateMedHistoryDto) {
		return this.medHistoryModel.create(createMedHistoryDto);
	}

	findAll() {
		return this.medHistoryModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.medHistoryModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateMedHistoryDto: UpdateMedHistoryDto) {
		return this.medHistoryModel.update(updateMedHistoryDto, { where: { id } });
	}

	remove(id: number) {
		return this.medHistoryModel.destroy({ where: { id } });
	}
	async findByPatientId(id: number) {
		const data = await this.medHistoryModel.findAll({
			where: { patient_id: id },
			include: { all: true },
		});
		if (!data.length) {
			return { message: "You don't have any medical history data" };
		}
		return data;
	}
	async findOneByPatientId(id: number, patientId: number) {
		const data = await this.medHistoryModel.findOne({
			where: { id, patient_id: patientId },
			include: { all: true },
		});
		if (!data) {
			throw new ForbiddenException("You can access only your own data.");
		}
		return data;
	}
}
