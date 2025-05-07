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
import { CreateRoomTypeDto } from "./dto/create-room_type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room_type.dto";
import { RoomType } from "./models/room_type.model";
import { RoomTypesService } from "./room_types.service";

@Controller("room-types")
export class RoomTypesController {
	constructor(private readonly roomTypesService: RoomTypesService) {}

	@ApiOperation({ summary: "Add Room Type" })
	@ApiResponse({ status: 201, description: "Create Room Type", type: RoomType })
	@Post()
	create(@Body() createRoomTypeDto: CreateRoomTypeDto) {
		return this.roomTypesService.create(createRoomTypeDto);
	}

	@ApiOperation({ summary: "Get All Room Types" })
	@ApiResponse({
		status: 200,
		description: "List of Room Types",
		type: [RoomType],
	})
	@Get()
	findAll() {
		return this.roomTypesService.findAll();
	}

	@ApiOperation({ summary: "Get One Room Type By Id" })
	@ApiResponse({ status: 200, description: "Room Type's info", type: RoomType })
	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.roomTypesService.findOne(+id);
	}

	@ApiOperation({ summary: "Update Room Type By Id" })
	@ApiResponse({
		status: 200,
		description: "Room Type's updated info",
		type: [RoomType],
	})
	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateRoomTypeDto: UpdateRoomTypeDto
	) {
		return this.roomTypesService.update(+id, updateRoomTypeDto);
	}

	@ApiOperation({ summary: "Delete One Room Type By Id" })
	@ApiResponse({ status: 200, description: "Return Effected", type: Number })
	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.roomTypesService.remove(+id);
	}
}
