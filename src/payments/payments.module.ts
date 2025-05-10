import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppointmentsModule } from "../appointments/appointments.module";
import { Payment } from "./models/payment.model";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.service";

@Module({
	imports: [SequelizeModule.forFeature([Payment]), AppointmentsModule],
	controllers: [PaymentsController],
	providers: [PaymentsService],
})
export class PaymentsModule {}
