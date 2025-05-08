import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { UpdateDoctorDto } from "./dto/update-doctor.dto";
import { Doctor } from "./models/doctor.model";
@Injectable()
export class DoctorsService {
	constructor(
		@InjectModel(Doctor) private readonly doctorModel: typeof Doctor
	) {}
	async create(createDoctorDto: CreateDoctorDto) {
		const condidate = await this.findByEmail(createDoctorDto.email);
		if (condidate) {
			throw new ConflictException(`${createDoctorDto.email} already exists`);
		}
		const hashshedPassword = await bcrypt.hash(createDoctorDto.password, 7);
		const newDoctor = this.doctorModel.create({
			...createDoctorDto,
			password: hashshedPassword,
		});
		return newDoctor;
	}

	findAll() {
		return this.doctorModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.doctorModel.findByPk(id, { include: { all: true } });
	}
	findByEmail(email: string) {
		return this.doctorModel.findOne({ where: { email } });
	}

	update(id: number, updateDoctorDto: UpdateDoctorDto) {
		return this.doctorModel.update(updateDoctorDto, { where: { id } });
	}

	remove(id: number) {
		return this.doctorModel.destroy({ where: { id } });
	}
}
