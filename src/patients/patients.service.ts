import {
	BadRequestException,
	ConflictException,
	Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./models/patient.model";
@Injectable()
export class PatientsService {
	constructor(
		@InjectModel(Patient) private readonly patientModel: typeof Patient
	) {}
	async create(createPatientDto: CreatePatientDto) {
		const condidate = await this.findByEmail(createPatientDto.email);
		if (condidate) {
			throw new ConflictException(`${createPatientDto.email} already exists`);
		}
		const { password, confirm_password } = createPatientDto;
		if (password !== confirm_password) {
			throw new BadRequestException({
				message: "password and confirm password not matched",
			});
		}
		const hashshed_password = await bcrypt.hash(password, 7);
		const newPatient = await this.patientModel.create({
			...createPatientDto,
			password: hashshed_password,
		});
		// try {
		// 	await this.mailService.sendMail(newPatient);
		// } catch (error) {
		// 	console.log(error);
		// 	throw new ServiceUnavailableException({
		// 		message: "Error on sending activation to email",
		// 	});
		// }
		return newPatient;
	}

	findAll() {
		return this.patientModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.patientModel.findByPk(id, { include: { all: true } });
	}
	findByEmail(email: string) {
		return this.patientModel.findOne({ where: { email } });
	}

	update(id: number, updatePatientDto: UpdatePatientDto) {
		return this.patientModel.update(updatePatientDto, { where: { id } });
	}

	remove(id: number) {
		return this.patientModel.destroy({ where: { id } });
	}
}
