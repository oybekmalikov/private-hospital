import {
	Body,
	Controller,
	Delete,
	ForbiddenException,
	Get,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/Guards/access-control.guard";
import { AuthGuard } from "../common/Guards/auth.guard";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./models/payment.model";
import { PaymentsService } from "./payments.service";

@Controller("payments")
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@ApiOperation({ summary: "Add Payment" })
	@ApiResponse({ status: 201, description: "Create Payment", type: Payment })
	@UseGuards(
		new AccessControlGuard(
			{ payments: ["superadmin", "admin", "manager"] },
			"payments"
		)
	)
	@UseGuards(AuthGuard)
	@Post()
	create(@Body() createPaymentDto: CreatePaymentDto) {
		return this.paymentsService.create(createPaymentDto);
	}

	@ApiOperation({ summary: "Get All Payments" })
	@ApiResponse({
		status: 200,
		description: "List of Payments",
		type: [Payment],
	})
	@UseGuards(new AccessControlGuard(accessMatrix, "payments"))
	@UseGuards(AuthGuard)
	@Get()
	findAll(@Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("manager")
		) {
			return this.paymentsService.findAll();
		} else if (user.roles.includes("doctor")) {
			return this.paymentsService.findByDoctorId(user.id);
		} else if (user.roles.includes("patient")) {
			return this.paymentsService.findByPatientId(user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Get One Payment By Id" })
	@ApiResponse({ status: 200, description: "Payment's info", type: Payment })
	@UseGuards(new AccessControlGuard(accessMatrix, "payments"))
	@UseGuards(AuthGuard)
	@Get(":id")
	findOne(@Param("id") id: string, @Req() req: Request) {
		const user = (req as any).user;
		if (
			user.roles.includes("admin") ||
			user.roles.includes("superadmin") ||
			user.roles.includes("manager")
		) {
			return this.paymentsService.findOne(+id);
		} else if (user.roles.includes("doctor")) {
			return this.paymentsService.findOneByDoctorId(+id, user.id);
		} else if (user.roles.includes("patient")) {
			return this.paymentsService.findOneByPatientId(+id, user.id);
		}
		throw new ForbiddenException("Access denied");
	}

	@ApiOperation({ summary: "Update Payment By Id" })
	@ApiResponse({
		status: 200,
		description: "Payment's updated info",
		type: [Payment],
	})
	@UseGuards(
		new AccessControlGuard(
			{ payments: ["superadmin", "admin", "manager"] },
			"payments"
		)
	)
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
		return this.paymentsService.update(+id, updatePaymentDto);
	}

	@ApiOperation({ summary: "Delete One Payment By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(
		new AccessControlGuard(
			{ payments: ["superadmin", "admin", "manager"] },
			"payments"
		)
	)
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.paymentsService.remove(+id);
	}
}
