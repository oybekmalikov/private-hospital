import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppointmentsService } from "../appointments/appointments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./models/payment.model";

@Injectable()
export class PaymentsService {
	constructor(
		@InjectModel(Payment) private readonly paymentModel: typeof Payment,
		private readonly appointmentService: AppointmentsService
	) {}
	create(createPaymentDto: CreatePaymentDto) {
		return this.paymentModel.create(createPaymentDto);
	}

	findAll() {
		return this.paymentModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.paymentModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updatePaymentDto: UpdatePaymentDto) {
		return this.paymentModel.update(updatePaymentDto, { where: { id } });
	}

	remove(id: number) {
		return this.paymentModel.destroy({ where: { id } });
	}
	async findByDoctorId(doctorId: number) {
		const paymentForDoctor =
			await this.appointmentService.findByDoctorId(doctorId);
		if ("message" in paymentForDoctor) {
			return { message: "You don't have any payment data" };
		}
		const result: Payment[] = [];
		const allPayment = await this.paymentModel.findAll();
		paymentForDoctor.forEach((data1) => {
			allPayment.forEach((data2) => {
				if (data1.id == data2.appointment_id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any payment data";
		}
		return result;
	}

	async findByPatientId(patientId: number) {
		const paymentForPatient =
			await this.appointmentService.findByDoctorId(patientId);
		if ("message" in paymentForPatient) {
			return { message: "You don't have any payment data" };
		}
		const result: Payment[] = [];
		const allPayment = await this.paymentModel.findAll();
		paymentForPatient.forEach((data1) => {
			allPayment.forEach((data2) => {
				if (data1.id == data2.appointment_id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any payment data";
		}
		return result;
	}
	async findOneByDoctorId(id: number, docId: number) {
		const paymentForDoctor =
			await this.appointmentService.findByDoctorId(docId);
		if ("message" in paymentForDoctor) {
			return { message: "You don't have any payment data" };
		}
		const result: Payment[] = [];
		const allPayment = await this.paymentModel.findAll();
		paymentForDoctor.forEach((data1) => {
			allPayment.forEach((data2) => {
				if (data1.id == data2.appointment_id && data2.id == id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any payment data";
		}
		return result;
	}
	async findOneByPatientId(id: number, patientId: number) {
		const paymentForDoctor =
			await this.appointmentService.findByDoctorId(patientId);
		if ("message" in paymentForDoctor) {
			return { message: "You don't have any payment data" };
		}
		const result: Payment[] = [];
		const allPayment = await this.paymentModel.findAll();
		paymentForDoctor.forEach((data1) => {
			allPayment.forEach((data2) => {
				if (data1.id == data2.appointment_id && data2.id == id) {
					result.push(data2);
				}
			});
		});
		if (!result.length) {
			return "You don't have any payment data";
		}
		return result;
	}
}
