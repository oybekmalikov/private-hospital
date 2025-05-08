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
import { HservicesService } from "./hservices.service";
import { CreateHserviceDto } from "./dto/create-hservice.dto";
import { UpdateHserviceDto } from "./dto/update-hservice.dto";
import { HService } from "./models/hservice.model";

@Controller("services")
export class HservicesController {
  constructor(private readonly servicesService: HservicesService) {}

  @ApiOperation({ summary: "Add Service" })
  @ApiResponse({ status: 201, description: "Create Service", type: HService })
  @Post()
  create(@Body() createServiceDto: CreateHserviceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @ApiOperation({ summary: "Get All Services" })
  @ApiResponse({ status: 200, description: "List of Services", type: [HService] })
  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @ApiOperation({ summary: "Get One Service By Id" })
  @ApiResponse({ status: 200, description: "Service's info", type: HService })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Service By Id" })
  @ApiResponse({
    status: 200,
    description: "Service's updated info",
    type: [HService],
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateHserviceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @ApiOperation({ summary: "Delete One Service By Id" })
  @ApiResponse({ status: 200, description: "Return Effected", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.servicesService.remove(+id);
  }
}