import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./models/appointment.model";

@Injectable()
export class AppointmentsService {
	constructor(
		@InjectModel(Appointment)
		private readonly appointmentModel: typeof Appointment
	) {}
	create(createAppointmentDto: CreateAppointmentDto) {
		return this.appointmentModel.create(createAppointmentDto);
	}

	findAll() {
		return this.appointmentModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.appointmentModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
		return this.appointmentModel.update(updateAppointmentDto, {
			where: { id },
		});
	}

	remove(id: number) {
		return this.appointmentModel.destroy({ where: { id } });
	}
	async findByDoctorId(doctorId: number) {
		const data = await this.appointmentModel.findAll({
			where: { doctor_id: doctorId },
			include: { all: true },
		});
		if (!data.length) {
			return { message: "You don't have any appoinment data" };
		}
		return data;
	}

	async findByPatientId(patientId: number) {
		const data = await this.appointmentModel.findAll({
			where: { patient_id: patientId },
			include: { all: true },
		});
		if (!data.length) {
			return { message: "You don't have any appoinment data" };
		}
		return data;
	}
	async findOneByDoctorId(id: number, docId: number) {
		const data = await this.appointmentModel.findOne({
			where: { id, doctor_id: docId },
			include: { all: true },
		});
		if (!data) {
			throw new ForbiddenException("You can access only your own data.");
		}
		return data;
	}
	async findOneByPatientId(id: number, patientId: number) {
		const data = await this.appointmentModel.findOne({
			where: { id, patient_id: patientId },
			include: { all: true },
		});
		if (!data) {
			throw new ForbiddenException("You can access only your own data.");
		}
		return data;
	}
}
