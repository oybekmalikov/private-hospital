import { Injectable } from "@nestjs/common";
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
}
