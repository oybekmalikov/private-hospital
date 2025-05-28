import { Injectable } from "@nestjs/common";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { AppointmentsService } from "../appointments/appointments.service";
import { DoctorsService } from "../doctors/doctors.service";
import { SchedulesService } from "../schedules/schedules.service";
import { FindDoctorByTimeDto } from "./dto/find-doctor-time.dto";

@Injectable()
export class AdditionalTasksService {
	constructor(
		private readonly schedulesService: SchedulesService,
		private readonly appoinmentService: AppointmentsService,
		private readonly sequelize: Sequelize,
		private readonly doctorService: DoctorsService
	) {}
	async isDoctorAvailable(dto: FindDoctorByTimeDto) {
		const schedule = await this.schedulesService.findDoctorByTime(
			dto.doctor_id,
			dto.day,
			dto.time
		);
		if (!schedule) {
			return {
				message: `Doctor ${dto.day} kuni soat ${dto.time} vaqtda ishlamaydi`,
			};
		}
		const isBusy = await this.appoinmentService.isBUsy(
			dto.doctor_id,
			dto.day,
			dto.time
		);
		if (isBusy) {
			return { message: `Doctor ${dto.day} kuni soat ${dto.time} vaqtda band` };
		}
		return { message: `Doctor ${dto.day} kuni soat ${dto.time} vaqtda bo'sh` };
	}
	async busyDoctorInDep(departmentName: string) {
		return this.sequelize.query(
			`
    SELECT 
      d.first_name AS doctor_name,
      d.last_name AS doctor_second_name,
      dp.name AS department,
      COUNT(a.id) AS appointment_count
    from appointments a
    JOIN doctors d ON a.doctor_id = d.id
    JOIN departments dp ON d.department_id = dp.id
		WHERe dp.name='${departmentName}'
    GROUP BY d.id, dp.name
    order BY appointment_count DESC;
  `,
			{
				type: QueryTypes.SELECT,
			}
		);
	}
	async getDoctorAppoinment(docId: number) {
		return await this.appoinmentService.getDoctorAppointments(docId);
	}
	async getPatientHistory(patientId: number) {
		return await this.appoinmentService.getPatientHistory(patientId);
	}
	async totalPaymentToDoctor() {
		return await this.doctorService.totalPaymentToDoctor();
	}
}
