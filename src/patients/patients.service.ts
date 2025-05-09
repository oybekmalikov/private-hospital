import {
	BadRequestException,
	Injectable,
	ServiceUnavailableException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { CreatePatientDto } from "./dto/create-patient.dto";
import { UpdatePatientDto } from "./dto/update-patient.dto";
import { Patient } from "./models/patient.model";
@Injectable()
export class PatientsService {
	constructor(
		@InjectModel(Patient) private readonly patientModel: typeof Patient,
		private readonly mailService: MailService
	) {}
	async create(createPatientDto: CreatePatientDto) {
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
		try {
			await this.mailService.sendMail(newPatient);
		} catch (error) {
			console.log(error);
			throw new ServiceUnavailableException({
				message: "Error on sending activation to email",
			});
		}
		return {
			message: "Patient created, activation link sent to email",
			newPatient,
		};
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
	async updateRefreshToken(patientId: number, refreshToken: string) {
		const updatedPatient = this.patientModel.update(
			{
				refresh_token: refreshToken,
			},
			{ where: { id: patientId } }
		);
		return updatedPatient;
	}
	async activation(link: string) {
		if (!link) {
			throw new BadRequestException({
				message: "Activation link not found",
			});
		}
		const updatedUser = await this.patientModel.update(
			{ is_active: true },
			{ where: { activation_link: link, is_active: false }, returning: true }
		);
		if (!updatedUser[1][0]) {
			throw new BadRequestException({
				message: "User already activated",
			});
		}
		return {
			message: "User successfully activated!",
			is_active: updatedUser[1][0].is_active,
		};
	}
}
