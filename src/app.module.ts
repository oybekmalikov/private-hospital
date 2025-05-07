import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { AdminsModule } from "./admins/admins.module";
import { Admin } from "./admins/models/admin.models";
import { DepartmentsModule } from "./departments/departments.module";
import { Department } from "./departments/models/department.model";
import { DoctorsModule } from "./doctors/doctors.module";
import { Doctor } from "./doctors/models/doctor.model";
import { Patient } from "./patients/models/patient.model";
import { PatientsModule } from "./patients/patients.module";
import { RoomType } from "./room_types/models/room_type.model";
import { RoomTypesModule } from "./room_types/room_types.module";
import { Room } from "./rooms/models/room.model";
import { RoomsModule } from "./rooms/rooms.module";
import { Staff } from "./staffs/models/staff.model";
import { StaffsModule } from "./staffs/staffs.module";

@Module({
	imports: [
		ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
		SequelizeModule.forRoot({
			dialect: "postgres",
			port: Number(process.env.PG_PORT),
			host: process.env.PG_HOST,
			username: process.env.PG_USER,
			password: process.env.PG_PASSWORD,
			database: process.env.PG_DB,
			models: [Admin, Staff, Department, Doctor, Patient, RoomType, Room],
			autoLoadModels: true,
			sync: { alter: true },
			logging: false,
		}),
		AdminsModule,
		StaffsModule,
		DepartmentsModule,
		DoctorsModule,
		PatientsModule,
		RoomTypesModule,
		RoomsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
