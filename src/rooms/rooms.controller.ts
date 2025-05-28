import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { accessMatrix } from "../app.constants";
import { AccessControlGuard } from "../common/Guards/access-control.guard";
import { AuthGuard } from "../common/Guards/auth.guard";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./models/room.model";
import { RoomsService } from "./rooms.service";

@Controller("rooms")
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@ApiOperation({ summary: "Add Room" })
	@ApiResponse({ status: 201, description: "Create Room", type: Room })
	@UseGuards(new AccessControlGuard(accessMatrix, "rooms"))
	@UseGuards(AuthGuard)
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
	@UseGuards(new AccessControlGuard(accessMatrix, "rooms"))
	@UseGuards(AuthGuard)
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
		return this.roomsService.update(+id, updateRoomDto);
	}

	@ApiOperation({ summary: "Delete One Room By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@UseGuards(new AccessControlGuard(accessMatrix, "rooms"))
	@UseGuards(AuthGuard)
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.roomsService.remove(+id);
	}
}
