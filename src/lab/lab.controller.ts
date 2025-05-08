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
import { LabService } from "./lab.service";
import { CreateLabDto } from "./dto/create-lab.dto";
import { UpdateLabDto } from "./dto/update-lab.dto";
import { Lab } from "./models/lab.model";

@Controller("labaratory")
export class LabController {
  constructor(private readonly labsService: LabService) {}

  @ApiOperation({ summary: "Add Lab Record" })
  @ApiResponse({ status: 201, description: "Create Lab Record", type: Lab })
  @Post()
  create(@Body() createLabDto: CreateLabDto) {
    return this.labsService.create(createLabDto);
  }

  @ApiOperation({ summary: "Get All Lab Records" })
  @ApiResponse({ status: 200, description: "List of Lab Records", type: [Lab] })
  @Get()
  findAll() {
    return this.labsService.findAll();
  }

  @ApiOperation({ summary: "Get One Lab Record By Id" })
  @ApiResponse({ status: 200, description: "Lab Record's info", type: Lab })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.labsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Lab Record By Id" })
  @ApiResponse({
    status: 200,
    description: "Lab Record's updated info",
    type: [Lab],
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLabDto: UpdateLabDto) {
    return this.labsService.update(+id, updateLabDto);
  }

  @ApiOperation({ summary: "Delete One Lab Record By Id" })
  @ApiResponse({ status: 200, description: "Return Effected", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.labsService.remove(+id);
  }
}