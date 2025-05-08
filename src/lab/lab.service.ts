import { Injectable } from "@nestjs/common";
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
}
