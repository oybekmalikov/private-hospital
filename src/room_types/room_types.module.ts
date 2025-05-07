import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { RoomType } from "./models/room_type.model";
import { RoomTypesController } from "./room_types.controller";
import { RoomTypesService } from "./room_types.service";

@Module({
	imports: [SequelizeModule.forFeature([RoomType])],
	controllers: [RoomTypesController],
	providers: [RoomTypesService],
})
export class RoomTypesModule {}
