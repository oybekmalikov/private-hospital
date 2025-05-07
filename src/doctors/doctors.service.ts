import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./models/doctor.model";

@Injectable()
export class DoctorsService {
	constructor(
		@InjectModel(Doctor) private readonly doctorService: typeof Doctor
	) {}
	create(createDoctorDto: CreateDoctorDto) {
		return this.doctorService.create(createDoctorDto);
	}

	findAll() {
		return this.doctorService.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.doctorService.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateDoctorDto: UpdateDoctorDto) {
		return this.doctorService.update(updateDoctorDto, { where: { id } });
	}

	remove(id: number) {
		return this.doctorService.destroy({ where: { id } });
	}
}
