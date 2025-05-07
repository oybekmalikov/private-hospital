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
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./models/room.model";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: "Add Room" })
  @ApiResponse({ status: 201, description: "Create Room", type: Room })
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiOperation({ summary: "Get All Rooms" })
  @ApiResponse({ status: 200, description: "List of Rooms", type: [Room] })
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: "Get One Room By Id" })
  @ApiResponse({ status: 200, description: "Room's info", type: Room })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Room By Id" })
  @ApiResponse({
    status: 200,
    description: "Room's updated info",
    type: [Room],
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @ApiOperation({ summary: "Delete One Room By Id" })
  @ApiResponse({ status: 200, description: "Return Effected", type: Number })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}