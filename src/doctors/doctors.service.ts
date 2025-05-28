import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as bcrypt from "bcrypt";
import { Sequelize } from "sequelize-typescript";
import { Appointment } from "../appointments/models/appointment.model";
import { Payment } from "../payments/models/payment.model";
import { ChangePasswordDto } from "./dto/change-pass.dto";
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
	async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
		console.log(changePasswordDto);
		if (changePasswordDto.password !== changePasswordDto.confirm) {
			return { message: "Password and confirm password not matched" };
		}
		await this.doctorModel.update(
			{ password: changePasswordDto.password },
			{ where: { id } }
		);
		return { message: "Password changed" };
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
	async updateRefreshToken(doctorId: number, refreshToken: string) {
		const updatedDoctor = this.doctorModel.update(
			{
				refresh_token: refreshToken,
			},
			{ where: { id: doctorId } }
		);
		return updatedDoctor;
	}
	async totalPaymentToDoctor() {
		return await this.doctorModel.findAll({
			attributes: [
				"id",
				"first_name",
				"last_name",
				[
					Sequelize.fn("SUM", Sequelize.col("appointments.payments.amount")),
					"total_income",
				],
			],
			include: [
				{
					model: Appointment,
					as: "appointments",
					attributes: [],
					include: [
						{
							model: Payment,
							as: "payments",
							attributes: [],
						},
					],
				},
			],
			group: ["Doctor.id"],
			order: [[Sequelize.literal("total_income"), "DESC"]],
		});
	}
}
