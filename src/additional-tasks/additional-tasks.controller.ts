import { Body, Controller, Get, Post } from "@nestjs/common";
import { AdditionalTasksService } from "./additional-tasks.service";
import { FindDoctorByTimeDto } from "./dto/find-doctor-time.dto";

@Controller("additional-tasks")
export class AdditionalTasksController {
	constructor(
		private readonly additionalTasksService: AdditionalTasksService
	) {}
	@Post("find-by-doctor-time")
	async fn1(@Body() dto: FindDoctorByTimeDto) {
		return await this.additionalTasksService.isDoctorAvailable(dto);
	}
	@Get("get-busy-doc-in-dep")
	async fn2(@Body() body: any) {
		return await this.additionalTasksService.busyDoctorInDep(
			body.departmentName
		);
	}
	@Post("doctor-appoinment")
	async fn3(@Body() doctorId: any) {
		return await this.additionalTasksService.getDoctorAppoinment(
			doctorId.doctorId!
		);
	}
	@Post("patient-appoinment-history")
	async fn4(@Body() patient: any) {
		return await this.additionalTasksService.getDoctorAppoinment(
			patient.patientId!
		);
	}
	@Get("total-payment-to-doctor")
	async fn5() {
		return await this.additionalTasksService.totalPaymentToDoctor();
	}
}
