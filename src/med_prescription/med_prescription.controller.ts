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
import { MedPrescriptionService } from "./med_prescription.service";
import { CreateMedPrescriptionDto } from "./dto/create-med_prescription.dto";
import { UpdateMedPrescriptionDto } from "./dto/update-med_prescription.dto";
import { MedPrescription } from "./models/med_prescription.model";

@Controller("med-prescriptions")
export class MedPrescriptionsController {
  constructor(private readonly medPrescriptionsService: MedPrescriptionService) {}

  @ApiOperation({ summary: "Add Medication Prescription" })
  @ApiResponse({ status: 201, description: "Create Medication Prescription", type: MedPrescription })
  @Post()
  create(@Body() createMedPrescriptionDto: CreateMedPrescriptionDto) {
    return this.medPrescriptionsService.create(createMedPrescriptionDto);
  }

  @ApiOperation({ summary: "Get All Medication Prescriptions" })
  @ApiResponse({ status: 200, description: "List of Medication Prescriptions", type: [MedPrescription] })
  @Get()
  findAll() {
    return this.medPrescriptionsService.findAll();
  }

  @ApiOperation({ summary: "Get One Medication Prescription By Id" })
  @ApiResponse({ status: 200, description: "Medication Prescription's info", type: MedPrescription })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.medPrescriptionsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Medication Prescription By Id" })
  @ApiResponse({
    status: 200,
    description: "Medication Prescription's updated info",
    type: [MedPrescription],
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMedPrescriptionDto: UpdateMedPrescriptionDto) {
    return this.medPrescriptionsService.update(+id, updateMedPrescriptionDto);
  }

  @ApiOperation({ summary: "Delete One Medication Prescription By Id" })
  @ApiResponse({ status: 200, description: "Return Effected", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.medPrescriptionsService.remove(+id);
  }
}