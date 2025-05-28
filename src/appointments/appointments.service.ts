import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Doctor } from "../doctors/models/doctor.model";
import { Patient } from "../patients/models/patient.model";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./models/appointment.model";
import { Department } from '../departments/models/department.model'

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
	async isBUsy(doctorId: number, date: string, time) {
		const isBusy = await this.appointmentModel.findOne({
			where: {
				doctor_id: doctorId,
			},
		});
		// console.log(
		// 	isBusy?.appointment_date.toString().split("T")[0] == date &&
		// 		isBusy?.appointment_date.toString().split("T")[1].split(".")[0] ==
		// 			`${time}:00`
		// );
		if (
			isBusy?.appointment_date.toString().split(" ")[0] == date.slice(0, 3) &&
			isBusy?.appointment_date.toString().split(" ")[4] == `${time}:00`
		) {
			return isBusy;
		} else {
			return false;
		}
	}
	async getDoctorAppointments(doctorId: number) {
		return this.appointmentModel.findAll({
			where: { doctor_id: doctorId },
			include: [
				{
					model: Patient,
					attributes: ["first_name", "last_name", "phone"],
				},
				{
					model: Doctor,
					attributes: ["first_name", "last_name", "specialization"],
				},
			],
			attributes: ["appointment_date", "status"],
			order: [["appointment_date", "ASC"]],
		});
	}
	async getPatientHistory(patientId: number) {
  return this.appointmentModel.findAll({
    where: { patient_id: patientId },
    include: [
      {
        model: Doctor,
        attributes: ['first_name','last_name'],
        include: [
          {
            model: Department,
            attributes: ['name'],
          }
        ]
      }
    ],
    attributes: ['appointment_date', 'status', 'notes'],
    order: [['appointment_date', 'DESC']],
  });
}

}
