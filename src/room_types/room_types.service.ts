import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoomTypeDto } from "./dto/create-room_type.dto";
import { UpdateRoomTypeDto } from "./dto/update-room_type.dto";
import { RoomType } from "./models/room_type.model";

@Injectable()
export class RoomTypesService {
	constructor(
		@InjectModel(RoomType) private readonly roomTypeModel: typeof RoomType
	) {}
	create(createRoomTypeDto: CreateRoomTypeDto) {
		return this.roomTypeModel.create(createRoomTypeDto);
	}

	findAll() {
		return this.roomTypeModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.roomTypeModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateRoomTypeDto: UpdateRoomTypeDto) {
		return this.roomTypeModel.update(updateRoomTypeDto, { where: { id } });
	}

	remove(id: number) {
		return this.roomTypeModel.destroy({ where: { id } });
	}
}
