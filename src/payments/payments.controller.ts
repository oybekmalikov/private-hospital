import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { PaymentsService } from "./payments.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { Payment } from "./models/payment.model";

@Controller("payments")
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: "Add Payment" })
  @ApiResponse({ status: 201, description: "Create Payment", type: Payment })
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @ApiOperation({ summary: "Get All Payments" })
  @ApiResponse({ status: 200, description: "List of Payments", type: [Payment] })
  @Get()
  findAll() {
    return this.paymentsService.findAll();
  }

  @ApiOperation({ summary: "Get One Payment By Id" })
  @ApiResponse({ status: 200, description: "Payment's info", type: Payment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.paymentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Payment By Id" })
  @ApiResponse({
    status: 200,
    description: "Payment's updated info",
    type: [Payment],
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(+id, updatePaymentDto);
  }

  @ApiOperation({ summary: "Delete One Payment By Id" })
  @ApiResponse({ status: 200, description: "Return Effected", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.paymentsService.remove(+id);
  }
}