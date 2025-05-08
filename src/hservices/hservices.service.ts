import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateHserviceDto } from "./dto/create-hservice.dto";
import { UpdateHserviceDto } from "./dto/update-hservice.dto";
import { HService } from "./models/hservice.model";

@Injectable()
export class HservicesService {
	constructor(
		@InjectModel(HService) private readonly hserviceModel: typeof HService
	) {}
	create(createHserviceDto: CreateHserviceDto) {
		return this.hserviceModel.create(createHserviceDto);
	}

	findAll() {
		return this.hserviceModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.hserviceModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateHserviceDto: UpdateHserviceDto) {
		return this.hserviceModel.update(updateHserviceDto, { where: { id } });
	}

	remove(id: number) {
		return this.hserviceModel.destroy({ where: { id } });
	}
}
