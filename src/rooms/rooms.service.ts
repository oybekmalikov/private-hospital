import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Room } from "./models/room.model";

@Injectable()
export class RoomsService {
	constructor(@InjectModel(Room) private readonly roomModel: typeof Room) {}
	create(createRoomDto: CreateRoomDto) {
		return this.roomModel.create(createRoomDto);
	}

	findAll() {
		return this.roomModel.findAll({ include: { all: true } });
	}

	findOne(id: number) {
		return this.roomModel.findByPk(id, { include: { all: true } });
	}

	update(id: number, updateRoomDto: UpdateRoomDto) {
		return this.roomModel.update(updateRoomDto, { where: { id } });
	}

	remove(id: number) {
		return this.roomModel.destroy({ where: { id } });
	}
}
