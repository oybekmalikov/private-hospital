import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";
import { Schedule } from "./models/schedule.model";

@Injectable()
export class SchedulesService {
	constructor(
		@InjectModel(Schedule) private readonly schedulesModel: typeof Schedule
	) {}
	create(createScheduleDto: CreateScheduleDto) {
		return this.schedulesModel.create(createScheduleDto);
	}

	findAll() {
		return this.schedulesModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.schedulesModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateScheduleDto: UpdateScheduleDto) {
		return this.schedulesModel.update(updateScheduleDto, { where: { id } });
	}

	remove(id: number) {
		return this.schedulesModel.destroy({ where: { id } });
	}
}
