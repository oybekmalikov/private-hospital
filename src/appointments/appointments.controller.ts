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
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { Appointment } from "./models/appointment.model";

@Controller("appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @ApiOperation({ summary: "Add Appointment" })
  @ApiResponse({ status: 201, description: "Create Appointment", type: Appointment })
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @ApiOperation({ summary: "Get All Appointments" })
  @ApiResponse({ status: 200, description: "List of Appointments", type: [Appointment] })
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @ApiOperation({ summary: "Get One Appointment By Id" })
  @ApiResponse({ status: 200, description: "Appointment's info", type: Appointment })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Appointment By Id" })
  @ApiResponse({
    status: 200,
    description: "Appointment's updated info",
    type: [Appointment],
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @ApiOperation({ summary: "Delete One Appointment By Id" })
  @ApiResponse({ status: 200, description: "Return Effected", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.appointmentsService.remove(+id);
  }
}